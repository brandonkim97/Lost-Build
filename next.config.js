const headers = require('./headers');

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers,
            }
        ]
    }
}

module.exports = nextConfig