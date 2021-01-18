import {Link} from 'react-router-dom'
import st from './Ad.module.css'

type Props = {
    src: string
    title: string
    link: string
    text?: string
}

export const Ad: React.FC<Props> = ({src, title, link, text = null}) => {
    return (
        <div className={st.ad}>
            <div>
                <Link to={link}><img src={src} alt={'ad'}/></Link>
            </div>
            <div>
                <b>{title}</b>
                {text &&
                <div>{text}</div>}
            </div>
        </div>
    )
}