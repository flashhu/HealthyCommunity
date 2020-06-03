import React from 'react'
import { Switch, Route, HashRouter as Router} from 'react-router-dom'
import loadable from '@loadable/component'
import NavWrapper from './component/NavWrapper'
import FixedBar from './component/FixedBar'
import ContentWrapper from './component/ContentWrapper'
import ConfWrapper from './component/ConfWrapper'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={loadable(() => import('./app/login'))} />>
        <Route path='/register' exact component={loadable(() => import('./app/register'))} />
        <Route path='/' render={() => (
          <div className="app-root">
            <NavWrapper />
            <ContentWrapper>
              <Switch>
                <Route path='/' exact component={loadable(() => import('./app/health'))} />
                <Route path='/notice' exact component={loadable(() => import('./app/notice'))} />
                <Route path='/edit/:id' exact component={loadable(() => import('./app/edit'))} />
                <Route path='/detail/:id' exact component={loadable(() => import('./app/detail'))} />
                <Route path='/conf' render={() => (
                  <ConfWrapper>
                    <Route path='/conf' exact component={loadable(() => import('./app/conf'))} />
                    <Route path='/conf/org' exact component={loadable(() => import('./app/org'))} />
                  </ConfWrapper>
                )} />
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
