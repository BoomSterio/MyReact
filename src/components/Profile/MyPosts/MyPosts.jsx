import React from 'react';
import st from "./MyPosts.module.css";
import Post from "./Post/Post";
import PostForm from "./PostForm/PostForm";

function MyPosts(props) {
    let postsElements = props.posts.map(p => <Post name={p.name} message={p.message} likes={p.likes} img={p.img}
                                                   key={p.id} id={p.id}/>);

    function onAddPost(formData) {
        props.addPost(formData.text);
    }

    return (
        <div>
            <div className={st.postingBlock}>
                <h3>My posts</h3>
                <PostForm onSubmit={onAddPost}/>
            </div>
            <div className={st.posts}>
                {postsElements}
            </div>
        </div>
    );
}


export default MyPosts;
