import React from 'react'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import './App.css'
import 'antd/dist/antd.dark.css'
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import Groups from './components/Groups/Groups'
import Feed from './components/Feed/Feed'
import Dialogs from './components/Dialogs/DialogsContainer'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import store, {AppStateType} from './redux/redux-store'
import {withSuspence} from './hoc/withSuspence'
import {Breadcrumb, Layout, Menu} from 'antd'

const {SubMenu} = Menu
const { Content, Footer, Sider} = Layout

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersPage = React.lazy(() => import('./components/Users/Users'))
const SuspendedUsersPage = withSuspence(UsersPage)
const SuspendedProfilePage = withSuspence(ProfileContainer)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = {
    initializeApp: () => void
}

//todo: redisign with Ant Design
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
            return <Preloader/>
        }

        return (
            <Layout>
                <Header />
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Navbar/>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Redirect exact from="/" to="/profile"/>
                                <Route path="/profile/:userId?" render={() => <SuspendedProfilePage/>}/>
                                <Route path="/dialogs" render={() => <Dialogs/>}/>
                                <Route path="/feed" render={() => <Feed/>}/>
                                <Route path="/users" render={() => <SuspendedUsersPage/>}/>
                                <Route path="/groups" render={() => <Groups/>}/>
                                <Route path="/music" render={() => <Music/>}/>
                                <Route path="/settings" render={() => <Settings/>}/>
                                <Route path="/login" render={() => <Login/>}/>
                                <Route path="*" render={() => <div>404<br/>PAGE NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Anti-hOOman Zone ©2021 All rights reserved</Footer>
            </Layout>
            /*<div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>

                </div>
            </div>*/
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({initialized: state.app.initialized})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)

const MainApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp
