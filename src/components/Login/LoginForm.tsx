import React, {useState} from 'react'
import st from './Login.module.css'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {Button} from 'antd'
import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'

const maxPassLength = 16
const minPassLength = 4
const maxEmailLength = 28
const minEmailLenth = 5

const loginFormValidate = (values: any) => {
    const errors: any = {
        /*email: '',
        password: '',
        rememberMe: '',
        captcha: ''*/
    }

    if(values.email.length > maxEmailLength) {
        errors.email = 'Max length is ' + maxEmailLength
    }

    if(values.email.length < minEmailLenth) {
        errors.email = 'Min length is ' + minEmailLenth
    }

    if(values.password.length > maxPassLength) {
        errors.password = 'Max length is ' + maxPassLength
    }

    if(values.password.length < minPassLength) {
        errors.password = 'Min length is ' + minPassLength
    }

    return errors
}

type OwnPropsType = {
    onSubmit: (formData: LoginFormValuesType) => void
    captchaUrl: string | null
}

const LoginForm: React.FC<OwnPropsType> = (props) => {
    const [isPassVisible, setIsPassVisible] = useState(false)
    const error = useSelector((state: AppStateType) => state.auth.error)

    const onTogglePassVisibility = () => {
        setIsPassVisible(!isPassVisible)
    }

    const submit = (values: LoginFormValuesType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmitting(true)
        const loginFormValues: LoginFormValuesType = {
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe,
            captcha: values.captcha
        }

        props.onSubmit(loginFormValues)

        setSubmitting(false)
    }

    return (
        <Formik initialValues={{
            email: String(''),
            password: String(''),
            rememberMe: Boolean(false),
            captcha: String('')
        }}
                validate={loginFormValidate} onSubmit={submit}>
                {({isSubmitting}) => (
                <Form className={st.form}>
                    <div className={st.formItem}>
                        <div>Email or login</div>
                        <Field name={'email'} id={'email'} type={'email'} placeholder={'email'}/>
                        <ErrorMessage className={st.error} name={'email'} component={'div'}/>
                    </div>
                    <div className={st.formItem}>
                        <div>Password</div>
                        <Field name={'password'} id={'password'} type={isPassVisible ? 'text' : 'password'}
                               placeholder={'password'}/>
                        <span onClick={onTogglePassVisibility}>
                            {isPassVisible ?
                                <EyeOutlined/>
                            :   <EyeInvisibleOutlined />}
                        </span>
                        <ErrorMessage className={st.error} name={'password'} component={'div'}/>

                    </div>
                    <div className={st.formItem}>
                        <label htmlFor={'rememberMe'}>Remember me</label>
                        <Field name={'rememberMe'} type={'checkbox'} style={{marginLeft: '5px'}}/>
                        <ErrorMessage className={st.error} name={'rememberMe'} component={'div'}/>
                    </div>
                    {props.captchaUrl &&
                    <div className={st.formItem}>
                        <div>
                            <img src={props.captchaUrl} alt={'captcha'}/>
                        </div>
                        <div>
                            <Field name={'captcha'} id={'captcha'} type={'input'} placeholder={'Symbols from image'}/>
                            <ErrorMessage className={st.error} name={'captcha'} component={'div'}/>
                        </div>
                    </div>}
                    {error &&
                    <div className={st.error}>
                        {error}
                    </div>}
                    <div className={st.formItem}>
                        <Button type={'primary'} htmlType='submit' loading={isSubmitting}>Apply</Button>
                    </div>
                </Form>
            )}
        </Formik>
        /*<form style={{color:'black'}} onSubmit={handleSubmit}>
            <div>
                <Field name={'email'} component={Input} validate={[required, maxEmailLength]} placeholder={'Email'}/>
            </div>
            <div>
                <Field name={'password'} component={Input} type={'password'}
                       validate={[required, maxPassLength, minPassLength]} placeholder={'Password'}/>
            </div>
            <div style={{color:'white'}}>
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
        </form>*/
    )
}

export const LoginReduxForm = LoginForm

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}