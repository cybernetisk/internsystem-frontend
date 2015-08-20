import {Route} from 'react-router'

import Index from './IndexView'

export default (
  <Route>
    <Route name='varer' path='/varer' handler={Index}/>
  </Route>
)
