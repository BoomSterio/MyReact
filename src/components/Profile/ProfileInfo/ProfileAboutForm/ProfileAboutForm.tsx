import st from "./ProfileAboutForm.module.css"
import {Input, Textarea} from "../../../common/Forms/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../../../utils/validators/validators";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {ProfileType} from "../../../../types/types";

const maxNameLength = maxLengthCreator(30);
const minNameLength = minLengthCreator(3);
const maxAboutMeLength = maxLengthCreator(1000);
const maxSkillsLength = maxLengthCreator(100);

type Props = {
    profile: ProfileType
}

const ProfileAboutForm: React.FC<InjectedFormProps<ProfileType, Props> & Props> = (props) => {
    return (
        <form className={st.aboutForm} onSubmit={props.handleSubmit}>
            <div className={st.col1}>
                <div>
                    Full name: <Field name={"fullName"} component={Input}
                                      validate={[required, maxNameLength, minNameLength]}
                                      placeholder={"Alex Silverhand"}/>
                </div>
                <div>
                    About me: <Field name={"aboutMe"} component={Textarea}
                                     validate={[maxAboutMeLength]}
                                     placeholder={"Write something about yourself"}/>
                </div>
                {props.error &&
                <div className={st.formSummaryError}>
                    {props.error}
                </div>}
                <div>
                    <button>Save</button>
                </div>
            </div>

            <div className={st.col2}>
                <div>
                    <span>Looking for a job: </span>
                    <Field name={"lookingForAJob"} component={Input} type={"checkbox"}
                                              placeholder={"Alex Silverhand"}/>
                    <span>y/n</span>
                </div>
                <div>
                    Skills: <br/><Field name={"lookingForAJobDescription"} component={Textarea}
                                        validate={[maxSkillsLength]} placeholder={"My professional skills"}/>
                </div>
            </div>

            <div className={st.col3}>
                {Object.keys(props.profile.contacts).map(site => {
                    return (
                        <div className={st.linkInput}>
                            {site}: <Field key={site} name={"contacts." + site} component={Input}/>
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

const ProfileAboutReduxForm = reduxForm<ProfileType, Props>({form: "aboutForm"})(ProfileAboutForm);

export default ProfileAboutReduxForm;