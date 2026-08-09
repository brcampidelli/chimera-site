/** @type {import('next').NextConfig} */
const nextConfig = {
  // A static tree. Nothing on this site is resolved at request time — releases, skills, docs,
  // tokens and benchmarks are all settled during the build — so a server would only add a way
  // for the site to be down at 3am.
  output: "export",

  // Without this, `/pt/docs/usage` is a file with no extension and a static server 404s it.
  // With it, every route is `<route>/index.html`, which every static server already knows how
  // to serve.
  trailingSlash: true,

  // `next/image`'s optimizer needs a server. There are about five rasters on this site and they
  // are pre-generated at build time instead.
  images: { unoptimized: true },

  reactStrictMode: true,

  // A type error is a broken page. Never ship past one.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
