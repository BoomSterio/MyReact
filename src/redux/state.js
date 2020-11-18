import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

const ADD_POST = "ADD-POST";
const UPDATE_POST_TEXT = "UPDATE-POST-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

let store = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: 1,
                    message: "Is it your first day on the internet lmao",
                    name: "Kabluk Jma",
                    likes: 69,
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm_fOn75B7WzCl9gIhBqAqjiSmCIqwdQrDEHzf0HTIfCqCq1Vj71iszAMirZc4alSA0ygIgWxOAY5fiSypsQTCvd6r4uNmGqjt70ueivg&usqp=CAU&ec=45725303"
                },
                {
                    id: 2,
                    message: "Nice dck bro",
                    name: "Fikalis Anton",
                    likes: 100,
                    img: "https://i.pinimg.com/564x/f1/23/05/f1230501d33cb2c6055b2d6ea221a22d.jpg"
                },
                {
                    id: 3,
                    message: "would you simp for me",
                    name: "Kakun Barov",
                    likes: 14,
                    img: "https://media.tenor.com/images/c50ba1f5c34496af4f9eb2a805ef29ea/tenor.gif"
                },
                {
                    id: 4,
                    message: "каво",
                    name: "Big Brother",
                    likes: 26,
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRB_mt5A7b2-UR_9NKmESs-1OJ9-daZW9xaeg&usqp=CAU"
                },
                {
                    id: 5,
                    message: "это я, упал намоченный генерал",
                    name: "Герой Украины",
                    likes: 61,
                    img: "https://pbs.twimg.com/media/C5AmsxoWIAAWlfS.jpg"
                },
            ],
            newPostText: "",

        },
        dialogsPage: {
            dialogs: [
                {
                    name: "Sobaka",
                    id: 19700291,
                    img: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/people_foods_cats_can_eat_slideshow/1800x1200_people_foods_cats_can_eat_slideshow.jpg"
                },
                {
                    name: "Pes",
                    id: 19700292,
                    img: "https://www.newshub.co.nz/dam/form-uploaded-images-ordered/2019/08/08/KNOWYOURMEME-sad-cat-crying-1120.JPG"
                },
                {
                    name: "Kevin",
                    id: 19700293,
                    img: "https://i.pinimg.com/originals/2f/66/ab/2f66abb007554ade8d4ee784259c1322.jpg"
                },
                {name: "Baksss", id: 19700294, img: "https://i.imgflip.com/3aun8x.jpg"},
                {
                    name: "Valera",
                    id: 19700295,
                    img: "https://cnet2.cbsistatic.com/img/S8WsucQh6wWeUG1yrQi66jKNtto=/940x0/2020/09/22/ad4bd31b-cf8c-46f5-aa70-231df9acc041/longcat.jpg"
                },
                {
                    name: "Oreo",
                    id: 19700296,
                    img: "https://i.pinimg.com/originals/3c/43/79/3c43793225d7167513691eb2a525df2e.jpg"
                },
            ],
            messages: [
                {id: 1, type: "otherMessage", text: "iuwbipudscvpsiudvo dasoduo wdu qiwdbiu"},
                {id: 2, type: "myMessage", text: "это сарказм?"},
                {id: 3, type: "otherMessage", text: "tenet apero rotas"},
                {id: 4, type: "myMessage", text: "каво"},
            ],
            newMessageText: "",
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log("changed");
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;                 //паттерн observer
    },

    dispatch(action) {
        this._state.profilePage=profileReducer(this._state.profilePage, action);
        this._state.dialogsPage=dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);
    },
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}
export const postChangeActionCreator = (text) => {
    return {
        type: UPDATE_POST_TEXT,
        text: text
    }
}

export const sendMessageActionCreator = () => {
    return {
        type: SEND_MESSAGE
    }
}
export const messageChangeActionCreator = (text) => {
    return {
        type: UPDATE_MESSAGE_TEXT,
        text: text
    }
}

window.store=store;

export default store;