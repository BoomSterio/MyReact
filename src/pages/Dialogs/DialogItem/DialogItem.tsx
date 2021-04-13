import st from './DialogItem.module.css'
import { NavLink } from 'react-router-dom'

type Props = {
  id: number
  img: string
  name: string
}

const DialogItem: React.FC<Props> = props => {
  let path = '/dialogs/' + props.id
  return (
    <div className={st.dialog}>
      <NavLink className={st.link} to={path}>
        <img className={st.img} src={props.img} alt="userPfp" />
        <div className={st.name + ' name'}>{props.name}</div>
      </NavLink>
    </div>
  )
}

export default DialogItem
