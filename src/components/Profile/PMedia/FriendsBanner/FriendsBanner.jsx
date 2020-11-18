import st from "./FriendsBanner.module.css";
import {NavLink} from "react-router-dom";

function PMedia() {
    let friendsCount = 192;
    return (
        <div>
            <div className={st.friendsShortcut}>
                <NavLink to="/friends" >Friends ({friendsCount})</NavLink>
            </div>
            <hr />
            <div className={st.icons}>
                <div>img1</div>
                <div>img2</div>
                <div>img3</div>
            </div>
        </div>
    );
}

export default PMedia;