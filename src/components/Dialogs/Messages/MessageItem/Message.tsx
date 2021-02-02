import st from './Message.module.css'
import React from 'react'

type Props = {
    id: number
    type: string
    message: string
}

const Message: React.FC<Props> = (props) => {
    return (
        <div className={props.type === 'myMessage' ? st.myMessage : st.message}>{props.message}</div>
    )
}

export default Message