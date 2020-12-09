import React from "react";
import st from "../common/Forms/FormsControls.module.css"
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/Forms/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validator";

const maxPassLength = maxLengthCreator(16);
const minPassLength = minLengthCreator(4);
const maxEmailLength = maxLengthCreator(28);

function LoginForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"email"} component={Input} validate={[required, maxEmailLength]} placeholder={"Email"}/>
            </div>
            <div>
                <Field name={"password"} component={Input} type={"password"} validate={[required, maxPassLength, minPassLength]} placeholder={"Password"}/>
            </div>
            <div>
                <Field name={"rememberMe"} component={Input} type={"checkbox"}/><span>Remember me</span>
            </div>
            {props.error &&
                <div className={st.formSummaryError}>
                    {props.error}
                </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "login"}) (LoginForm)  //hoc

function Login(props) {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default Login