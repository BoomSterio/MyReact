import st from './Message.module.css'

function Message(props) {
    if (props.type !== "myMessage") {
        return (
            <div className={st.message}>{props.message}</div>
        );
    }
    else {
        return (
            <div className={st.myMessage}>{props.message}</div>
        );
    }
}

export default Message;