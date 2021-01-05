import React from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import "./App.css";
import {BrowserRouter, Redirect, Switch, Route, withRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Groups from "./components/Groups/Groups";
import Feed from "./components/Feed/Feed";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/LoginContainer";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspence} from "./hoc/withSuspence";

const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component {
    catchUnhandledErrors = (promiseRejectionEvent) => {
        console.error(promiseRejectionEvent);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Redirect exact from="/" to="/profile" />
                        <Route path="/profile/:userId?" render={withSuspence(ProfileContainer)}/>
                        <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                        <Route path="/feed" render={() => <Feed/>}/>
                        <Route path="/users" render={withSuspence(UsersContainer)}/>
                        <Route path="/groups" render={() => <Groups/>}/>
                        <Route path="/music" render={() => <Music/>}/>
                        <Route path="/settings" render={() => <Settings/>}/>
                        <Route path="/login" render={() => <LoginPage/>}/>
                        <Route path="*" render={() => <div>404<br/>PAGE NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({initialized: state.app.initialized})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

let MainApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp;
