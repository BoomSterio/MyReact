import st from './FriendsBanner.module.css'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getTotalUsersCount, getUsers} from '../../../../redux/users-selectors'
import React, {useEffect} from 'react'
import {requestUsers} from '../../../../redux/users-reducer'
import {Button, Col, Row} from 'antd'
import user from '../../../../assets/images/user.jpg'

type Props = {}

const FriendsBanner: React.FC<Props> = (props) => {
    const totalFriendsCount = useSelector(getTotalUsersCount)
    const users = useSelector(getUsers)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(1, 6, {term: '', friend: true}))
    }, [])

    const usersElementsRow1 = users.slice(-3).map((u) => (
        <Col span={8} className={st.icon} key={u.id}>
            <NavLink to={'/profile/' + u.id}><img src={u.photos.small ? u.photos.small : user} alt={''}/></NavLink>
        </Col>
    ))
    const usersElementsRow2 = users.slice(0, 3).map((u) => (
        <Col span={8} className={st.icon} key={u.id}>
            <NavLink to={'/profile/' + u.id}><img src={u.photos.small ? u.photos.small : user} alt={''}/></NavLink>
        </Col>
    ))

    return (
        <div>
            <div className={st.friendsShortcut}>
                <Button>
                    <NavLink to={'/users'}>Friends ({totalFriendsCount})</NavLink>
                </Button>
            </div>
            <hr/>
            <div className={st.friendsIcons}>
                <Row gutter={[8, 8]}>
                    {usersElementsRow1}
                </Row>
                <Row gutter={[8, 8]}>
                    {usersElementsRow2}
                </Row>
            </div>
        </div>
    )
}

export default FriendsBanner