import "./App.css";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Groups from "./components/Groups/Groups";
import Feed from "./components/Feed/Feed";
import Friends from "./components/Friends/Friends";

function App(props) {
    debugger;
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                   {/* <Route path="" render={() => (<Redirect to="/profile"/>)}/>*/}
                    <Route path="/dialogs"  render={() => <Dialogs messagesPage={props.state.dialogsPage} dispatch={props.dispatch} />}/>
                    <Route path="/profile"  render={() => <Profile profilePage={props.state.profilePage} dispatch={props.dispatch} />}/>
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
