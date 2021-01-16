import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { Link } from "react-router-dom"
import Loader from "../../../../components/Loader"
import Pagination from "../../../../components/Pagination"
import moment from "../../../../moment"
import withQueryProps from "../../../../utils/withQueryProps"
import { MultilineText } from "../../common/components/MultilineText"
import { createQueryUpdater } from "../../common/functions"
import { fetchInventoryCounts } from "../actions"
import { activePage, list, listLoader, numPages } from "./getters"

@connect(() => ({
  list,
  listLoader,
  activePage,
  numPages,
}))
@withQueryProps
export default class List extends React.Component {
  constructor(props) {
    super(props)

    this.updateQuery = createQueryUpdater(props.history)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  componentDidMount() {
    fetchInventoryCounts(this.props.query.page || 1)
  }

  handlePageChange(newPage) {
    fetchInventoryCounts(newPage)

    const page = newPage !== 1 ? newPage : undefined
    this.updateQuery("page", page)
  }

  renderList() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Time</th>
              <th>Comment</th>
              <th>Responsible</th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map((item) => {
              const time = moment(item.get("tid")).format("YYYY-MM-DD HH:mm")

              return (
                <tr key={item.get("id")}>
                  <td>
                    <Link to={`/varer/inventorycount/${item.get("id")}`}>
                      {item.get("tittel")}
                    </Link>
                  </td>
                  <td>{time}</td>
                  <td>
                    {item.get("kommentar") && (
                      <MultilineText text={item.get("kommentar")} />
                    )}
                  </td>
                  <td>{item.get("ansvarlig")}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {this.props.numPages > 1 ? (
          <Pagination
            pages={this.props.numPages}
            active={this.props.activePage}
            onChange={this.handlePageChange}
          />
        ) : (
          ""
        )}
      </div>
    )
  }

  render() {
    const list = this.props.list.count() ? this.renderList() : ""

    return (
      <div>
        <h1>Inventory counts</h1>

        <Loader {...this.props.listLoader}>No inventory counts exist.</Loader>

        {list}
      </div>
    )
  }
}
