import { USER_LOGIN, USER_LOGOUT } from "../actions/authActions";
import { authItem } from "../initialValues/authItem";

const initialState = {
  authItem: authItem,
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        authItem: [...[{ loggedIn: true, user: payload }]],
      };

    case USER_LOGOUT:
      return {
        ...state,
        authItem: [{ loggedIn: false, user: { id: 0, userType: 0 } }],
      };

    default:
      return state;
  }
}
