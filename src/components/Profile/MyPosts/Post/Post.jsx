import st from "./Post.module.css";

function Post(props) {
    return (
        <div className={st.item}>
            <div className={st.img}>
                <img
                    src={props.img}
                    alt="cpfp"
                />
            </div>
            <div className={st.content}>
                <div className={st.name}>
                    {props.name}
                </div>
                <div>
                    {props.message}
                </div>
            </div>
            <div>
                <span>like ({props.likes}) </span>
            </div>
        </div>
    );
}

export default Post;
