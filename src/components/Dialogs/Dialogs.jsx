import st from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";

function Dialogs(props) {
    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name}   id={d.id}     img={d.img}/>);

    return (
        <div className={st.dialogs}>
            <div className={st.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={st.messages}>
                <Messages messages={props.state.messages}/>
            </div>
        </div>
    );
}

export default Dialogs;