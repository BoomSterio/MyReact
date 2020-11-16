import React from 'react';
import st from './Messages.module.css';
import Message from "./Message/Message";

function Messages(props) {
    let messagesElements = props.messages.map(m => <Message id={m.id} message={m.text} type={m.type}/>);

    let newPostElement = React.createRef();
    function sendMessage() {

    }

    return (
        <div className={st.chat}>
            <div className={st.messages}>
                {messagesElements}
            </div>
            <div className={st.messageCreator}>
                <textarea ref={newPostElement}></textarea>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Messages;