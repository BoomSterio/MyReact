import "./App.css";
import {BrowserRouter, Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Groups from "./components/Groups/Groups";
import Feed from "./components/Feed/Feed";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";

function App() {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path="/profile/:userId?"  render={() => <ProfileContainer />}/>
                    <Route path="/dialogs"  render={() => <DialogsContainer />}/>
                    <Route path="/feed"     render={() => <Feed />}/>
                    <Route path="/users"    render={() => <UsersContainer />}/>
                    <Route path="/groups"   render={() => <Groups />}/>
                    <Route path="/music"    render={() => <Music />}/>
                    <Route path="/settings" render={() => <Settings />}/>
                    <Route path="/login" render={() => <LoginPage />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
