import React from 'react';
import st from './Messages.module.css';
import Message from "./Message/Message";

function Messages(props) {
    let messagesElements = props.state.messages.map(m => <Message message={m.text} type={m.type} key={m.id}
                                                                  id={m.id}/>);

    let newMessageElement = React.createRef();

    function onSendMessage() {
        props.sendMessage();
    }

    function onMessageChange(newMessageElement) {
        let text = newMessageElement.target.value;
        props.updateNewMessageText(text);
    }

    return (
        <div className={st.chat}>
            <div className={st.messages}>
                {messagesElements}
            </div>
            <div className={st.messageCreator}>
                <textarea placeholder="Enter your message..." onChange={onMessageChange} ref={newMessageElement}
                          value={props.state.newMessageText}></textarea>
                <button onClick={onSendMessage}>SEND</button>
            </div>
        </div>
    );
}

export default Messages;