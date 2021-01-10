import st from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./Messages/Messages";
import {InitialStateType} from "../../redux/dialogs-reducer";
import React from "react";

type Props = {
    dialogsPage: InitialStateType
    sendMessage: (messageBody: string) => void
}

const Dialogs: React.FC<Props> = (props) => {
    const state = props.dialogsPage;
debugger
    const dialogsElements = state.dialogs.map((d) => <DialogItem name={d.name} img={d.img} key={d.id} id={d.id}/>);

    return (
        <div className={st.dialogs}>
            <div className={st.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={st.messages}>
                <Messages messages={props.dialogsPage.messages}
                          sendMessage={props.sendMessage}/>
            </div>
        </div>
    );
}

export default Dialogs;