const ADD_POST = "ADD-POST";
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT";

const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST: {
            if (state.newPostText==="")
                break;

            let newPost = {
                id: 5,
                message: state.newPostText,
                name: "Капитан Жмышенко",
                likes: 0,
                img: "https://i.kym-cdn.com/entries/icons/original/000/028/692/cat.jpg"
            }
            state.posts.push(newPost);
            state.newPostText = "";
            break;
        }
        case UPDATE_POST_TEXT: {
            state.newPostText = action.text;
            break;
        }
        default:
            break;
    }

    return state;
}

export default profileReducer;