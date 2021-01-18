import {Field, Form, Formik} from 'formik'
import st from './UsersSearchForm.module.css'
import React from 'react'
import {FilterType} from '../../../redux/users-reducer'
import { Button } from 'antd'

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type FriendFormType = 'null' | 'true' | 'false'
type FormType = {
    term: string
    friend: FriendFormType
}

type Props = {
    filter: FilterType
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<Props> = React.memo((props) => {
    const {filter} = props

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const newFilter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(newFilter)
        setSubmitting(false)
    }

    return (
        <Formik enableReinitialize initialValues={{term: String(filter.term), friend: String(filter.friend) as FriendFormType}}
                validate={usersSearchFormValidate} onSubmit={submit}>
            {({isSubmitting}) => (
                <Form className={st.filters}>
                    <Field className={st.usersSwitch} id={'allUsers'} value={'null'} name={'friend'}
                           type={'radio'}/><label htmlFor={'allUsers'}>All users</label>
                    <Field className={st.usersSwitch} id={'friends'} value={'true'} name={'friend'}
                           type={'radio'}/><label htmlFor={'friends'}>Following</label>
                    <Field className={st.usersSwitch} id={'notFriends'} value={'false'} name={'friend'}
                           type={'radio'}/><label htmlFor={'notFriends'}>Not Following</label>
                    <Field className={st.usersSearch} type={'text'} name={'term'}/>
                    <Button type={'primary'} htmlType='submit' loading={isSubmitting}>Apply</Button>
                </Form>
            )}
        </Formik>
    )
})

export default UsersSearchForm