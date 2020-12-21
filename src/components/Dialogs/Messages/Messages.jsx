import React from 'react';
import st from './Messages.module.css';
import Message from "./MessageItem/Message";
import MessageForm from "./MessageForm/MessageForm";

function Messages(props) {
    let messagesElements = props.state.messages.map(m => <Message message={m.text} type={m.type} key={m.id}
                                                                  id={m.id}/>);

    function onSendMessage(values) {
        props.sendMessage(values.messageText);
    }

    return (
        <div className={st.chat}>
            <div className={st.messages}>
                {messagesElements}
            </div>
            <div>
                <MessageForm onSubmit={onSendMessage}/>
            </div>
        </div>
    );
}

export default Messages;