import {maxLengthCreator, minLengthCreator, required} from '../../utils/validators/validators'
import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Input} from '../common/Forms/FormsControls'
import st from '../common/Forms/FormsControls.module.css'

const maxPassLength = maxLengthCreator(16)
const minPassLength = minLengthCreator(4)
const maxEmailLength = maxLengthCreator(28)

type OwnPropsType = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, OwnPropsType> & OwnPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form style={{color:'black'}} onSubmit={handleSubmit}>
            <div>
                <Field name={'email'} component={Input} validate={[required, maxEmailLength]} placeholder={'Email'}/>
            </div>
            <div>
                <Field name={'password'} component={Input} type={'password'}
                       validate={[required, maxPassLength, minPassLength]} placeholder={'Password'}/>
            </div>
            <div>
                <Field name={'rememberMe'} component={Input} type={'checkbox'}/><label
                htmlFor={'rememberMe'}>Remember me</label>
            </div>
            {captchaUrl &&
            <div>
                <div>
                    <img src={captchaUrl} alt={'captcha'}/>
                </div>
                <div>
                    <Field name={'captcha'} component={Input} type={'input'} placeholder={'Symbols from image'}
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

export const LoginReduxForm = reduxForm<LoginFormValuesType, OwnPropsType>({form: 'login'})(LoginForm)   //hoc

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}