import st from './Message.module.css'

function Message(props) {
    return (
        <div className={props.type === "myMessage" ? st.myMessage : st.message}>{props.message}</div>
    );
}

export default Message;