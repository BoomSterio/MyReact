import st from './FormsControls.module.css'
import React from 'react'
import {WrappedFieldMetaProps} from 'redux-form'

type FormControlPropsType = {
    input: any
    meta: WrappedFieldMetaProps
    Element: string
}

const FormControl: React.FC<FormControlPropsType> = ({input, meta: {touched, error}, Element, ...props}) => {
    const hasError = touched && error

    return (
        <div className={st.formControl + ' ' + hasError ? st.error : ''}>
            <div>
                <Element {...input} {...props}/>
            </div>
            {hasError && <span className={st.error}>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<any> = (props) => {
    return <FormControl {...props} Element={'textarea'}></FormControl>
}

export const Input: React.FC<any> = (props) => {
    return <FormControl {...props} Element={'input'}></FormControl>
}
