import st from "./Post.module.css";
import React from "react";

type Props = {
    name: string
    message: string
    likes: number
    img: string
    id: number
}

const Post: React.FC<Props> = (props) => {
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
                <div className={st.postText}>
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
