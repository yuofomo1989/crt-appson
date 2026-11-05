import courses from '@/data/courses_db.json';
import categories from '@/data/categories_db.json';
import articles from '@/data/articles_summary.json';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.certificationplanner.com';

  const staticRoutes = [
    '',
    '/certifications',
    '/courses',
    '/corporate-training',
    '/resources',
    '/about',
    '/contact',
    '/policies',
    '/enroll',
    '/cart',
    '/checkout'
  ].map(route => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8
  }));

  const categoryRoutes = (categories || []).map(cat => ({
    url: `${baseUrl}/category/${cat.slug}/`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  const courseRoutes = (courses || []).map(course => ({
    url: `${baseUrl}/courses/${course.slug}/`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.9
  }));

  const articleRoutes = (articles || []).map(article => ({
    url: `${baseUrl}/blog/${article.slug}/`,
    lastModified: article.created_at || new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [...staticRoutes, ...categoryRoutes, ...courseRoutes, ...articleRoutes];
}
