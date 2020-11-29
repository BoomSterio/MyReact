import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    activateEditMode() {
        debugger
        this.setState(
            {editMode: true}
        );
    }

    deactivateEditMode() {
        this.setState(
            {editMode: false}
        );
    }

    render() {
        return (
            <div>
                {
                    this.state.editMode ?
                        <div>
                        <input onBlur={this.deactivateEditMode.bind(this)} autoFocus={true} value={this.props.status}/>
                        </div>
                        :
                        <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                        </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;