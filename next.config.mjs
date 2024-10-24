/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
      return [
        // {
        //   source: '/api/:path*',
        //   destination:
        //     process.env.NODE_ENV === 'development'
        //       ? 'http://127.0.0.1:5328/api/:path*'
        //       : '/api/',
        // },
        {
          "source": "/api/detect",
          "destination": "http://ec2-18-133-180-144.eu-west-2.compute.amazonaws.com:8080/api/detect"
        }
      ]
    },
}

export default nextConfig;
