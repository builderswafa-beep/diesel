// src/context/CmsContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { projectsList as staticProjects } from '../data/projectsData';
import { servicesData as staticServices } from '../data/catalog';
import { sectorsData as staticIndustries } from '../data/catalog';
import { recentBlogPosts as staticBlog } from '../data/blogData';

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
  const [settings, setSettings] = useState({
    company_name: 'Dubai Diesel Trading L.L.C.',
    company_name_ar: 'دبي لتجارة الديزل ذ.م.م.',
    phone: '+971 4 123 4567',
    email: 'info@dubaidiesel.ae',
    address: 'Dubai, United Arab Emirates',
    working_hours: 'Mon - Fri: 8:00 AM - 6:00 PM',
    whatsapp_number: '+971501234567',
    whatsapp_enabled: 'true',
    linkedin_url: 'https://linkedin.com',
    instagram_url: 'https://instagram.com',
    youtube_url: 'https://youtube.com',
    copyright_text: '© 2026 Dubai Diesel Trading L.L.C. All Rights Reserved.',
    site_tagline: 'Leading Fuel Solutions & Distribution in the UAE',
  });

  const [projects, setProjects] = useState(staticProjects);
  const [services, setServices] = useState(staticServices);
  const [industries, setIndustries] = useState(staticIndustries);
  const [blog, setBlog] = useState(staticBlog);
  const [gallery, setGallery] = useState([]);
  const [pageSections, setPageSections] = useState({});
  const [inquiries, setInquiries] = useState({ contacts: [], quotes: [] });
  const [media, setMedia] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch all live data from database
  const refreshData = useCallback(async () => {
    try {
      // 1. Settings
      const settingsRes = await fetch('/api/settings').then((r) => r.json()).catch(() => null);
      if (settingsRes?.success && settingsRes.settings) {
        setSettings((prev) => ({ ...prev, ...settingsRes.settings }));
      }

      // 2. Projects
      const projectsRes = await fetch('/api/projects').then((r) => r.json()).catch(() => null);
      if (projectsRes?.success && projectsRes.projects?.length) {
        setProjects(
          projectsRes.projects.map((p) => ({
            id: p.project_id || p.id,
            dbId: p.id,
            title: p.title,
            categoryKey: p.category_key,
            categoryLabel: p.category_label,
            desc: p.description,
            image: p.image,
            categoryIcon: p.category_icon || 'crane',
            waveColor: p.wave_color || '#D51F26',
            detailLink: p.detail_link || '/projects',
            status: p.status,
            orderIndex: p.order_index,
          }))
        );
      }

      // 3. Services
      const servicesRes = await fetch('/api/services').then((r) => r.json()).catch(() => null);
      if (servicesRes?.success && servicesRes.services?.length) {
        setServices(servicesRes.services);
      }

      // 4. Industries
      const industriesRes = await fetch('/api/industries').then((r) => r.json()).catch(() => null);
      if (industriesRes?.success && industriesRes.industries?.length) {
        setIndustries(industriesRes.industries);
      }

      // 5. Blog
      const blogRes = await fetch('/api/blog').then((r) => r.json()).catch(() => null);
      if (blogRes?.success && blogRes.posts?.length) {
        setBlog(blogRes.posts);
      }

      // 6. Page Sections
      const pagesRes = await fetch('/api/pages').then((r) => r.json()).catch(() => null);
      if (pagesRes?.success && pagesRes.sections?.length) {
        const sectionsMap = {};
        pagesRes.sections.forEach((sec) => {
          const key = `${sec.page_slug}.${sec.section_key}`;
          sectionsMap[key] = {
            ...sec,
            content: sec.content_json ? (typeof sec.content_json === 'string' ? JSON.parse(sec.content_json) : sec.content_json) : {},
          };
        });
        setPageSections(sectionsMap);
      }

      // 7. Media Library
      const mediaRes = await fetch('/api/media').then((r) => r.json()).catch(() => null);
      if (mediaRes?.success && mediaRes.media) {
        setMedia(mediaRes.media);
      }

      // 8. Inquiries
      const inqRes = await fetch('/api/inquiries').then((r) => r.json()).catch(() => null);
      if (inqRes?.success) {
        setInquiries({
          contacts: inqRes.contacts || [],
          quotes: inqRes.quotes || [],
        });
      }

      // 9. Activity
      const actRes = await fetch('/api/activity').then((r) => r.json()).catch(() => null);
      if (actRes?.success && actRes.logs) {
        setActivityLogs(actRes.logs);
      }

      // 10. Gallery
      const galleryRes = await fetch('/api/gallery').then((r) => r.json()).catch(() => null);
      if (galleryRes?.success && galleryRes.gallery) {
        setGallery(galleryRes.gallery);
      }
    } catch (err) {
      console.warn('CMS data refresh failed, using active cache:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Actions for Admin Operations
  const saveSection = async (pageSlug, sectionKey, payload, userName = 'Admin') => {
    const res = await fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page_slug: pageSlug,
        section_key: sectionKey,
        title: payload.title,
        subtitle: payload.subtitle,
        content_json: payload.content,
        image_url: payload.image_url,
        status: payload.status || 'published',
        user_name: userName,
      }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const saveProject = async (projectData, userName = 'Admin') => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...projectData, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const deleteProject = async (id, userName = 'Admin') => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const saveService = async (serviceData, userName = 'Admin') => {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...serviceData, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const saveIndustry = async (industryData, userName = 'Admin') => {
    const res = await fetch('/api/industries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...industryData, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const saveBlogPost = async (postData, userName = 'Admin') => {
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...postData, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const deleteBlogPost = async (id, userName = 'Admin') => {
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const saveGalleryItem = async (itemData, userName = 'Admin') => {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...itemData, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const deleteGalleryItem = async (id, userName = 'Admin') => {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const saveSettings = async (newSettings, userName = 'Admin') => {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: newSettings, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const uploadImage = async (filename, dataUrl, userName = 'Admin') => {
    const res = await fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'upload', filename, dataUrl, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const deleteImage = async (filename, userName = 'Admin') => {
    const res = await fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', filename, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  const deleteInquiry = async (type, id, userName = 'Admin') => {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', type, id, user_name: userName }),
    });
    const data = await res.json();
    if (data.success) {
      await refreshData();
    }
    return data;
  };

  return (
    <CmsContext.Provider
      value={{
        settings,
        projects,
        services,
        industries,
        blog,
        gallery,
        pageSections,
        inquiries,
        media,
        activityLogs,
        loading,
        previewMode,
        setPreviewMode,
        refreshData,
        saveSection,
        saveProject,
        deleteProject,
        saveService,
        saveIndustry,
        saveBlogPost,
        deleteBlogPost,
        saveGalleryItem,
        deleteGalleryItem,
        saveSettings,
        uploadImage,
        deleteImage,
        deleteInquiry,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
