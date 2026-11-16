// server/apiHandler.js
// Node.js API Middleware for Vite Dev Server connected directly to Hostinger MySQL
import mysql from 'mysql2/promise';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const DB_CONFIG = {
  host: '194.59.164.108',
  user: 'u136421965_dieseluser',
  password: '8CIB1^gN',
  database: 'u136421965_dieseldb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool = null;
function getPool() {
  if (!pool) {
    pool = mysql.createPool(DB_CONFIG);
  }
  return pool;
}

function hashPassword(pwd) {
  const salt = 'dubaidiesel_salt_2026';
  return crypto.createHash('sha256').update(salt + pwd).digest('hex');
}

async function logActivity(pool, userName, action, entityType, entityId, desc) {
  try {
    await pool.query(
      'INSERT INTO activity_logs (user_name, action, entity_type, entity_id, description) VALUES (?, ?, ?, ?, ?)',
      [userName || 'Admin', action, entityType, entityId || '', desc || '']
    );
  } catch (err) {
    console.error('Log activity error:', err.message);
  }
}

export async function handleApiRequest(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return true;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Only handle /api/*
  if (!pathname.startsWith('/api')) {
    return false;
  }

  // Parse Body for POST/PUT
  let body = {};
  if (req.method === 'POST' || req.method === 'PUT') {
    body = await new Promise((resolve) => {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : {});
        } catch (e) {
          resolve({});
        }
      });
    });
  }

  res.setHeader('Content-Type', 'application/json');

  const pool = getPool();

  try {
    // 1. AUTHENTICATION
    if (pathname.includes('/auth')) {
      const action = body.action || url.searchParams.get('action') || 'verify';

      if (action === 'login') {
        const { username, password } = body;
        const pwdHash = hashPassword(password);

        const [users] = await pool.query(
          'SELECT id, username, email, full_name, role FROM admin_users WHERE (username = ? OR email = ?) AND password_hash = ?',
          [username, username, pwdHash]
        );

        if (users.length > 0) {
          const user = users[0];
          const token = crypto.randomBytes(32).toString('hex');
          await pool.query('UPDATE admin_users SET token = ?, last_login = NOW() WHERE id = ?', [token, user.id]);
          await logActivity(pool, user.full_name, 'LOGIN', 'auth', user.id, 'Administrator logged in successfully');
          res.end(JSON.stringify({ success: true, token, user }));
        } else {
          res.statusCode = 401;
          res.end(JSON.stringify({ success: false, error: 'Invalid username or password' }));
        }
        return true;
      }

      if (action === 'verify') {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '').trim();
        if (!token) {
          res.statusCode = 401;
          res.end(JSON.stringify({ success: false, error: 'Missing token' }));
          return true;
        }

        const [users] = await pool.query(
          'SELECT id, username, email, full_name, role, last_login FROM admin_users WHERE token = ?',
          [token]
        );

        if (users.length > 0) {
          res.end(JSON.stringify({ success: true, user: users[0] }));
        } else {
          res.statusCode = 401;
          res.end(JSON.stringify({ success: false, error: 'Invalid or expired token' }));
        }
        return true;
      }

      if (action === 'logout') {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '').trim();
        if (token) {
          await pool.query('UPDATE admin_users SET token = NULL WHERE token = ?', [token]);
        }
        res.end(JSON.stringify({ success: true, message: 'Logged out successfully' }));
        return true;
      }

      if (action === 'change_password') {
        const { current_password, new_password, user_id } = body;
        const currentHash = hashPassword(current_password);
        const newHash = hashPassword(new_password);

        const [users] = await pool.query('SELECT id, full_name FROM admin_users WHERE id = ? AND password_hash = ?', [user_id, currentHash]);
        if (users.length > 0) {
          await pool.query('UPDATE admin_users SET password_hash = ? WHERE id = ?', [newHash, user_id]);
          await logActivity(pool, users[0].full_name, 'UPDATE_PASSWORD', 'user', user_id, 'Admin password changed');
          res.end(JSON.stringify({ success: true, message: 'Password updated successfully' }));
        } else {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, error: 'Current password is incorrect' }));
        }
        return true;
      }
    }

    // 2. SETTINGS
    if (pathname.includes('/settings')) {
      if (req.method === 'GET') {
        const [rows] = await pool.query('SELECT setting_key, setting_value, category FROM website_settings');
        const settings = {};
        rows.forEach((r) => {
          settings[r.setting_key] = r.setting_value;
        });
        res.end(JSON.stringify({ success: true, settings }));
        return true;
      }

      if (req.method === 'POST') {
        const { settings, user_name } = body;
        for (const [k, v] of Object.entries(settings || {})) {
          await pool.query(
            'INSERT INTO website_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
            [k, String(v), String(v)]
          );
        }
        await logActivity(pool, user_name, 'UPDATE_SETTINGS', 'settings', 'global', 'Global website settings updated');
        res.end(JSON.stringify({ success: true, message: 'Settings updated successfully' }));
        return true;
      }
    }

    // 3. PROJECTS
    if (pathname.includes('/projects')) {
      if (req.method === 'GET') {
        const [projects] = await pool.query('SELECT * FROM cms_projects ORDER BY order_index ASC, id ASC');
        res.end(JSON.stringify({ success: true, projects }));
        return true;
      }
      if (req.method === 'POST') {
        const action = body.action || 'save';
        if (action === 'delete') {
          const { id, user_name } = body;
          await pool.query('DELETE FROM cms_projects WHERE id = ?', [id]);
          await logActivity(pool, user_name, 'DELETE_PROJECT', 'project', id, `Deleted project ID ${id}`);
          res.end(JSON.stringify({ success: true, message: 'Project deleted' }));
          return true;
        }
        const { id, project_id, title, category_key, category_label, description, image, category_icon, wave_color, detail_link, status, order_index, user_name } = body;
        if (id) {
          await pool.query(
            `UPDATE cms_projects SET 
              title = ?, category_key = ?, category_label = ?, description = ?, image = ?, 
              category_icon = ?, wave_color = ?, detail_link = ?, status = ?, order_index = ? 
             WHERE id = ?`,
            [title, category_key, category_label, description, image, category_icon, wave_color, detail_link, status || 'published', order_index || 0, id]
          );
          await logActivity(pool, user_name, 'UPDATE_PROJECT', 'project', id, `Updated project: ${title}`);
          res.end(JSON.stringify({ success: true, message: 'Project updated successfully' }));
        } else {
          const [result] = await pool.query(
            `INSERT INTO cms_projects 
              (project_id, title, category_key, category_label, description, image, category_icon, wave_color, detail_link, status, order_index)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [project_id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title, category_key, category_label, description, image, category_icon || 'crane', wave_color || '#D51F26', detail_link || '/projects', status || 'published', order_index || 0]
          );
          await logActivity(pool, user_name, 'CREATE_PROJECT', 'project', result.insertId, `Created project: ${title}`);
          res.end(JSON.stringify({ success: true, message: 'Project created successfully', id: result.insertId }));
        }
        return true;
      }
    }
    // 4. MEDIA LIBRARY (unified handler — DB uploads + filesystem images)
    if (pathname.includes('/media')) {
      if (req.method === 'GET') {
        // Combine DB uploads with filesystem images from public/images
        const [dbRows] = await pool.query('SELECT id, filename, file_path, file_size, mime_type, uploaded_at FROM media_library ORDER BY uploaded_at DESC');
        const dbMedia = dbRows.map(r => ({
          id: r.id,
          filename: r.filename,
          url: r.file_path,
          size: r.file_size,
          mime_type: r.mime_type,
          uploaded_at: r.uploaded_at,
          source: 'upload',
        }));

        // Also scan public/images for existing site images
        const imagesDir = path.join(process.cwd(), 'public', 'images');
        let fsMedia = [];
        if (fs.existsSync(imagesDir)) {
          const dbFilenames = new Set(dbRows.map(r => r.filename));
          fsMedia = fs.readdirSync(imagesDir)
            .filter(f => /\.(jpg|jpeg|png|webp|svg)$/i.test(f) && !dbFilenames.has(f))
            .filter(f => !f.startsWith('debug_') && !f.startsWith('test_') && !f.startsWith('thumb_') && !f.startsWith('slice_'))
            .map(f => {
              let stat;
              try { stat = fs.statSync(path.join(imagesDir, f)); } catch (e) { return null; }
              return {
                id: null,
                filename: f,
                url: `/images/${f}`,
                size: stat.size,
                mime_type: 'image/' + (f.endsWith('.png') ? 'png' : f.endsWith('.svg') ? 'svg+xml' : 'jpeg'),
                uploaded_at: stat.mtime,
                source: 'filesystem',
              };
            })
            .filter(Boolean);
        }

        // Also scan public/uploads for any files not yet in DB
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        if (fs.existsSync(uploadsDir)) {
          const dbPaths = new Set(dbRows.map(r => r.file_path));
          const uploadsFiles = fs.readdirSync(uploadsDir)
            .filter(f => /\.(jpg|jpeg|png|webp|svg)$/i.test(f))
            .filter(f => !dbPaths.has('/uploads/' + f))
            .map(f => {
              let stat;
              try { stat = fs.statSync(path.join(uploadsDir, f)); } catch (e) { return null; }
              return {
                id: null,
                filename: f,
                url: `/uploads/${f}`,
                size: stat.size,
                mime_type: 'image/' + (f.endsWith('.png') ? 'png' : f.endsWith('.svg') ? 'svg+xml' : 'jpeg'),
                uploaded_at: stat.mtime,
                source: 'upload',
              };
            })
            .filter(Boolean);
          dbMedia.push(...uploadsFiles);
        }

        const allMedia = [...dbMedia, ...fsMedia];
        res.end(JSON.stringify({ success: true, media: allMedia }));
        return true;
      }
      // POST for upload/delete
      if (req.method === 'POST') {
        const { action, filename, dataUrl, user_name } = body;
        if (action === 'delete') {
          if (!filename) {
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, error: 'Filename required for delete' }));
            return true;
          }
          const [rows] = await pool.query('SELECT file_path FROM media_library WHERE filename = ?', [filename]);
          if (rows.length) {
            const filePath = rows[0].file_path;
            try { fs.unlinkSync(path.join(process.cwd(), 'public', filePath.replace(/^\//, ''))); } catch (e) {}
            await pool.query('DELETE FROM media_library WHERE filename = ?', [filename]);
            await logActivity(pool, user_name, 'DELETE_MEDIA', 'media', filename, 'Media file deleted');
            res.end(JSON.stringify({ success: true }));
            return true;
          }
          // Also try deleting from filesystem directly
          const fsPath = path.join(process.cwd(), 'public', 'images', filename);
          if (fs.existsSync(fsPath)) {
            fs.unlinkSync(fsPath);
            res.end(JSON.stringify({ success: true }));
            return true;
          }
          res.statusCode = 404;
          res.end(JSON.stringify({ success: false, error: 'File not found' }));
          return true;
        }
        if (action === 'upload') {
          if (!filename || !dataUrl) {
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, error: 'Filename and dataUrl required' }));
            return true;
          }
          const matches = dataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/);
          if (!matches) {
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, error: 'Invalid dataUrl format' }));
            return true;
          }
          const mime = matches[1];
          const buffer = Buffer.from(matches[2], 'base64');
          const maxSize = 10 * 1024 * 1024;
          if (buffer.length > maxSize) {
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, error: 'File exceeds 10MB limit' }));
            return true;
          }
          const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
          const ext = path.extname(safeName) || (mime === 'image/svg+xml' ? '.svg' : '.png');
          const timestamp = Date.now();
          const newFileName = `${path.basename(safeName, ext)}_${timestamp}${ext}`;
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          try { fs.mkdirSync(uploadDir, { recursive: true }); } catch (e) {}
          const fullPath = path.join(uploadDir, newFileName);
          fs.writeFileSync(fullPath, buffer);
          await pool.query(
            'INSERT INTO media_library (filename, file_path, file_size, mime_type) VALUES (?,?,?,?)',
            [newFileName, '/uploads/' + newFileName, buffer.length, mime]
          );
          await logActivity(pool, user_name, 'UPLOAD_MEDIA', 'media', newFileName, 'Media uploaded');
          res.end(JSON.stringify({ success: true, url: '/uploads/' + newFileName }));
          return true;
        }
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, error: 'Invalid media action' }));
        return true;
      }
    }
    // 4. SERVICES
    if (pathname.includes('/services')) {
      if (req.method === 'GET') {
        const [services] = await pool.query('SELECT * FROM cms_services ORDER BY order_index ASC, id ASC');
        res.end(JSON.stringify({ success: true, services }));
        return true;
      }

      if (req.method === 'POST') {
        const { id, title, subtitle, overview, hero_image, overview_image, benefits_image, icon, benefits_json, applications_json, status, order_index, user_name } = body;
        await pool.query(
          `UPDATE cms_services SET 
            title = ?, subtitle = ?, overview = ?, hero_image = ?, overview_image = ?, benefits_image = ?, icon = ?, 
            benefits_json = ?, applications_json = ?, status = ?, order_index = ? 
           WHERE id = ?`,
          [title, subtitle, overview, hero_image, overview_image, benefits_image, icon, typeof benefits_json === 'object' ? JSON.stringify(benefits_json) : benefits_json, typeof applications_json === 'object' ? JSON.stringify(applications_json) : applications_json, status || 'published', order_index || 0, id]
        );
        await logActivity(pool, user_name, 'UPDATE_SERVICE', 'service', id, `Updated service: ${title}`);
        res.end(JSON.stringify({ success: true, message: 'Service updated successfully' }));
        return true;
      }
    }

    // 5. INDUSTRIES
    if (pathname.includes('/industries')) {
      if (req.method === 'GET') {
        const [industries] = await pool.query('SELECT * FROM cms_industries ORDER BY order_index ASC, id ASC');
        res.end(JSON.stringify({ success: true, industries }));
        return true;
      }

      if (req.method === 'POST') {
        const { id, title, description, image, icon, status, order_index, user_name } = body;
        await pool.query(
          'UPDATE cms_industries SET title = ?, description = ?, image = ?, icon = ?, status = ?, order_index = ? WHERE id = ?',
          [title, description, image, icon, status || 'published', order_index || 0, id]
        );
        await logActivity(pool, user_name, 'UPDATE_INDUSTRY', 'industry', id, `Updated industry: ${title}`);
        res.end(JSON.stringify({ success: true, message: 'Industry updated successfully' }));
        return true;
      }
    }

    // 6. BLOG
    if (pathname.includes('/blog')) {
      if (req.method === 'GET') {
        const [posts] = await pool.query('SELECT * FROM cms_blog ORDER BY id DESC');
        res.end(JSON.stringify({ success: true, posts }));
        return true;
      }

      if (req.method === 'POST') {
        const action = body.action || 'save';
        if (action === 'delete') {
          const { id, user_name } = body;
          await pool.query('DELETE FROM cms_blog WHERE id = ?', [id]);
          await logActivity(pool, user_name, 'DELETE_BLOG', 'blog', id, `Deleted blog post ID ${id}`);
          res.end(JSON.stringify({ success: true, message: 'Post deleted' }));
          return true;
        }

        const { id, slug, title, excerpt, content, cover_image, author, category, read_time, status, user_name } = body;
        if (id) {
          await pool.query(
            `UPDATE cms_blog SET 
              slug = ?, title = ?, excerpt = ?, content = ?, cover_image = ?, 
              author = ?, category = ?, read_time = ?, status = ? 
             WHERE id = ?`,
            [slug, title, excerpt, content, cover_image, author, category, read_time, status || 'published', id]
          );
          await logActivity(pool, user_name, 'UPDATE_BLOG', 'blog', id, `Updated post: ${title}`);
          res.end(JSON.stringify({ success: true, message: 'Post updated successfully' }));
        } else {
          const safeSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const [result] = await pool.query(
            `INSERT INTO cms_blog 
              (slug, title, excerpt, content, cover_image, author, category, read_time, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [safeSlug, title, excerpt, content, cover_image, author || 'Dubai Diesel Insights', category || 'Fuel Industry', read_time || '5 min read', status || 'published']
          );
          await logActivity(pool, user_name, 'CREATE_BLOG', 'blog', result.insertId, `Created post: ${title}`);
          res.end(JSON.stringify({ success: true, message: 'Post created successfully', id: result.insertId }));
        }
        return true;
      }
    }

    // 7. PAGE SECTIONS (Section-based editing)
    if (pathname.includes('/pages')) {
      if (req.method === 'GET') {
        const pageSlug = url.searchParams.get('page');
        let query = 'SELECT * FROM page_sections';
        let params = [];
        if (pageSlug) {
          query += ' WHERE page_slug = ?';
          params.push(pageSlug);
        }
        const [sections] = await pool.query(query, params);
        res.end(JSON.stringify({ success: true, sections }));
        return true;
      }

      if (req.method === 'POST') {
        const { page_slug, section_key, title, subtitle, content_json, image_url, status, user_name } = body;
        await pool.query(
          `INSERT INTO page_sections (page_slug, section_key, title, subtitle, content_json, image_url, status, version)
           VALUES (?, ?, ?, ?, ?, ?, ?, 1)
           ON DUPLICATE KEY UPDATE 
             title = VALUES(title), subtitle = VALUES(subtitle), content_json = VALUES(content_json), 
             image_url = VALUES(image_url), status = VALUES(status), version = version + 1`,
          [page_slug, section_key, title, subtitle, typeof content_json === 'object' ? JSON.stringify(content_json) : content_json, image_url, status || 'published']
        );
        await logActivity(pool, user_name, 'UPDATE_PAGE_SECTION', 'section', `${page_slug}.${section_key}`, `Updated section: ${page_slug} / ${section_key}`);
        res.end(JSON.stringify({ success: true, message: 'Section updated successfully' }));
        return true;
      }
    }

    // 8. INQUIRIES & QUOTE REQUESTS
    if (pathname.includes('/inquiries')) {
      if (req.method === 'GET') {
        const [contacts] = await pool.query('SELECT * FROM contact_messages ORDER BY id DESC LIMIT 200');
        const [quotes] = await pool.query('SELECT * FROM quote_requests ORDER BY id DESC LIMIT 200');
        res.end(JSON.stringify({ success: true, contacts, quotes }));
        return true;
      }

      if (req.method === 'POST') {
        const { type, id, action, user_name } = body;
        const table = type === 'quote' ? 'quote_requests' : 'contact_messages';
        if (action === 'delete') {
          await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
          await logActivity(pool, user_name, 'DELETE_INQUIRY', type, id, `Deleted inquiry #${id} from ${table}`);
          res.end(JSON.stringify({ success: true, message: 'Inquiry deleted' }));
          return true;
        }
      }
    }

    // 9. GALLERY
    if (pathname.includes('/gallery')) {
      if (req.method === 'GET') {
        const [gallery] = await pool.query('SELECT * FROM cms_gallery ORDER BY order_index ASC, id ASC');
        res.end(JSON.stringify({ success: true, gallery }));
        return true;
      }

      if (req.method === 'POST') {
        const action = body.action || 'save';
        if (action === 'delete') {
          const { id, user_name } = body;
          await pool.query('DELETE FROM cms_gallery WHERE id = ?', [id]);
          await logActivity(pool, user_name, 'DELETE_GALLERY_ITEM', 'gallery', id, `Deleted gallery photo ID ${id}`);
          res.end(JSON.stringify({ success: true, message: 'Gallery item deleted' }));
          return true;
        }

        const { id, title, category, image_url, caption, date_taken, order_index, user_name } = body;
        if (id) {
          await pool.query(
            `UPDATE cms_gallery SET 
              title = ?, category = ?, image_url = ?, caption = ?, 
              date_taken = ?, order_index = ? 
             WHERE id = ?`,
            [title, category, image_url, caption || '', date_taken || null, order_index || 0, id]
          );
          await logActivity(pool, user_name, 'UPDATE_GALLERY_ITEM', 'gallery', id, `Updated gallery photo: ${title}`);
          res.end(JSON.stringify({ success: true, message: 'Gallery photo updated successfully' }));
        } else {
          const [result] = await pool.query(
            `INSERT INTO cms_gallery 
              (title, category, image_url, caption, date_taken, order_index)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, category, image_url, caption || '', date_taken || null, order_index || 0]
          );
          await logActivity(pool, user_name, 'CREATE_GALLERY_ITEM', 'gallery', result.insertId, `Added gallery photo: ${title}`);
          res.end(JSON.stringify({ success: true, message: 'Gallery photo added successfully', id: result.insertId }));
        }
        return true;
      }
    }

    // 10. ACTIVITY LOGS
    if (pathname.includes('/activity')) {
      const [logs] = await pool.query('SELECT * FROM activity_logs ORDER BY id DESC LIMIT 100');
      res.end(JSON.stringify({ success: true, logs }));
      return true;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ success: false, error: 'Endpoint not found' }));
    return true;
  } catch (err) {
    console.error('API Error:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false, error: err.message }));
    return true;
  }
}
