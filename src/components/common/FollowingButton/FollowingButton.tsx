import st from './FollowingButton.module.css'
import {Button, Popconfirm} from 'antd'
import React from 'react'

type Props = {
    followed: boolean
    isFollowingInProgress: boolean
    id: number
    handleFollow: (userId: number) => void
    handleUnfollow: (userId: number) => void
}

const FollowingButton: React.FC<Props> = ({followed, isFollowingInProgress, id, handleFollow, handleUnfollow}) => {
    return (
        <Popconfirm disabled={!followed} title={'Unfollow this user?'} onConfirm={() => handleUnfollow(id)}>
            <Button className={followed ? st.unfollowBtn : st.followBtn} loading={isFollowingInProgress}
                    onClick={followed ? () => {} : () => handleFollow(id)}>
                {followed ? 'Unfollow' : 'Follow'}
            </Button>
        </Popconfirm>
    )
}

export default FollowingButton