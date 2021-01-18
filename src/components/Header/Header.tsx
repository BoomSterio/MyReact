import logo from '../../assets/images/icon.png'
import st from './Header.module.css'
import {Link} from 'react-router-dom'
import React from 'react'
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {getIsAuth, getUserLogin} from '../../redux/auth-selectors'
import {logout} from '../../redux/auth-reducer'

type Props = {}

//todo: change logo and design login/logout btn
const Header: React.FC<Props> = (props) => {
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getUserLogin)

    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <Layout.Header className="header">
            <Row>
                <Col span={1}>
                    <div className="logo">
                        <Link to={'/about'}>
                            <img src={logo} alt={'logo'} style={{filter: 'invert(100%)', height: '3.5vw'}}/>
                        </Link>
                    </div>
                </Col>
                <Col span={19}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]}>
                        <Menu.Item key="1">
                            <Link to="/profile">Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/dialogs">Dialogs</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={2}>
                    <div className={st.loginBlock}>
                        {isAuth
                            ?
                            <div>
                                <div>
                                    <Link to="/profile">
                                        <Avatar alt={login as string} style={{color: 'white', backgroundColor: '#E89383'}}>
                                            {login ? login.charAt(0) : 'U'}
                                        </Avatar>
                                    </Link>
                                </div>
                            </div>
                            :
                            <></>}
                    </div>
                </Col>
                <Col span={2}>
                    {isAuth
                        ?
                        <div>
                            <Button onClick={onLogout}>Log out</Button>
                        </div>
                        :
                        <div>
                            <Button><Link to="/login">Log in</Link></Button>
                        </div>}
                </Col>

                {/*<div className={st.img}><img src={logo} alt="logo"/></div>
            <div className={st.slogan}>No hOOman zone.</div>
            <div className={st.loginBlock}>
                {props.isAuth
                    ?
                    <div>
                        <div>
                            <NavLink to="/profile">{props.login}</NavLink>
                        </div>
                        <div>
                            <button onClick={props.logout}>Log out</button>
                        </div>
                    </div>
                    :
                    <div>
                        <NavLink to="/login"><button>Log in</button></NavLink>
                    </div>
                }
            </div>*/}
            </Row>
        </Layout.Header>
    )
}

export default Header
