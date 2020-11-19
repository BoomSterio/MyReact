const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

let initialState = {
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
}

const dialogsReducer = (state=initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            if (state.newMessageText==="")
                break;

            let newMessage = {
                id: 5,
                type: "myMessage",
                text: state.newMessageText,
            }
            state.messages.push(newMessage);
            state.newMessageText = "";
            break;
        }
        case UPDATE_MESSAGE_TEXT: {
            state.newMessageText = action.text;
            break;
        }
        default:
            return state;
    }

    return state;
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

export default dialogsReducer;