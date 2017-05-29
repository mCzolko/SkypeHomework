// The design is inspired by:
// https://github.com/erikras/ducks-modular-redux
import { get, post, put, remove as requestRemove } from './../core/request'


// Constants
const LOAD = 'todo/LOAD'
const ADD = 'todo/ADD'
const EDIT = 'todo/EDIT'
const REMOVE = 'todo/REMOVE'


// Actions
export const load = dispatch => get().then(
  response => dispatch({
    type: LOAD,
    response
  })
)

export const add = dispatch => value => post({
  Description: value
}).then(
  response => dispatch({
    type: ADD,
    response
  })
)

export const edit = dispatch => (id, value) => put(id, value).then(
  response => dispatch({
    type: EDIT,
    id,
    value
  })
)

export const remove = dispatch => id => requestRemove(id).then(
  response => dispatch({
    type: REMOVE,
    id
  })
)


// Reducer
export default (state = {}, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {

    case LOAD:
      newState = {}
      action.response.map(item => newState[item.ID] = item.Description)
      return newState;

    case ADD:
      const { ID, Description } = action.response
      newState[ID] = Description
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
