import {useState} from "react";
import userPfp from "../../assets/images/user.jpg"

function Mouse(props) {
    let [mousePosX, setMousePosX] = useState(0);
    let [mousePosY, setMousePosY] = useState(0);

    const onMouseMove = (event) => {
        setMousePosX(event.clientX);
        setMousePosY(event.clientY);
    }

    return (
        <>
            <span onMouseMove={onMouseMove}>
                {props.children}
            </span>

            <p>Mouse position is: {mousePosX}, {mousePosY}</p>
        </>
    )
}

function Groups(props) {
    return (
        <>
            <Mouse>
                <img src={userPfp}/>
            </Mouse>
        </>
    );
}

export default Groups;