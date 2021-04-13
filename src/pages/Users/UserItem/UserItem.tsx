import st from './UserItem.module.css'
import userPfp from '../../../assets/images/user.jpg'
import { Link, NavLink } from 'react-router-dom'
import { UserType } from '../../../types/types'
import React from 'react'
import { Col, Row } from 'antd'
import FollowingButton from '../../../components/common/FollowingButton/FollowingButton'
import { Image } from 'react-bootstrap'

type Props = {
  user: UserType
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  followingInProgress: Array<number>
}

const UserItem: React.FC<Props> = ({ user, follow, unfollow, followingInProgress }) => {
  return (
    <div className={st.user}>
      <Row gutter={[16, 8]}>
        <Col span={2} xs={5} sm={4} md={3} lg={2}>
          <div className={st.avatar}>
            <NavLink to={'/profile/' + user.id}>
              <Image className={'img-fluid'} src={user.photos.small == null ? userPfp : user.photos.small} alt={'userPfp'} roundedCircle />
            </NavLink>
          </div>
        </Col>
        <Col span={8} xs={5} sm={6} md={7} lg={8}>
          <div className={st.info}>
            <Link to={'/profile/' + user.id}>
              <span className={'name ' + st.fullName}>{user.name}</span>
            </Link>
            <div className={st.status}>{user.status}</div>
          </div>
        </Col>
        <Col span={14}>
          <div className={st.location}>
            {/*todo: for future API updates*/}
            <div>{'user.location.country'}</div>
            <div>{'user.location.city'}</div>
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col span={2}>
          <div>
            <FollowingButton
              followed={user.followed}
              isFollowingInProgress={followingInProgress.some((id: number) => id === user.id)}
              id={user.id}
              handleFollow={follow}
              handleUnfollow={unfollow}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default UserItem
