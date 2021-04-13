import { Button } from 'antd'
import { LikeFilled, LikeOutlined } from '@ant-design/icons'

type Props = {
  count: number
  liked: boolean
  handleLike?: () => void
  handleDislike?: () => void
}

const LikeButton: React.FC<Props> = ({ count = 0, liked, handleLike, handleDislike }) => {
  const style = { color: 'darkgrey', border: 'none' }
  const icon = liked ? <LikeFilled /> : <LikeOutlined />
  const handleClick = !liked ? handleLike : handleDislike

  return (
    <Button onClick={handleClick} icon={icon} style={style} shape={'circle'}>
      <span>{count}</span>
    </Button>
  )
}

export default LikeButton
