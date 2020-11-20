import st from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";

function Dialogs(props) {
    debugger;
    const state = props.dialogsPage;

    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} img={d.img} key={d.id} id={d.id}/>);

    return (
        <div className={st.dialogs}>
            <div className={st.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={st.messages}>
                <Messages state={props.dialogsPage} updateNewMessageText={props.updateNewMessageText}
                          sendMessage={props.sendMessage}/>
            </div>
        </div>
    );
}

export default Dialogs;