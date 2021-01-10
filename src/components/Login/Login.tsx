import React from "react";
import st from "../common/Forms/FormsControls.module.css"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/Forms/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";

const maxPassLength = maxLengthCreator(16);
const minPassLength = minLengthCreator(4);
const maxEmailLength = maxLengthCreator(28);

type OwnPropsType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, OwnPropsType> & OwnPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name={"email"} component={Input} validate={[required, maxEmailLength]} placeholder={"Email"}/>
            </div>
            <div>
                <Field name={"password"} component={Input} type={"password"} validate={[required, maxPassLength, minPassLength]} placeholder={"Password"}/>
            </div>
            <div>
                <Field name={"rememberMe"} component={Input} type={"checkbox"}/><span>Remember me</span>
            </div>
            {captchaUrl &&
            <div>
                <div>
                    <img src={captchaUrl} alt={"captcha"}/>
                </div>
                <div>
                    <Field name={"captcha"} component={Input} type={"input"} placeholder={"Symbols from image"}
                    validate={[required]}/>
                </div>
            </div>}
            {error &&
                <div className={st.formSummaryError}>
                    {error}
                </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, OwnPropsType>({form: "login"}) (LoginForm)  //hoc

type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
            </div>
        </div>
    )
}

export default Login