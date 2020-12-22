import React, {useEffect, useState} from "react";
import st from "./ProfileStatus.module.css"

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status)

    useEffect(() =>{
        setStatus(props.status);
    }, [props.status]);


    const activateEditMode = () => {
        if(props.isOwner) {
            setEditMode(true);
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {
                editMode ?
                    <div>
                        <input className={st.statusInput} onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status}/>
                    </div>
                    :
                    <div>
                        <label className={props.isOwner ? st.status : ""} onDoubleClick={activateEditMode}>{props.status || "Member of meow community!"}</label>
                    </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;