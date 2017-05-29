// The design is inspired by:
// https://github.com/erikras/ducks-modular-redux

const initialState = {
  1: 'Buy car',
  2: 'Get new clothes',
  3: 'Be hired to Skype'
};


// Constants
const ADD = 'todo/ADD'
const EDIT = 'todo/EDIT'
const REMOVE = 'todo/REMOVE'


// Actions
export const add = dispatch => value => dispatch({
  type: ADD,
  value
})
export const edit = dispatch => (id, value) => dispatch({
  type: EDIT,
  id,
  value
})

export const remove = dispatch => id => dispatch({
  type: REMOVE,
  id
})


// Reducer
export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {

    case ADD:
      const newId = Object.keys(state).length + 1
      const value = action.value.trim()

      if (!!value) newState[newId] = value

      return newState

    case EDIT:
      newState[action.id] = action.value
      return newState

    case REMOVE:
      delete newState[action.id]
      return newState

    default:
      return state

  }
};
