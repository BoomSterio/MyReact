import MyPosts from './MyPosts/MyPosts';
import st from './Profile.module.css';
import PMedia from "./PMedia/PMedia";

function Profile() {
  return (
    <div>
      <div>
        <img className={st.banner}
          src="https://www.worldtravelguide.net/wp-content/uploads/2017/04/Think-Switzerland-Country-Zermatt-Matterhorn-486574518-extravagantni-copy.jpg"
          alt="pfBanner"
        />
      </div>
      <div>
        <img
          className={st.pfp}
          src="https://img-9gag-fun.9cache.com/photo/a7WVB9b_460s.jpg"
          alt="pfp"
        />{" "}
        + description
      </div>
      <MyPosts />

    </div>
  );
}

export default Profile;
