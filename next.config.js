const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    // i18n: {
    //     locales: ['en-US', 'fr', 'vi-VN'],
    //     defaultLocale: 'fr',
    //     localeDetection: false,
    // }
}



module.exports = nextConfig
