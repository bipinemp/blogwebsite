/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BLOG_BASE_URL: "https://writz.vercel.app/api/blogs",
    PROFILE_BASE_URL: "https://writz.vercel.app/api/profile",

    GITHUB_ID: "cc94f119f0ace68340f5",
    GITHUB_SECRET: "9b9eaf6103f3568104811a455c065a766ca15b1e",

    GOOGLE_ID:
      "726150958395-ver5coha855mga6cb1284spf3upf3bvo.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",

    NEXTAUTH_SECRET: "fakjdlfjdklfjaklf#!@#JKL@JK$@@#KL@#K@L@#@",
    NEXTAUTH_URL: "https://writz.vercel.app/",

    MONGO_URL:
      "mongodb+srv://bipinbhandari:gaindakot@nodejstutorial.bv7ep8i.mongodb.net/blogwebsite?retryWrites=true&w=majority",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

// GOOGLE_ID="726150958395-ver5coha855mga6cb1284spf3upf3bvo.apps.googleusercontent.com"
// GOOGLE_SECRET="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"

module.exports = nextConfig;
