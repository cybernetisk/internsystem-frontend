import * as React from "react"
import "./MultilineText.scss"

interface Props {
  text: string
}

export const MultilineText: React.FC<Props> = ({ text }) => (
  <div className="varer-multilineText">{text}</div>
)
