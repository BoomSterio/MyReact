import st from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";

function Dialogs(props) {
    let dialogsElements = props.messagesPage.dialogs.map(d => <DialogItem name={d.name}   id={d.id}     img={d.img}/>);

    return (
        <div className={st.dialogs}>
            <div className={st.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={st.messages}>
                <Messages messages={props.messagesPage.messages} newMessageText={props.messagesPage.newMessageText} dispatch={props.dispatch}/>
            </div>
        </div>
    );
}

export default Dialogs;