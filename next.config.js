/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // set the port number to the value of the NEXT_PORT environment variable
    port: parseInt(process.env.NEXT_PORT, 10) || 3000,
  },
};


module.exports = nextConfig;
