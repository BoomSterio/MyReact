import st from './PhotosBanner.module.css'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { Button, Col, Image, Row } from 'antd'

const PhotosBanner: React.FC = () => {
  return (
    <div>
      <div className={st.photosShortcut}>
        <Button>
          <NavLink to="/photos">Photos ({192})</NavLink>
        </Button>
      </div>
      <hr />
      <div className={st.photosIcons}>
        <Row className="justify-content-around" gutter={[8, 8]}>
          <Col span={8} className={st.item}>
            <Image preview={{ mask: '' }} src="https://keepgif.com/gif/face-time-netween-cats.gif" />
          </Col>
          <Col span={8} className={st.item}>
            <Image src="https://www.diggitmagazine.com/sites/default/files/styles/2_1_mobile/public/field/image/cat-haircuts-218336-16-cats-who-seriously-hate-their-stupid-haircuts-of-cat-haircuts-1.jpg?itok=AwZdhqsC&timestamp=1554147856" />
          </Col>
          <Col span={8} className={st.item}>
            <Image src="https://media1.tenor.com/images/437855c8c4fdd9903e5f324fe019f3ec/tenor.gif?itemid=18132843" />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default PhotosBanner
