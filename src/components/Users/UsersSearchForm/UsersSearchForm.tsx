import {Field, Form, Formik} from 'formik'
import AntdField from 'formik-antd/es/input'
import 'formik-antd/es/field/style'
import st from './UsersSearchForm.module.css'
import React from 'react'
import {FilterType} from '../../../redux/users-reducer'
import {Button} from 'antd'
import {Radio} from 'formik-antd'

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
        <Formik enableReinitialize
                initialValues={{term: String(filter.term), friend: String(filter.friend) as FriendFormType}}
                validate={usersSearchFormValidate} onSubmit={submit}>
            {({isSubmitting}) => (
                <Form className={st.filters}>
                    <Radio.Group name={'friend'}>
                        <Radio.Button id={'allUsers'} value={'null'}>
                            All users
                        </Radio.Button>
                        <Radio.Button id={'friends'} value={'true'}>
                            Following
                        </Radio.Button>
                        <Radio.Button id={'notFriends'} value={'false'}>
                            Not following
                        </Radio.Button>
                    </Radio.Group>
                    {/*<Field className={st.usersSwitch} id={'allUsers'} value={'null'} name={'friend'}
                           type={'radio'}/><label htmlFor={'allUsers'}>All users</label>
                    <Field className={st.usersSwitch} id={'friends'} value={'true'} name={'friend'}
                           type={'radio'}/><label htmlFor={'friends'}>Following</label>
                    <Field className={st.usersSwitch} id={'notFriends'} value={'false'} name={'friend'}
                           type={'radio'}/><label htmlFor={'notFriends'}>Not Following</label>*/}
                    <AntdField className={st.usersSearch} type={'text'} name={'term'}/>
                    <Button type={'primary'} htmlType='submit' loading={isSubmitting}>Apply</Button>
                </Form>
            )}
        </Formik>
    )
})

export default UsersSearchForm