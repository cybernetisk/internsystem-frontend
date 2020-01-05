import React from "react"
import { Route } from "react-router"
import reactor from "../../../reactor"
import InventoryCount from "./item/Item"
import List from "./list/List"
import Registrations from "./registrations/Item"
import FilterStore from "./stores/FilterStore"
import ItemCountsStore from "./stores/ItemCountsStore"
import ItemStore from "./stores/ItemStore"
import ListStore from "./stores/ListStore"

reactor.registerStores({
  varerInventoryCounts: ListStore,
  varerInventoryCount: ItemStore,
  varerInventoryCountFilter: FilterStore,
  varerInventoryCountCounts: ItemCountsStore,
})

export default (
  <React.Fragment>
    <Route exact path="/varer/inventorycounts" component={List} />
    <Route exact path="/varer/inventorycount/:id" component={InventoryCount} />
    <Route
      exact
      path="/varer/inventorycount/:id/registrations"
      component={Registrations}
    />
  </React.Fragment>
)
