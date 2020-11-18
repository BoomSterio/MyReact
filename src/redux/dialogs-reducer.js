const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

const dialogsReducer = (state, action) => {
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
            break;
    }

    return state;
}

export default dialogsReducer;