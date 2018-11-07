export default function locationReducer(state, action) {
  return Object.assign({}, state, { location: action.payload });
}
