import st from './Navbar.module.css'
import {Link} from 'react-router-dom'
import React from 'react'
import {Layout, Menu} from 'antd'
import {
    CommentOutlined,
    CustomerServiceOutlined,
    NotificationOutlined,
    PlayCircleOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons'
import SubMenu from 'antd/es/menu/SubMenu'
import {Ad} from '../common/Ads/Ad'

/*todo: картинки вместо ссылок*/
const Navbar: React.FC = () => {
    return (
        <Layout.Sider className="site-layout-background" width={200}>
            <nav className={st.nav}>
                <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['1']}
                      style={{height: '100%'}}>
                    <Menu.Item key="1" icon={<UserOutlined/>} title="nav1">
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<CommentOutlined/>} title="Messages">
                        <Menu.Item key="2" title="nav3">
                            <Link to="/dialogs">Dialogs</Link>
                        </Menu.Item>
                        <Menu.Item key="3" title="nav3">
                            <Link to="/chats">Chats</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4" icon={<NotificationOutlined/>} title="nav3">
                        <Link to="/feed">Feed</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<TeamOutlined/>} title="nav4">
                        <Link to="/users">Users</Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<UserOutlined/>} title="nav5">
                        <Link to="/groups">Groups</Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<PlayCircleOutlined/>} title="nav6">
                        <Link to="/videos">Videos</Link>
                    </Menu.Item>
                    <Menu.Item key="8" icon={<CustomerServiceOutlined/>} title="nav7">
                        <Link to="/music">Music</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<SettingOutlined/>} title="Settings">
                        <Menu.Item key="9">option5</Menu.Item>
                        <Menu.Item key="10">option6</Menu.Item>
                        <Menu.Item key="11">option7</Menu.Item>
                        <Menu.Item key="12">option8</Menu.Item>
                    </SubMenu>
                </Menu>
                <div className={st.ad}>
                    <Ad src={'https://assets.stickpng.com/thumbs/5ee772d099588c0004aa684b.png'}
                        title={'Cat needs your help!'} link={'https://www.cat.com/'} />
                </div>
            </nav>
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
            </div>*/
            }
        </Layout.Sider>



)
}

export default Navbar
