import st from './Post.module.css'
import React, { useState } from 'react'
import { Button, Col, Popconfirm, Row } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { actions } from '../../../../redux/profile-reducer'
import LikeButton from '../../../../components/common/LikeButton/LikeButton'

type Props = {
  name: string
  message: string
  likes: number
  img: string
  id: number
  isOwner: boolean
}

const Post: React.FC<Props> = props => {
  let [likesCount, setLikesCount] = useState(props.likes)
  let [liked, setLiked] = useState(false)

  const dispatch = useDispatch()

  const handleLike = () => {
    setLikesCount(likesCount + 1)
    setLiked(true)
  }

  const handleDilike = () => {
    setLikesCount(likesCount - 1)
    setLiked(false)
  }

  const onDeletePost = () => {
    dispatch(actions.deletePost(props.id))
  }

  return (
    <div className={st.item + ' shadow'}>
      <Row gutter={[16, 8]}>
        <Col span={2}>
          <div className={st.img}>
            <img src={props.img} alt="cpfp" />
          </div>
        </Col>
        <Col span={19}>
          <div className={st.content}>
            <div className={'name'}>{props.name}</div>
            <div className={st.postText}>{props.message}</div>
          </div>
        </Col>
        <Col span={1} offset={2}>
          {props.isOwner && (
            <Popconfirm title={`Delete post by ${props.name}?`} onConfirm={onDeletePost} okText="Yes" cancelText="No">
              <div>
                <Button danger type={'link'} icon={<DeleteOutlined />} />
              </div>
            </Popconfirm>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={2}>
          <LikeButton count={likesCount} liked={liked} handleLike={handleLike} handleDislike={handleDilike} />
        </Col>
      </Row>
      {/*<div className={st.img}>
                    <img
                        src={props.img}
                        alt="cpfp"
                    />
                </div>
                <div className={st.content}>
                    <div className={st.name}>
                        {props.name}
                    </div>
                    <div className={st.postText}>
                        {props.message}
                    </div>
                </div>
                <div>
                    <span>like ({props.likes}) </span>
                </div>*/}
    </div>
  )
}

export default Post
