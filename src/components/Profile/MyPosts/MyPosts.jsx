import st from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {
    let postsElements = props.posts.map(p => <Post name={p.name} message={p.message} likes={p.likes} img={p.img}/>)

    return (
        <div>
            <div className={st.postingBlock}>
                <h3>My posts</h3>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={st.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
