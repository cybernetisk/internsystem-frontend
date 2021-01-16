declare module "nuclear-js-react-addons-chefsplate" {
  import { ComponentClass, ComponentType } from "react"

  export function connect<TOuter, TAdded>(
    fn: (props: TOuter) => TAdded,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): <TInner extends {}>(
    Component: ComponentType<TInner & TAdded>,
  ) => ComponentClass<Omit<TInner, keyof TAdded>>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Provider: any
}
