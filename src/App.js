import "./App.css";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Groups from "./components/Groups/Groups";
import Feed from "./components/Feed/Feed";
import Friends from "./components/Friends/Friends";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

function App() {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path="/dialogs"  render={() => <DialogsContainer />}/>
                    <Route path="/profile"  render={() => <Profile />}/>
                    <Route path="/feed"     render={() => <Feed />}/>
                    <Route path="/groups"   render={() => <Groups />}/>
                    <Route path="/friends"  render={() => <Friends />}/>
                    <Route path="/music"    render={() => <Music />}/>
                    <Route path="/settings" render={() => <Settings />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
