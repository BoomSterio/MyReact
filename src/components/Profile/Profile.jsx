import st from './Profile.module.css';
import PMedia from "./PMedia/PMedia";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

function Profile(props) {
    return (
        <div className={st.grid}>
            <div>
                <ProfileInfo />
                <MyPostsContainer store={props.store} />
            </div>
            <div className={st.mediaBlock}>
                <PMedia/>
            </div>
        </div>
    );
}

export default Profile;
