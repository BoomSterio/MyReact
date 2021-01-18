import React from 'react'
import st from './MyPosts.module.css'
import Post from './Post/Post'
import PostForm, {AddPostTextType} from './PostForm/PostForm'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../../redux/redux-store'
import {actions} from '../../../redux/profile-reducer'

type Props = {
    isOwner: boolean
}

const MyPosts: React.FC<Props> = (props) => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts)

    const dispatch = useDispatch()

    let postsElements = [...posts].reverse().map(p => <Post name={p.name} message={p.message} likes={p.likes}
                                                                  img={p.img} isOwner={props.isOwner}
                                                                  key={p.id} id={p.id}/>);

    const onAddPost = (formData: AddPostTextType) => {
        dispatch(actions.addPost(formData.text))
    }

    return (
        <div className={st.myPosts}>
            <div className={st.postingBlock}>
                <h3>Posts</h3>
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
