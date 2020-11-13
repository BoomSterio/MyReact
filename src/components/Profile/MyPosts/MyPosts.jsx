import st from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts() {
  return (
    <div>
      My posts
      <div>
        <textarea></textarea>
        <button>Add post</button>
      </div>
      <div className={st.posts}>
        <Post name='Misha A' message='Nice dck bro' likes='69' />
        <Post name='Dima K' message='Is it your first day on the internet lmao' likes='40' />
      </div>
    </div>
  );
}

export default MyPosts;
