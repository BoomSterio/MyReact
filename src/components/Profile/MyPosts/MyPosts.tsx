import React from 'react';
import st from "./MyPosts.module.css";
import Post from "./Post/Post";
import PostForm, {AddPostTextType} from "./PostForm/PostForm";
import {PostType} from "../../../types/types";

type Props = {
    posts: Array<PostType>
    addPost: (text: string) => void
}

const MyPosts: React.FC<Props> = (props) => {
    console.log("MYPOSTS RENDER");

    let postsElements = [...props.posts].reverse().map(p => <Post name={p.name} message={p.message} likes={p.likes}
                                                                  img={p.img}
                                                                  key={p.id} id={p.id}/>);

    const onAddPost = (formData: AddPostTextType) => {
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

const MyPostsMemo = React.memo(MyPosts);

export default MyPostsMemo;
