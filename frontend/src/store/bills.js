
// DEFINE CONSTANTS //
const FETCH_BILLS_BY_CATEGORY = 'FETCH_BILLS_BY_CATEGORY';


// DEFINE ACTION CREATORS - ASYNC/THUNK //
export const fetchBillsByCategory = (category) => async (dispatch) => {
  const res = await fetch(`/api/bills/${category}`, {
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json();
  dispatch(setBills(data));
  return data
}


// DEFINE ACTION CREATORS - SYNC //
export const setBills = (bills) => {
  return {
    type: FETCH_BILLS_BY_CATEGORY,
    bills
  }
}


// DEFINE REDUCER //
export const billsReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case FETCH_BILLS_BY_CATEGORY:
      newState = [...action.bills];
      return newState
    default:
      return state;
  }
}