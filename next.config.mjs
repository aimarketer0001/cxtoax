/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // Serve the marketing landing page (public/index.html) at "/" so the
    // marketing site, diagnosis (/diagnosis) and results (/result/*) share
    // one origin and can link to each other organically.
    return [{ source: "/", destination: "/index.html" }];
  },
};

export default nextConfig;
