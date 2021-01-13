import st from "./MessageForm.module.css";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/Forms/FormsControls";
import {maxLengthCreator} from "../../../../utils/validators/validators";
import {MessageFormValuesType} from "../Messages";
import React from "react";
import { SendOutlined } from "@ant-design/icons";

const maxLength = maxLengthCreator(100)

const MessageForm: React.FC<InjectedFormProps<MessageFormValuesType>> = (props) => {
    return (
        <form className={st.messageCreator} onSubmit={props.handleSubmit}>
            <Field name={"messageBody"} component={Textarea} validate={[maxLength]} autoFocus={true} placeholder="Enter your message..." />
            <button><SendOutlined /></button>
        </form>
    )
}

export default reduxForm<MessageFormValuesType>({form: "messageForm"})(MessageForm); //hoc

