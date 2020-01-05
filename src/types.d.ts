import { StateType } from "typesafe-actions"

interface CustomWindow extends Window {
  BACKEND_URL: string
}

// From Webpack config.
declare const __BUILD_INFO__: {
  buildTime: string
  gitCommitShort: string
}

export type Store = StateType<typeof import("./store").store>
export type RootAction = import("./store").rootAction
export type RootState = StateType<typeof import("./store").rootReducer>

declare module "typesafe-actions" {
  interface Types {
    RootAction: RootAction
  }
}
