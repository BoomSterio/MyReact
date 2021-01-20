import st from './MessageForm.module.css'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Textarea} from '../../../common/Forms/FormsControls'
import {maxLengthCreator} from '../../../../utils/validators/validators'
import {MessageFormValuesType} from '../Messages'
import React from 'react'
import {SendOutlined} from '@ant-design/icons'
import {Button, Col, Row} from 'antd'

const maxLength = maxLengthCreator(100)

const MessageForm: React.FC<InjectedFormProps<MessageFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Row>
                <Col span={20}>
                    <Field className={st.textField} name={'messageBody'} component={Textarea} validate={[maxLength]}
                           autoFocus={true} placeholder="Enter your message..."/>
                </Col>
                <Col span={4}>
                    <Button className={st.submitButton} htmlType={'submit'}>
                        <SendOutlined/>
                    </Button>
                </Col>
            </Row>

        </form>
    )
}

export default reduxForm<MessageFormValuesType>({form: 'messageForm'})(MessageForm) //hoc

