import React from "react"
import Accounts from "./accounts"
import "./app.scss"
import InventoryCounts from "./inventoryCounts"
import InventoryItems from "./inventoryItems"
import SalesEstimates from "./salesEstimates"
import SalesProducts from "./salesProducts"
import Vendors from "./vendors"

export default (
  <React.Fragment>
    {Accounts}
    {InventoryCounts}
    {InventoryItems}
    {SalesEstimates}
    {SalesProducts}
    {Vendors}
  </React.Fragment>
)
