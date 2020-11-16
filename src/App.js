import "./App.css";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Groups from "./components/Groups/Groups";
import Feed from "./components/Feed/Feed";

function App(props) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                   {/* <Route path="" render={() => (<Redirect to="/profile"/>)}/>*/}
                    <Route path="/dialogs"  render={() => <Dialogs state={props.state.dialogsPage} />}/>
                    <Route path="/profile"  render={() => <Profile profilePage={props.state.profilePage} updatePostText={props.updatePostText} addPost={props.addPost} />}/>
                    <Route path="/feed"     render={() => <Feed />}/>
                    <Route path="/groups"   render={() => <Groups />}/>
                    <Route path="/music"    render={() => <Music />}/>
                    <Route path="/settings" render={() => <Settings />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
