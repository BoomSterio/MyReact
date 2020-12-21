import st from "./FormsControls.module.css"
import React from "react";

const FormControl = ({input, meta, Element, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={st.formControl + " " + hasError ? st.error : ""}>
            <div>
                <Element {...input} {...props}/>
            </div>
            {hasError && <span className={st.error}>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    return <FormControl {...props} Element={"textarea"}></FormControl>
}

export const Input = (props) => {
    return <FormControl {...props} Element={"input"}></FormControl>
}
