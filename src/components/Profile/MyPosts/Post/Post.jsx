import st from "./Post.module.css";

function Post(props) {
    return (
        <div className={st.item}>
            <div>
                <img
                    src={props.img}
                    alt="cpfp"
                />
                {props.message}
            </div>
            <div>
                <span>like ({props.likes}) </span>
            </div>
        </div>
    );
}

export default Post;
