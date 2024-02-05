import headers from './headers';

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