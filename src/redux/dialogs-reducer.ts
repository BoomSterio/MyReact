import { InferActionsTypes } from './redux-store'

type DialogType = {
  name: string
  id: number
  img: string
}
export type MessageType = {
  id: number
  type: string
  text: string
}

let initialState = {
  dialogs: [
    {
      name: 'Sobaka',
      id: 19700291,
      img:
        'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/people_foods_cats_can_eat_slideshow/1800x1200_people_foods_cats_can_eat_slideshow.jpg',
    },
    {
      name: 'Pes',
      id: 19700292,
      img: 'https://www.newshub.co.nz/dam/form-uploaded-images-ordered/2019/08/08/KNOWYOURMEME-sad-cat-crying-1120.JPG',
    },
    {
      name: 'Kevin',
      id: 19700293,
      img: 'https://i.pinimg.com/originals/2f/66/ab/2f66abb007554ade8d4ee784259c1322.jpg',
    },
    {
      name: 'Baksss',
      id: 19700294,
      img: 'https://i.imgflip.com/3aun8x.jpg',
    },
    {
      name: 'Valera',
      id: 19700295,
      img: 'https://cnet2.cbsistatic.com/img/S8WsucQh6wWeUG1yrQi66jKNtto=/940x0/2020/09/22/ad4bd31b-cf8c-46f5-aa70-231df9acc041/longcat.jpg',
    },
    {
      name: 'Oreo',
      id: 19700296,
      img: 'https://i.pinimg.com/originals/3c/43/79/3c43793225d7167513691eb2a525df2e.jpg',
    },
    {
      name: 'Toby',
      id: 19700297,
      img: 'https://www.cathealth.com/images/how_to_take_cat_on_plane.jpg',
    },
    {
      name: 'Oskar',
      id: 19700298,
      img: 'https://sadanduseless.b-cdn.net/wp-content/uploads/2018/11/funny-cat-closeup17.jpg',
    },
    {
      name: 'Karen',
      id: 19700299,
      img: 'https://i2.wp.com/metro.co.uk/wp-content/uploads/2020/02/PRI_142383130.jpg?quality=90&strip=all&zoom=1&resize=480%2C304&ssl=1',
    },
    {
      name: 'Pizza',
      id: 19700300,
      img: 'https://www.cybersalt.org/images/stories/cleanlaugh/cats/catmousenightmare.jpg',
    },
  ] as Array<DialogType>,
  messages: [
    { id: 1, type: 'otherMessage', text: 'bfuiuiwfguisdfbkfdsfds' },
    { id: 2, type: 'myMessage', text: 'da?' },
    { id: 3, type: 'otherMessage', text: 'dalk h7 7ya9 9hasi hialish' },
    { id: 4, type: 'myMessage', text: 'каво' },
    { id: 5, type: 'otherMessage', text: 'ouifhuisj 79y 9h ui uhuihksbfjkwbdk guiaha' },
  ] as Array<MessageType>,
}
export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'dialogsPage/SEND-MESSAGE': {
      if (action.messageBody === undefined || action.messageBody === '') return state

      let newMessage = {
        id: 6,
        type: 'myMessage',
        text: action.messageBody,
      }

      return {
        ...state,
        messages: [...state.messages, newMessage],
      }
    }

    default:
      return state
  }
}

export const actions = {
  sendMessage: (messageBody: string) => ({ type: 'dialogsPage/SEND-MESSAGE', messageBody } as const),
}

export default dialogsReducer
