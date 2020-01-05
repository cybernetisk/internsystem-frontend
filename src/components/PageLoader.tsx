import React, { ReactNode } from "react"
import Loader from "./Loader"

interface PageLoaderProps {
  children?: ReactNode
  error?: string
  isEmpty?: boolean
  isLoading: boolean
  title: string
}

export default class PageLoader extends React.Component<PageLoaderProps> {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.props.children}
        <Loader {...this.props} />
      </div>
    )
  }
}
