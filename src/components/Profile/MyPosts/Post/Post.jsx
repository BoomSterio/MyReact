import st from "./Post.module.css";

function Post(props) {
  return (
    <div className={st.item}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm_fOn75B7WzCl9gIhBqAqjiSmCIqwdQrDEHzf0HTIfCqCq1Vj71iszAMirZc4alSA0ygIgWxOAY5fiSypsQTCvd6r4uNmGqjt70ueivg&usqp=CAU&ec=45725303"
        alt="cpfp"
      />
      {props.message}
      <div>
        <span>like({props.likes}) </span>
      </div>
    </div>
  );
}

export default Post;
