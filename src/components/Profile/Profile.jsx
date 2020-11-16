import MyPosts from './MyPosts/MyPosts';
import st from './Profile.module.css';
import PMedia from "./PMedia/PMedia";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile(props) {
    return (
        <div className={st.grid}>
            <div>
                <ProfileInfo />
                <MyPosts posts={props.state.posts} />
            </div>
            <div className={st.mediaBlock}>
                <PMedia/>
            </div>
        </div>
    );
}

export default Profile;
