import React from "react"
import { useSelector } from "react-redux"
import PageLoader from "../../../components/PageLoader"
import { getAuthState } from "../selectors"
import { AuthData, AuthDataLoggedIn } from "../types"

const Details = ({ data }: { data: AuthDataLoggedIn }) => {
  const details = data.details as Record<string, string>
  const metadata = data.metadata

  return (
    <div>
      <h1>
        Profile: {data.details.username} ({data.details.realname})
      </h1>

      <p>Stored data in CYBs system:</p>
      <dl className="dl-horizontal">
        {Object.keys(details).map((key) => (
          <React.Fragment key={key}>
            <dt>{key}</dt>
            <dd>{details[key]}</dd>
          </React.Fragment>
        ))}
      </dl>
      {metadata && (
        <div>
          <p>Data from remote authentication system:</p>
          <dl className="dl-horizontal">
            {Object.keys(metadata).map((key) => (
              <React.Fragment key={key}>
                <dt>{key}</dt>
                <dd>
                  <ul>
                    {metadata[key].map((subval) => (
                      <li key={subval}>{subval}</li>
                    ))}
                  </ul>
                </dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
      )}
    </div>
  )
}

const Guest = () => (
  <>
    <h1>Profile</h1>
    <p>
      You need to be signed in to see this page. It will show details about you,
      but who are you?
    </p>
  </>
)

export const Profile = () => {
  const state = useSelector(getAuthState)

  if (state.data == null) {
    return (
      <PageLoader
        error={state.error?.message}
        isLoading={state.isLoading}
        title="Profile"
      />
    )
  }

  const data: AuthData = state.data

  return data.loggedIn ? <Details data={data} /> : <Guest />
}
