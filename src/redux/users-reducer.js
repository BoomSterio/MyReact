const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS"

let initialState = {
    users: [
        {
            id: 1,
            followed: true,
            fullName: "Valery Fikalis",
            status: "I want pizza",
            location: {country: "Niger", city: "Samara"},
            img: "https://cdn.images.express.co.uk/img/dynamic/25/590x/secondary/Google-Maps-Street-View-has-captured-a-close-up-of-a-very-confused-and-very-cute-cat-1423729.jpg?r=1532353596872"
        },
        {
            id: 2,
            followed: false,
            fullName: "Arbuz Baksov",
            status: "Hooman lives matter",
            location: {country: "Russia", city: "Saransk"},
            img: "https://iruntheinternet.com/lulzdump/images/stoned-looking-cat-close-up-picture-13849018563.jpg"
        },
        {
            id: 3,
            followed: false,
            fullName: "Kevin V",
            status: "Looking for a new master",
            location: {country: "Ukraine", city: "Kiev"},
            img: "https://i.pinimg.com/564x/2a/c1/d6/2ac1d69e8948129160842716ba1a8683.jpg"
        },
        {
            id: 4,
            followed: true,
            fullName: "Baks Voloshin",
            status: "Ты быканул или мне показалось?",
            location: {country: "Ukraine", city: "Dnepr"},
            img: "https://lh3.googleusercontent.com/proxy/nAz0VALCyGcxzWiBEr3eDeTA10vu7v1EsF5pkpKJj5gVaJ-wPFtS6-WEdZf934qEP-R7Jpw9q9XI-U486Rb09B9T07qTLMrbdV8qWQl0A49JAgVtEHeSUZa_Q6adw7fb4So807ISnyqdiHW08RRHLw"
        },
    ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        }

        case SET_USERS: {
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        }

        default:
            return state;
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId})
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId})
export const setUsersAC = (users) => ({type: SET_USERS, users})

export default usersReducer;