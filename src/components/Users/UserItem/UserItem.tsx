import st from './UserItem.module.css'
import userPfp from '../../../assets/images/user.jpg'
import {Link, NavLink} from 'react-router-dom'
import {UserType} from '../../../types/types'
import React from 'react'
import {Button, Col, Row} from 'antd'
import FollowingButton from '../../common/FollowingButton/FollowingButton'

type Props = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
}

const UserItem: React.FC<Props> = ({user, follow, unfollow, followingInProgress}) => {
    return (
        <div className={st.user} key={user.id}>
            <Row gutter={[16, 8]}>
                <Col span={2}>
                    <div className={st.avatar}>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img className={st.img} src={(user.photos.small == null) ? userPfp : user.photos.small}
                                     alt="userPfp"/>
                            </NavLink>
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div className={st.info}>
                        <div style={{paddingLeft: '0.5vw'}} >
                            <Link to={'/profile/' + user.id}>
                                <span className={st.fullName}>{user.name}</span>
                            </Link>
                        </div>
                        <div className={st.status}>
                            {user.status}
                        </div>
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
                        <FollowingButton followed={user.followed}
                                         isFollowingInProgress={followingInProgress.some((id: number) => id === user.id)}
                                         id={user.id} handleFollow={follow} handleUnfollow={unfollow}/>
                    </div>
                </Col>
                <Col span={22}/>
            </Row>
        </div>

    )
}

export default UserItem