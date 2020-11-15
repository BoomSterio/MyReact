import st from './ProfileInfo.module.css'

function ProfileInfo() {
    return (
        <div className={st.profileInfo}>
            <div>
                <img className={st.banner}
                     src="https://www.worldtravelguide.net/wp-content/uploads/2017/04/Think-Switzerland-Country-Zermatt-Matterhorn-486574518-extravagantni-copy.jpg"
                     alt="pfBanner"
                />
            </div>
            <div className={st.pfp}>
                <img src="https://img-9gag-fun.9cache.com/photo/a7WVB9b_460s.jpg"
                     alt="pfp"
                />
            </div>
            <div className={st.info}>
                <div>Name</div>
                <div>+ description</div>
            </div>
        </div>
    );
}

export default ProfileInfo;