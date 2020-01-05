interface CustomWindow extends Window {
  BACKEND_URL: string
}

// From Webpack config.
declare const __BUILD_INFO__: {
  buildTime: string
  gitCommitShort: string
}
