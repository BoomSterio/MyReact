import logo from '../../assets/images/icon.png'
import st from './Header.module.css'
import { Link } from 'react-router-dom'
import React from 'react'
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getIsAuth, getUserLogin } from '../../redux/auth-selectors'
import { logout } from '../../redux/auth-reducer'

type Props = {}

//todo: change logo and design login/logout btn
const Header: React.FC<Props> = props => {
  const isAuth = useSelector(getIsAuth)
  const login = useSelector(getUserLogin)

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <Layout.Header className="header">
      <Row>
        <Col md={1} lg={1} span={2}>
          <div className="logo">
            <Link to={'/about'}>
              <img src={logo} alt={'logo'} className={st.logoImg} />
            </Link>
          </div>
        </Col>
        <Col sm={2} md={4} lg={19} span={2}>
          <Menu selectable={false} theme="dark" mode="horizontal" defaultSelectedKeys={[]}>
            <Menu.Item key="1">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/dialogs">Dialogs</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col sm={12} md={10} lg={4} span={4}>
          {isAuth ? (
            <div className={st.loginBlock}>
              <Link to="/profile">
                <Avatar alt={login as string} style={{ color: 'white', backgroundColor: '#E89383' }}>
                  {login ? login.charAt(0) : 'U'}
                </Avatar>
              </Link>
              <div className={st.loginBtn}>
                <Button onClick={onLogout}>Log out</Button>
              </div>
            </div>
          ) : (
            <>
              <Button>
                <Link to="/login">Log in</Link>
              </Button>
            </>
          )}
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
