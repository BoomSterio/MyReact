import st from "./UserItem.module.css";
import userPfp from "../../../assets/images/user.jpg"
import {NavLink} from "react-router-dom";
import {UserType} from "../../../types/types";
import React from "react";
import {Button, Col, Row} from 'antd'

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
                            <NavLink to={"/profile/" + user.id}>
                                <img className={st.img} src={(user.photos.small == null) ? userPfp : user.photos.small}
                                     alt="userPfp"/>
                            </NavLink>
                        </div>

                    </div>
                </Col>
                <Col span={8}>
                    <div className={st.info}>
                        <NavLink to={"/profile/" + user.id}>
                            <div style={{paddingLeft: '0.5vw'}} className={st.fullName}>{user.name}</div>
                        </NavLink>
                        <div className={st.status}>{user.status}</div>
                    </div>
                </Col>
                <Col span={14}>
                    <div className={st.location}>
                        {/*todo: for future API updates*/}
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </div>
                </Col>
            </Row>
            <Row gutter={[8, 16]}>
                <Col span={2}>
                    <div>
                        <Button style={user.followed
                                ? {borderWidth:'2px', borderStyle: 'groove', color: 'darkred',  borderRadius: '0.5vw'}
                                : {borderWidth:'2px', borderStyle: 'groove', color: 'green', borderRadius: '0.5vw'}}
                                loading={followingInProgress.some((id: number) => id === user.id)}
                                onClick={user.followed ? () => {unfollow(user.id)} : () => {follow(user.id)}}>
                            {user.followed ? "Unfollow" : "Follow"}</Button>
                    </div>
                </Col>
                <Col span={22}></Col>
            </Row>
        </div>

    );
}

export default UserItem;