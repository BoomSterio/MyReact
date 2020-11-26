import st from './ProfileInfo.module.css'
import userPfp from "../../../assets/images/user.jpg";
import sunrise from "../../../assets/images/sunrise.png"

function ProfileInfo(props) {
    return (
        <div className={st.profileInfo}>
            <div>
                <img className={st.banner}
                     src={sunrise}
                     alt="pfBanner"
                />
            </div>
            <div className={st.pfp}>
                <img src={(props.profile.photos.large == null) ? userPfp : props.profile.photos.large}
                     alt="pfp"
                />
            </div>
            <div className={st.info}>
                <div className={st.fullName}>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
            </div>
        </div>
    );
}

export default ProfileInfo;