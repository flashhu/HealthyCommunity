import React from 'react'
import { Switch, Route, HashRouter as Router} from 'react-router-dom'
import loadable from '@loadable/component'
import NavWrapper from './component/NavWrapper'
import FixedBar from './component/FixedBar'
import ContentWrapper from './component/ContentWrapper'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={loadable(() => import('./app/common/login'))} />>
        <Route path='/login' component={loadable(() => import('./app/common/login'))} />>
        <Route path='/register' component={loadable(() => import('./app/common/register'))} />
        <Route path='/admin' render={() => (
          <div className="app-root">
            <NavWrapper />
            <ContentWrapper>
              <Switch>
                <Route path='/admin' exact component={loadable(() => import('./app/admin/health'))} />
                <Route path='/admin/health'  component={loadable(() => import('./app/admin/health'))} />
                <Route path='/admin/notice' component={loadable(() => import('./app/admin/notice'))} />
                <Route path='/admin/conf' component={loadable(() => import('./app/admin/conf'))} />
              </Switch>
            </ContentWrapper>
            <FixedBar />
          </div>
        )} />
        <Route path='/' render={() => (
          <div className="app-root">
            <NavWrapper />
            <ContentWrapper>
              <Switch>
                <Route path='/health' exact component={loadable(() => import('./app/user/health'))} />
                <Route path='/service' exact component={loadable(() => import('./app/user/service'))} />
                <Route path='/notice' exact component={loadable(() => import('./app/user/notice'))} />
                <Route path='/conf' exact component={loadable(() => import('./app/user/conf'))} />
              </Switch>
            </ContentWrapper>
            <FixedBar />
          </div>
        )} />
      </Switch>
    </Router>
  );
}

export default App;
