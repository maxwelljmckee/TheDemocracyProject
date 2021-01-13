
// DEFINE CONSTANTS //
const FETCH_REPS_BY_CHAMBER = 'FETCH_REPS_BY_CHAMBER';


// DEFINE ACTION CREATORS - ASYNC/THUNK //
export const fetchRepsByChamber = (chamber) => async (dispatch) => {
  const res = await fetch(`/api/representatives/${chamber}`, {
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  dispatch(setRepsByChamber(data))
  return data
}


// DEFINE ACTION CREATORS - SYNC //
const setRepsByChamber = (reps) => {
  return {
    type: FETCH_REPS_BY_CHAMBER,
    reps
  }
}



// DEFINE REDUCER //
export const representativesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_REPS_BY_CHAMBER:
      return [...state, ...action.reps]
    default:
      return state;
  }
}