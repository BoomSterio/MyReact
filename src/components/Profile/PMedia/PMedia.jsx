import st from "./PMedia.module.css";
import FriendsBanner from "./FriendsBanner/FriendsBanner";

function PMedia() {
    return (
        <div>
            <div className={st.media}>
                PMedia1
                content
                content
                <br />
                content
            </div>
            <div className={st.media}>
                <FriendsBanner />
            </div>
        </div>
    );
}

export default PMedia;