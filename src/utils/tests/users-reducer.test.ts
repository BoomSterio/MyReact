import usersReducer, {actions, follow, unfollow, InitialStateType} from '../../redux/users-reducer'
import {usersAPI} from '../../api/users-api'
import {ApiResponseType, ResultCodesEnum} from '../../api/api'

jest.mock('../../api/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>


describe('users reducer actions tests', () => {
    let state: InitialStateType

    beforeEach(() => {
        state = {
            users: [
                {id: 0, name: 'Jechka Dirova', followed: true, photos: {large: null, small: null}, status: 'da'},
                {id: 1, name: 'Yana Cist', followed: false, photos: {large: null, small: null}, status: 'negr'},
                {id: 2, name: 'Yasha Lava', followed: true, photos: {large: null, small: null}, status: 'je'}
            ],
            pageSize: 10,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: false,
            followingInProgress: [] //array of users id
        }
    })

    test('follow success test', () => {
        const newState = usersReducer(state, actions.followSuccess(1))

        expect(newState.users[1].followed).toBeTruthy()
    })

    test('unfollow success test', () => {
        const newState = usersReducer(state, actions.unfollowSuccess(0))

        expect(newState.users[0].followed).toBeFalsy()
    })
})

describe('users reducer thunks tests', () => {
    const result: ApiResponseType = {
        resultCode: ResultCodesEnum.Success,
        messages: [],
        data: {}
    }

    test('thunk follow test', async () => {
        usersAPIMock.postFollow.mockReturnValue(Promise.resolve(result))

        const thunk = follow(1)
        const dispatchMock = jest.fn()
        const getStateMock = jest.fn()

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))

    })

    test('thunk unfollow test', async () => {
        usersAPIMock.deleteFollow.mockReturnValue(Promise.resolve(result))

        const thunk = unfollow(0)
        const dispatchMock = jest.fn()
        const getStateMock = jest.fn()

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 0))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(0))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 0))

    })

})