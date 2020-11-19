import Dialogs from "./Dialogs";
import {messageChangeActionCreator, sendMessageActionCreator} from "../../redux/dialogs-reducer";

function DialogsContainer(props) {
    const state = props.store.getState().dialogsPage;

    function onSendMessage() {
        props.store.dispatch(sendMessageActionCreator());
    }
    function onMessageChange(text)
    {
        props.store.dispatch(messageChangeActionCreator(text));
    }

    return (
        <Dialogs updateNewMessageText={onMessageChange} sendMessage={onSendMessage} dialogsPage={state} />
    );
}

export default DialogsContainer;