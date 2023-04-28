const { parsed: localEnv } = require('dotenv').config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    AIRLABS_API_KEY: localEnv.AIRLABS_API_KEY,
  },
}

module.exports = nextConfig
