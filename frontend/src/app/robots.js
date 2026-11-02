export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.certificationplanner.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/cp-control-7b8f9e/']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
