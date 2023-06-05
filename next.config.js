const { parsed: localEnv } = require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_AIRLABS_API_KEY: localEnv.NEXT_PUBLIC_AIRLABS_API_KEY,
  },
}

module.exports = nextConfig
