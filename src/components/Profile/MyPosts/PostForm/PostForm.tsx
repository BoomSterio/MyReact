import {maxLengthCreator} from '../../../../utils/validators/validators'
import st from '../MyPosts.module.css'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Textarea} from '../../../common/Forms/FormsControls'
import React from 'react'

const maxLength = maxLengthCreator(150)

export type AddPostTextType = {
    text: string
}

type Props = {}


const PostForm: React.FC<InjectedFormProps<AddPostTextType> & Props> = (props) => {
    return (
        <form className={st.postCreator} onSubmit={props.handleSubmit}>
            <Field autoFocus={true} name={'text'} component={Textarea} validate={[maxLength]}/>
            <button>ADD POST</button>
        </form>
    )
}

export default reduxForm<AddPostTextType>({form: 'postArea'})(PostForm) //hoc