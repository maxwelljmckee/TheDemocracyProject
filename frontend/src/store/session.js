
// DEFINE CONSTANTS //
const SET_SESSION_USER = 'SET_SESSION_USER';
const REMOVE_SESSION_USER = 'REMOVE_SESSION_USER';


// DEFINE ACTION CREATORS - ASYNC/THUNK //
export const loginUser = (email, password) => async (dispatch) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  dispatch(setSessionUser(data));
  return data;
}

export const registerUser = (user) => async (dispatch) => {
  console.log('IN SESSION STORE', user);
  const { firstName, lastName, email, zipCode, password, isRegistered } = user;
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName, 
      lastName,
      email,
      zipCode,
      password,
      isRegistered
    })
  })
  const data = await res.json()
  dispatch(setSessionUser(data));
  return data;
}

export const restoreUser = () => async (dispatch) => {
  const res = await fetch('/api/auth/restore', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  dispatch(setSessionUser(data));
  return data
}

export const deleteSession = () => async (dispatch) => {
  const res = await fetch('/api/auth/logout')
  dispatch(removeSessionUser());
  const data = await res.json();
  return data
}


// DEFINE ACTION CREATORS - SYNC //
export const setSessionUser = (user) => {
  return {
    type: SET_SESSION_USER,
    user
  }
}

export const removeSessionUser = () => {
  return {
    type: REMOVE_SESSION_USER
  }
}


// DEFINE REDUCER //
export const sessionReducer = (state = { user: null }, action) => {
  let newState;
  switch (action.type) {
    case SET_SESSION_USER:
      newState = { ...state };
      newState.user = action.user;
      return newState
    case REMOVE_SESSION_USER:
      newState = { ...state };
      newState.user = null
      return newState;
    default:
      return state;
  }
}