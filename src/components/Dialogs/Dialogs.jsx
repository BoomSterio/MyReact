import st from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Messages/Message/Message";

function Dialogs(props) {
    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name}   id={d.id}     img={d.img}/>);
    let messagesElements = props.state.messages.map(m => <Message id={m.id} message={m.text}/>);

    return (
        <div className={st.dialogs}>
            <div className={st.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={st.messages}>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;