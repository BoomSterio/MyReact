import React from 'react';
import st from "./MyPosts.module.css";
import Post from "./Post/Post";
import PostForm from "./PostForm/PostForm";

const MyPosts = React.memo(props => {
    console.log("MYPOSTS RENDER");

    let postsElements = [...props.posts].reverse().map(p => <Post name={p.name} message={p.message} likes={p.likes}
                                                   img={p.img}
                                                   key={p.id} id={p.id}/>);

    const onAddPost = (formData) => {
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
})


export default MyPosts;
