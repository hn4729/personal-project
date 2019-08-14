const initialState = {
  champs: []
};

const FETCH_CHAMPS = "FETCH_CHAMPS";

export const fetchChamps = champs => {
  return {
    type: FETCH_CHAMPS,
    payload: champs
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CHAMPS:
      return { ...state, champs: payload };
    default:
      return state;
  }
}
