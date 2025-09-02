/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Tells Next.js to export the site as static files (HTML/CSS/JS)
  output: 'export',

  // 2. Specifies the subfolder where your site will be hosted on GitHub Pages.
  //    This MUST match the name of your GitHub repository.
  basePath: '/Anish-Portfolio',

  // 3. This is necessary for static exports because Next.js's default image
  //    optimization requires a server. GitHub Pages doesn't have one.
  images: {
    unoptimized: true,
  },

  // These are your existing settings, which are fine to keep.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig