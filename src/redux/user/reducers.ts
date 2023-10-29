import {GET_DETAILS, SET_DETAILS} from './actions';

const initialState = {
  bio: '',
  bookmark: [],
  chat: [],
  email: '',
  followers: [],
  following: [],
  image: '',
  name: '',
  post: [],
  story: [],
  username: '',
  liked: [],
  tagged: [],
};

function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_DETAILS:
      return action.payload;
    case SET_DETAILS:
      return action.payload;
    default:
      return state;
  }
}
export default userReducer;
