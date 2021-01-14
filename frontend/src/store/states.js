
// DEFINE CONSTANTS //
const FETCH_UNITED_STATES = 'FETCH_UNITED_STATES';


// DEFINE ACTION CREATORS - ASYNC/THUNK //
export const fetchUnitedStates = () => async (dispatch) => {
  const res = await fetch('/api/representatives/states', {
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json();
  dispatch(setUnitedStates(data));
  return data
}


// DEFINE ACTION CREATORS - SYNC //
export const setUnitedStates = (unitedStates) => {
 return {
   type: FETCH_UNITED_STATES,
   unitedStates
 }
}


// DEFINE REDUCER //
export const statesReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case FETCH_UNITED_STATES:
      newState = [...action.unitedStates]
      return newState
    default:
      return state;
  }
}