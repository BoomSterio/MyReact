import st from "./MessageForm.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/Forms/FormsControls";
import {maxLengthCreator} from "../../../../utils/validators/validator";

const maxLength = maxLengthCreator(100)

function MessageForm(props) {
    return (
        <form className={st.messageCreator} onSubmit={props.handleSubmit}>
            <Field name={"messageText"} component={Textarea} validate={[maxLength]} autoFocus={true} placeholder="Enter your message..." />
            <button>SEND</button>
        </form>
    )
}

const MessageReduxForm = reduxForm({form: "messageForm"})(MessageForm); //hoc

export default MessageReduxForm;