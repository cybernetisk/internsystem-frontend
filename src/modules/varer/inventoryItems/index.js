import React from "react"
import { Route } from "react-router"
import reactor from "../../../reactor"
import List from "./List"
import ListStore from "./ListStore"

reactor.registerStores({
  varerInventoryItems: ListStore,
})

export default <Route exact path="/varer/inventory" component={List} />
