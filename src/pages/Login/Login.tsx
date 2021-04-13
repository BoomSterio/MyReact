import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/auth-reducer'
import { LoginFormValuesType, LoginReduxForm } from './LoginForm'

type Props = {}

const Login: React.FC<Props> = props => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  let apiError

  const dispatch = useDispatch()

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
  }

  if (isAuth) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
      </div>
    </div>
  )
}

export default Login
