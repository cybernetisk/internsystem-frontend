import React from 'react'
import {Link} from 'react-router'

export default class extends React.Component {

  render() {
    return (
      <div>
        <h1>Products</h1>
        <ul>
          <li><Link to="varer/råvarer">Raw materials</Link></li>
          <li><Link to="varer/salgsvarer">Sales items</Link></li>
          <li><Link to="varer/accounts">Account list</Link></li>
          <li><Link to="varer/vendors">Vendor list</Link></li>
          <li><Link to="varer/salesestimates">Sales estimates</Link></li>
          <li><Link to="varer/varetellinger">Inventory counts</Link></li>
        </ul>
      </div>
    )
  }
}
