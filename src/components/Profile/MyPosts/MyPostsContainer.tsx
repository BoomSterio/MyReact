import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    debugger
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

const MyPostsContainer = connect(mapStateToProps, {addPost: actions.addPost})(MyPosts)

export default MyPostsContainer;
