import st from './Navbar.module.css'
import {Link, NavLink} from 'react-router-dom'
import React from 'react'
import {Menu} from 'antd'
import {
    CommentOutlined,
    CustomerServiceOutlined,
    NotificationOutlined,
    PlayCircleOutlined, SettingOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons'
import Sider from 'antd/es/layout/Sider'
import SubMenu from 'antd/es/menu/SubMenu'

/*todo: картинки вместо ссылок*/
const Navbar: React.FC = () => {
    return (
        <nav className={st.nav}>
            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['1']}
                  style={{height: '100%'}}>
                <Menu.Item key="1" icon={<UserOutlined/>} title="nav1">
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<CommentOutlined/>} title="nav2">
                    <Link to="/dialogs">Messages</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<NotificationOutlined/>} title="nav3">
                    <Link to="/feed">Feed</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<TeamOutlined/>} title="nav4">
                    <Link to="/users">Users</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<UserOutlined/>} title="nav5">
                    <Link to="/groups">Groups</Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<PlayCircleOutlined/>} title="nav6">
                    <Link to="/videos">Videos</Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<CustomerServiceOutlined/>} title="nav7">
                    <Link to="/music">Music</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<SettingOutlined/>} title="Settings">
                    <Menu.Item key="8">option5</Menu.Item>
                    <Menu.Item key="9">option6</Menu.Item>
                    <Menu.Item key="10">option7</Menu.Item>
                    <Menu.Item key="11">option8</Menu.Item>
                </SubMenu>
            </Menu>

            {/*<div className={st.item}>
                <NavLink to="/profile" activeClassName={st.active}>Profile</NavLink>
            </div>
            <div className={st.item}>
                <NavLink to="/dialogs" activeClassName={st.active}>Messages</NavLink>
            </div>
            <div className={st.item}>
                <NavLink to="/feed" activeClassName={st.active}>Feed</NavLink>
            </div>
            <div className={st.item}>
                <NavLink to="/users" activeClassName={st.active}>Users</NavLink>
            </div>
            <div className={st.item}>
                <NavLink to="/groups" activeClassName={st.active}>Groups</NavLink>
            </div>
            <div className={st.item}>
                <NavLink to="/videos" activeClassName={st.active}>Videos</NavLink>
            </div>
            <div className={st.item}>
                <NavLink to="/music" activeClassName={st.active}>Music</NavLink>
            </div>
            <br/>
            <div className={st.item}>
                <NavLink to="/settings" activeClassName={st.active}>Settings</NavLink>
            </div>*/}
        </nav>
    )
}

export default Navbar
