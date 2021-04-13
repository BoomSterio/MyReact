import st from './Navbar.module.css'
import {NavLink} from 'react-router-dom'
import React from 'react'
import {Layout, Menu} from 'antd'
import {
  ApartmentOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
  NotificationOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import SubMenu from 'antd/es/menu/SubMenu'
import {Ad} from '../common/Ads/Ad'

const Navbar: React.FC = () => {
  return (
    <Layout.Sider className={'site-layout-background' + st.fixedNav} breakpoint={'lg'} collapsedWidth={'0'}>
      <nav>
        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['1']} style={{ height: '100%' }}>
          <Menu.Item key="1" icon={<UserOutlined />} title="nav1">
            <NavLink to="/profile">Profile</NavLink>
          </Menu.Item>
          <SubMenu key="sub1" icon={<CommentOutlined />} title="Messages">
            <Menu.Item key="2" title="nav3">
              <NavLink to="/dialogs">Dialogs</NavLink>
            </Menu.Item>
            <Menu.Item key="3" title="nav3">
              <NavLink to="/chats">Chats</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<NotificationOutlined />} title="nav3">
            <NavLink to="/feed">Feed</NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<TeamOutlined />} title="nav4">
            <NavLink to="/users">Users</NavLink>
          </Menu.Item>
          <Menu.Item key="6" icon={<ApartmentOutlined spin />} title="nav5">
            <NavLink to="/groups">Groups</NavLink>
          </Menu.Item>
          <Menu.Item key="7" icon={<PlayCircleOutlined />} title="nav6">
            <NavLink to="/videos">Videos</NavLink>
          </Menu.Item>
          <Menu.Item key="8" icon={<CustomerServiceOutlined />} title="nav7">
            <NavLink to="/music">Music</NavLink>
          </Menu.Item>
          <SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="9">option5</Menu.Item>
            <Menu.Item key="10">option6</Menu.Item>
            <Menu.Item key="11">option7</Menu.Item>
            <Menu.Item key="12">option8</Menu.Item>
          </SubMenu>
        </Menu>
      </nav>
      <div className={st.ad}>
        <Ad
          src={'https://i.pinimg.com/474x/5f/6e/87/5f6e873247c8385a76373b85389a1739.jpg'}
          title={'Cat needs your help!'}
          link={'https://www.cat.com/'}
        />
      </div>
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
    </Layout.Sider>
  )
}

export default Navbar
