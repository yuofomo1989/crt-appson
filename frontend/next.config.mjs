/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/about-us', destination: '/about/', permanent: true },
      { source: '/contact-us', destination: '/contact/', permanent: true },
      { source: '/become-a-business-partner', destination: '/corporate-training/', permanent: true },
      { source: '/agile-project-management', destination: '/category/agile-project-management/', permanent: true },
      { source: '/devops-and-sf-certification', destination: '/category/devops-and-sf-certification/', permanent: true },
      { source: '/information-security-certification', destination: '/category/information-security-certification/', permanent: true },
      { source: '/itil-certification', destination: '/category/itil-certification/', permanent: true },
      { source: '/lean-six-sigma-certification', destination: '/category/lean-six-sigma-certification/', permanent: true },
      { source: '/cloud-computing-certification', destination: '/category/agile-project-management/', permanent: true },
      { source: '/analytics-data-management-certification', destination: '/category/agile-project-management/', permanent: true },
    ];
  },
};

export default nextConfig;
