import React, {useEffect} from 'react'
import Profile from './Profile'
import {connect, useDispatch, useSelector} from 'react-redux'
import {
    fetchingStarted,
    getFollowStatus,
    getStatus,
    getUserProfile,
    savePhoto,
    saveProfileInfo,
    updateStatus
} from '../../redux/profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {AppStateType} from '../../redux/redux-store'
import {ProfileType} from '../../types/types'
import Preloader from '../common/Preloader/Preloader'
import {getFetched, getFollowed, getProfile, getUserStatus} from '../../redux/profile-selectors'
import {getAuthorizedUserId, getIsAuth} from '../../redux/auth-selectors'

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    getFollowStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfileInfo: (profile: ProfileType) => Promise<any>,
    fetchingStarted: () => void
}

type PathParamsType = {
    userId: string
}

type Props = MapDispatchPropsType & RouteComponentProps<PathParamsType>;

/*class ProfileContainer extends React.Component<Props> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId

        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                //todo: replace push with Redirect
                this.props.history.push('/login')
            }
        }

        if (!userId) {
            console.error('User id should exist in state or URL params. UserId not found')
        } else {
            this.props.fetchingStarted()
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
            this.props.getFollowStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Props, prevState: Props) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        if (!this.props.fetched) {
            return <Preloader/>
        }

        return (
            <Profile {...this.props} isOwner={!this.props.match.params.userId} profile={this.props.profile}
                     followed={this.props.followed}
                     status={this.props.status} updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}/>
        )
    }
}*/

const ProfileContainer: React.FC<Props> = (props) => {
    const profile = useSelector(getProfile)
    const status = useSelector(getUserStatus)
    const followed = useSelector(getFollowed)
    const fetched = useSelector(getFetched)
    const authorizedUserId = useSelector(getAuthorizedUserId)
    const isAuth = useSelector(getIsAuth)

    const dispatch = useDispatch()

    function refreshProfile() {
        let userId: number | null = +props.match.params.userId

        if (!userId) {
            userId = authorizedUserId
            if (!userId) {
                //todo: replace push with Redirect
                props.history.push('/login')
            }
        }

        if (!userId) {
            console.error('User id should exist in state or URL params. UserId not found')
        } else {
            dispatch(fetchingStarted())
            dispatch(getUserProfile(userId))
            dispatch(getStatus(userId))
            dispatch(getFollowStatus(userId))
        }
    }

    useEffect(() => {
        refreshProfile()
    }, [])

    useEffect(() => {
        refreshProfile()
    }, [props.match.params.userId])

    if (!fetched) {
        return <Preloader/>
    }

    return (
        <Profile {...props} isOwner={!props.match.params.userId} profile={profile}
                 followed={followed}
                 status={status} updateStatus={props.updateStatus}
                 savePhoto={props.savePhoto}/>
    )

}

export default compose<React.ComponentType>(
    //withAuthRedirect,
    withRouter,
    connect(null, {
        getUserProfile,
        getStatus,
        getFollowStatus,
        updateStatus,
        savePhoto,
        saveProfileInfo,
        fetchingStarted
    }),
)(ProfileContainer)

