import {maxLengthCreator, required} from "../../../../utils/validators/validator";
import st from "../MyPosts.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/Forms/FormsControls";

const maxLength = maxLengthCreator(150);

function PostForm(props) {
    return (
        <form className={st.postCreator} onSubmit={props.handleSubmit}>
            <Field autoFocus={true} name={"text"} component={Textarea} validate={[maxLength]} />
            <button>ADD POST</button>
        </form>
    )
}

export default reduxForm({form: "postArea"}) (PostForm); //hoc