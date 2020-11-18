import React from 'react';
import st from './Messages.module.css';
import Message from "./Message/Message";
import {messageChangeActionCreator, sendMessageActionCreator} from "../../../redux/state";

function Messages(props) {
    let messagesElements = props.messages.map(m => <Message id={m.id} message={m.text} type={m.type}/>);

    let newMessageElement = React.createRef();

    function sendMessage() {
        props.dispatch(sendMessageActionCreator());
    }
    function onMessageChange()
    {
        let text = newMessageElement.current.value;
        props.dispatch(messageChangeActionCreator(text));
    }

    return (
        <div className={st.chat}>
            <div className={st.messages}>
                {messagesElements}
            </div>
            <div className={st.messageCreator}>
                <textarea placeholder="Enter your message..." onChange={onMessageChange} ref={newMessageElement} value={props.newMessageText}></textarea>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Messages;