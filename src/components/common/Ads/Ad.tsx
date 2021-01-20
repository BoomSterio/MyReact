import st from './Ad.module.css'

type Props = {
    src: string
    title: string
    link: string
    text?: string
}

export const Ad: React.FC<Props> = ({src, title, link, text = null}) => {
    const handleAdClick = () => {
        // @ts-ignore
        window.location = link as Location;
    }

    return (
        <div className={st.ad} title={link}>
            <div className={st.image}>
                <label onClick={handleAdClick}><img src={src} alt={'ad'}/></label>
            </div>
            <div className={st.info}>
                <b>{title}</b>
                {text &&
                <div>{text}</div>}
            </div>
        </div>
    )
}