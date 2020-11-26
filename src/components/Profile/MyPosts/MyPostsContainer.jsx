import {addPost, postChange} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

/*let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updatePostText: (text) => {
            dispatch(postChangeActionCreator(text));
        }
    }
}*/

const MyPostsContainer = connect(mapStateToProps, {addPost, postChange})(MyPosts)

export default MyPostsContainer;
