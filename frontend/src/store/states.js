
// DEFINE CONSTANTS //
const FETCH_UNITED_STATES = 'FETCH_UNITED_STATES';


// DEFINE ACTION CREATORS - ASYNC/THUNK //
export const fetchUnitedStates = () => async (dispatch) => {
  const res = await fetch('/api/representatives/states', {
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json()
  dispatch(setUnitedStates)
  return data
}


// DEFINE ACTION CREATORS - SYNC //
export const setUnitedStates = (states) => {
 return {
   type: FETCH_UNITED_STATES,
   states
 }
}


// DEFINE REDUCER //
export const sessionReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case FETCH_UNITED_STATES:
      newState = [...state, ...action.states]
      return newState
    default:
      return state;
  }
}