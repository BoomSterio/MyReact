import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/Forms/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validator";

const maxPassLength = maxLengthCreator(16);
const minPassLength = minLengthCreator(4);
const maxEmailLength = maxLengthCreator(28);
const minEmailLength = minLengthCreator(6)

function LoginForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"email"} component={Input} validate={[required, maxEmailLength, minEmailLength]} placeholder={"Email"}/>
            </div>
            <div>
                <Field name={"password"} component={Input} type={"password"} validate={[required, maxPassLength, minPassLength]} placeholder={"Password"}/>
            </div>
            <div>
                <Field name={"rememberMe"} component={Input} type={"checkbox"}/><span>Remember me</span>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "login"}) (LoginForm)

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