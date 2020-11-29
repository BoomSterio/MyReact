import st from './Profile.module.css';
import PMedia from "./PMedia/PMedia";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";

function Profile(props) {
    if (!props.profile) {
        return <Preloader/>
    }
    else {
        return (
            <div className={st.grid}>
                <div>
                    <ProfileInfo profile={props.profile}/>
                    <MyPostsContainer/>
                </div>
                <div className={st.mediaBlock}>
                    <PMedia/>
                </div>
            </div>
        );
    }
}

export default Profile;
