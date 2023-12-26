/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://localhost:3000",
    NEXTAUTH_URL: "http://localhost:3000",
    MONGO_URL:
      "mongodb+srv://bipinbhandari:gaindakot@nodejstutorial.bv7ep8i.mongodb.net/blogwebsite?retryWrites=true&w=majority",
    NEXTAUTH_SECRET: "fakjdlfjdklfjaklf#!@#JKL@JK$@@#KL@#K@L@#@",
    GOOGLE_ID:
      "726150958395-ver5coha855mga6cb1284spf3upf3bvo.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
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

module.exports = nextConfig;
