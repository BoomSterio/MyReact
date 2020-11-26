import Dialogs from "./Dialogs";
import {sendMessage, messageChange} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
/*let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageText: (text) => {
            dispatch(messageChangeActionCreator(text));
        },
        sendMessage: () => {
            dispatch(sendMessageActionCreator())
        }
    }
}*/

const DialogsContainer = connect (mapStateToProps, {sendMessage, messageChange})(Dialogs);

export default DialogsContainer;