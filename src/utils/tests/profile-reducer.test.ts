import profileReducer, { actions } from '../../redux/profile-reducer'
import { ProfileType } from '../../types/types'

describe('profile reducer tests', () => {
  let initialState = {
    posts: [
      {
        id: 1,
        message: 'Hi bro',
        name: 'Kabluk Jma',
        likes: 69,
        img:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm_fOn75B7WzCl9gIhBqAqjiSmCIqwdQrDEHzf0HTIfCqCq1Vj71iszAMirZc4alSA0ygIgWxOAY5fiSypsQTCvd6r4uNmGqjt70ueivg&usqp=CAU&ec=45725303',
      },
      {
        id: 2,
        message: 'stop bullying me',
        name: 'Fikalis Anton',
        likes: 100,
        img: 'https://i.pinimg.com/564x/f1/23/05/f1230501d33cb2c6055b2d6ea221a22d.jpg',
      },
      {
        id: 3,
        message: 'would you hug me',
        name: 'Kakun Barov',
        likes: 14,
        img: 'https://media.tenor.com/images/c50ba1f5c34496af4f9eb2a805ef29ea/tenor.gif',
      },
      {
        id: 4,
        message: 'каво',
        name: 'Big Brother',
        likes: 26,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRB_mt5A7b2-UR_9NKmESs-1OJ9-daZW9xaeg&usqp=CAU',
      },
      {
        id: 5,
        message: 'это я, киборг',
        name: 'Герой Украины',
        likes: 61,
        img: 'https://pbs.twimg.com/media/C5AmsxoWIAAWlfS.jpg',
      },
    ],
    profile: null as ProfileType | null,
    status: '',
    newPostText: '',
  }

  it('new post should be added', () => {
    //test data
    let action = actions.addPost('test')

    //test execution
    let newState = profileReducer(initialState, action)

    //expectation
    expect(newState.posts.length).toBe(6)
  })

  it('post message should be correct', () => {
    //test data
    let action = actions.addPost('test')

    //test execution
    let newState = profileReducer(initialState, action)

    //expectation
    expect(newState.posts[5].message).toBe('test')
  })

  it('after deleting a post length of posts should be decremented', () => {
    //test data
    let action = actions.deletePost(1)

    //test execution
    let newState = profileReducer(initialState, action)

    //expectation
    expect(newState.posts.length).toBe(4)
  })

  it('if post id is incorrect nothing should be deleted', () => {
    //test data
    let action = actions.deletePost(1069)

    //test execution
    let newState = profileReducer(initialState, action)

    //expectation
    expect(newState.posts.length).toBe(5)
  })
})
