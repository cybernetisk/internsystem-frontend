import React from 'react'
//import { Link } from 'react-router'
import { nuclearComponent } from 'nuclear-js-react-addons'

import AuthService from '../services/AuthService'

import actions from '../actions'
import { authdata } from '../getters'

import PageLoader from '../../../components/PageLoader'

export default
@nuclearComponent({
  authdata
})
class Profile extends React.Component {
  renderIncomplete() {
    return (
      <PageLoader
        error={this.props.authdata.get('error')}
        isLoading={this.props.authdata.get('isLoading')}
        title='Profile'/>
    )
  }

  renderUser(data) {
    return (
      <div>
        <h1>Profile: {data.details.username} ({data.details.realname})</h1>

        <p>Stored data in CYBs system:</p>
        <dl className="dl-horizontal">
          {Object.keys(data.details).map(key => {
            return [
              <dt>{key}</dt>,
              <dd>{data.details[key]}</dd>,
            ]
          })}
        </dl>
        {data.metadata ? (
          <div>
            <p>Data from remote authentication system:</p>
            <dl className="dl-horizontal">
              {Object.keys(data.metadata).map(key => [
                <dt>{key}</dt>,
                <dd>
                  <ul>
                    {data.metadata[key].map(subval => (
                      <li>{subval}</li>
                    ))}
                  </ul>
                </dd>,
              ])}
            </dl>
          </div>
        ) : ''}
      </div>
    )
  }

  renderGuest() {
    return (
      <div>
        <h1>Profile</h1>

        <p>You need to be signed in to see this page. It will show details about you, but who are you?</p>
      </div>
    )
  }

  render() {
    let authdata = this.props.authdata.get('data')
    if (authdata === null) {
      return this.renderIncomplete()
    }

    authdata = authdata.toJS()

    if (authdata.loggedIn) {
      return this.renderUser(authdata)
    } else {
      return this.renderGuest()
    }
  }
}
