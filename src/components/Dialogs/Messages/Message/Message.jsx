import st from './Message.module.css'

function Message(props) {
    return (
        <div className={st.message}>{props.message}</div>
    );
}

export default Message;