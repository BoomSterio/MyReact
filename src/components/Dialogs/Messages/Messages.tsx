import React from 'react';
import st from './Messages.module.css';
import Message from "./MessageItem/Message";
import MessageForm from "./MessageForm/MessageForm";
import {MessageType} from "../../../redux/dialogs-reducer";

type Props = {
    messages: Array<MessageType>
    sendMessage: (messageBody: string) => void
}

export type MessageFormValuesType = {
    messageBody: string
}

const Messages: React.FC<Props> = (props) => {
    let messagesElements = props.messages.map(m => <Message message={m.text} type={m.type} key={m.id}
                                                                  id={m.id}/>);

    function onSendMessage(values: MessageFormValuesType) {
        props.sendMessage(values.messageBody);
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