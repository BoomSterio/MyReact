import React from 'react';
import st from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {
    let postsElements = props.posts.map(p => <Post name={p.name} message={p.message} likes={p.likes} img={p.img} key={p.id} id={p.id}/>);

    let newPostElement = React.createRef();

    function onAddPost() {
        props.addPost();
    }

    function onPostChange() {
        let text = newPostElement.current.value;
        props.postChange(text);
    }

    return (
        <div>
            <div className={st.postingBlock}>
                <h3>My posts</h3>
                <div className={st.postCreator}>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}></textarea>
                    <button onClick={onAddPost}>ADD POST</button>
                </div>
            </div>
            <div className={st.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
