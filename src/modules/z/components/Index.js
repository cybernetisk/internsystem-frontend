import React from 'react'
import { Link } from 'react-router-dom'

export default class Index extends React.Component {

  render() {
    return (
      <div>
        <h1>Z</h1>
        <ul>
          <li><Link to="z/stats">Z-statistics</Link></li>
        </ul>
      </div>
    )
  }
}
