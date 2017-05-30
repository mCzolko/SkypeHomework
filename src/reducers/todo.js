// The design is inspired by:
// https://github.com/erikras/ducks-modular-redux
import rewindEnhancer, { rewind, REWIND } from './rewindEnhancer'
import { get, post, put, remove as requestRemove } from './../core/request'


// Constants
const LOAD = 'todo/LOAD'
const ADD = 'todo/ADD'
const ADD_PRE = 'todo/ADD_PRE'
const EDIT = 'todo/EDIT'
const REMOVE = 'todo/REMOVE'


// Actions
export const load = dispatch => get().then(
  response => dispatch({
    type: LOAD,
    response
  })
)

export const add = dispatch => value => rewind(dispatch, {
  type: ADD_PRE,
  value
})(post({
  Description: value
})).then(response => {
  dispatch({ type: REWIND })
  dispatch({
    type: ADD,
    response
  })
})


export const edit = dispatch => (id, value) => rewind(dispatch, {
  type: EDIT,
  id,
  value
})(put(id, value))

export const remove = dispatch => id => rewind(dispatch, {
  type: REMOVE,
  id
})(requestRemove(id))


// Reducer
const todoReducer = (state = {}, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {

    case LOAD:
      newState = {}
      action.response.map(item => newState[item.ID] = item.Description)
      return newState

    case ADD_PRE:
      const id = Math.max.apply(Math, Object.keys(state)) + new Date().getUTCMilliseconds()
      newState[id] = action.value
      return newState

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

export default rewindEnhancer(todoReducer)
