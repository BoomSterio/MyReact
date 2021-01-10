import React, {ChangeEvent} from "react";

type Props = {
    status: string
    aboutMe: string
    updateStatus: (status: string) => void
}
type State = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<Props, State> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState(
            {editMode: true}
        );
    }

    deactivateEditMode = () => {
        this.setState(
            {editMode: false}
        );
        this.props.updateStatus(this.state.status);
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
       if (prevProps.status !== this.props.status) {
           this.setState(
               {status: this.props.status}
           );
       }
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {status: e.target.value}
        );
    }

    render() {
        return (
            <div>
                {
                    this.state.editMode ?
                        <div>
                            <input onChange={this.onStatusChange} onBlur={this.deactivateEditMode} autoFocus={true}
                                   value={this.state.status}/>
                        </div>
                        :
                        <div>
                            <span onDoubleClick={this.activateEditMode}>{this.props.status || "Member of meow community!"}</span>
                        </div>
                }
                <div>{this.props.aboutMe}</div>
            </div>
        )
    }
}

export default ProfileStatus;