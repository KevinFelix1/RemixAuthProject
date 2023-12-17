/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  browserNodeBuiltinsPolyfill: {
    modules: {util: true, crypto: true, stream: true, buffer: true}
  }
  
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
