import React from 'react'
import { Link } from 'react-router'

export default class Index extends React.Component {

  render() {
    return (
      <div>
        <h1>CYB internsystem</h1>
          <p>For informasjon om dette systemet, se prosjektet på <a href="https://github.com/cybrairai/internsystem">https://github.com/cybrairai/internsystem</a>.</p>
          <ul>
            <li><Link to='varer'>Varesystem</Link></li>
            <li><Link to='z'>Z-rapporter</Link></li>
            <li><Link to='cal/list'>Calendar</Link></li>
          </ul>
      </div>
    )
  }
}