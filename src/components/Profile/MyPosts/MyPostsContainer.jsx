import React from 'react';
import {addPostActionCreator, postChangeActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

function MyPostsContainer(props) {
    debugger;
    let state = props.store.getState();


    const addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    const onPostChange = (text) => {
        props.store.dispatch(postChangeActionCreator(text));
    }

    return (
        <MyPosts updatePostText={onPostChange} addPost={addPost}
                 posts={state.profilePage.posts}
                 newPostText={state.profilePage.newPostText}/>
    );
}

export default MyPostsContainer;
