export default {
  target: "static",
  head: {
    title: "scienta-ai",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: [
    "bootstrap/dist/css/bootstrap.css",
    "~/assets/sass/custom-bootstrap.scss",
  ],
  plugins: [],
  components: true,
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/router-extras"],
  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios"],
  axios: {
    baseURL: "/",
  },
  build: {},
}
