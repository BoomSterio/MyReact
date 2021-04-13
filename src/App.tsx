import React from 'react'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import './App.css'
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Music from './pages/Music/Music'
import Settings from './pages/Settings/Settings'
import Groups from './pages/Groups/Groups'
import Feed from './pages/Feed/Feed'
import Dialogs from './pages/Dialogs/Dialogs'
import Header from './components/Header/Header'
import Login from './pages/Login/Login'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import store, { AppStateType } from './redux/redux-store'
import { withSuspence } from './hoc/withSuspence'
import { Layout } from 'antd'
import Chats from './pages/Chats/Chats'

const { Content, Footer } = Layout

const ProfileContainer = React.lazy(() => import('./pages/Profile/ProfileContainer'))
const UsersPage = React.lazy(() => import('./pages/Users/Users'))
const SuspendedUsersPage = withSuspence(UsersPage)
const SuspendedProfilePage = withSuspence(ProfileContainer)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = {
  initializeApp: () => void
}

/*const breadcrumbNameMap = {
    '/apps': 'Application List',
    '/apps/1': 'Application1',
    '/apps/2': 'Application2',
    '/apps/1/detail': 'Detail',
    '/apps/2/detail': 'Detail',
};*/

class App extends React.Component<StateProps & DispatchProps> {
  catchUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
    console.error(promiseRejectionEvent)
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <Layout>
        <Header />
        <Content style={{ padding: '0 2%' }}>
          {/*<Breadcrumb style={{margin: '16px 0'}}>
                        todo: implement breadcrumbs
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>*/}
          <Layout style={{ padding: '2% 0' }}>
            <Navbar />
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                <Redirect exact from="/" to="/profile" />
                <Redirect exact from="/MyReact" to="/profile" />
                <Route path="/profile/:userId?" render={() => <SuspendedProfilePage />} />
                <Route path="/dialogs" render={() => <Dialogs />} />
                <Route path="/chats" render={() => <Chats />} />
                <Route path="/feed" render={() => <Feed />} />
                <Route path="/users" render={() => <SuspendedUsersPage />} />
                <Route path="/groups" render={() => <Groups />} />
                <Route path="/music" render={() => <Music />} />
                <Route path="/settings" render={() => <Settings />} />
                <Route path="/login" render={() => <Login />} />
                <Route
                  path="*"
                  render={() => (
                    <>
                      404
                      <br />
                      PAGE NOT FOUND
                    </>
                  )}
                />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>WorkBook © 2020-{new Date().getFullYear()} All rights reserved</Footer>
      </Layout>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({ initialized: state.app.initialized })

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App)

const MainApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default MainApp
