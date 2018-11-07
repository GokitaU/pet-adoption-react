export default function locationReducer(state = 'Washington, DC', action) {
  return Object.assign({}, state, { location: action.payload });
}
