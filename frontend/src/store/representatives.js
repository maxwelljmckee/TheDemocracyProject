
// DEFINE CONSTANTS //
const FETCH_ALL_REPS = 'FETCH_ALL_REPS';


// DEFINE ACTION CREATORS - ASYNC/THUNK //
export const fetchAllReps = ({ chamber }) => async (dispatch) => {
  const res = await fetch(`/api/representatives/${chamber}`);
  const data = res.json();
  dispatch(setAllReps(data))
}


// DEFINE ACTION CREATORS - SYNC //
const setAllReps = (allReps) => {
  return {
    type: FETCH_ALL_REPS,
    allReps
  }
}



// DEFINE REDUCER //
export const sessionReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_REPS:
      return [...state, ...action.allReps]
    default:
      return state;
  }
}