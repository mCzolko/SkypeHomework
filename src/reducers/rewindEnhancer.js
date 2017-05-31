// Constants
export const REWIND = 'rewindEnhancer/REWIND'

// function randomFrom(array) {return array[Math.floor(Math.random() * array.length)];}

// Actions
export const rewind = (dispatch, action) => promise => {
  dispatch(action)

  promise.catch(() => {
    dispatch({ type: REWIND })
    return Promise.reject
  })

  return promise
}


// Reducer
export default reducer => {

  const initialState = {
    current: reducer(undefined, {}),
    before: []
  }

  return (state = initialState, action) => {
    switch (action.type) {

      // When we call this action, this will be applied. Right after that this
      // reducer will be called again and it will fall into default case
      case REWIND:
        if (!state.before.length) return state

        return {
          current: state.before[state.before.length - 1],
          before: state.before.slice(0, state.before.length - 1)
        }

      default:
        const newCurrent = reducer(state.current, action)
        if (state.current === newCurrent) return state

        return {
          current: newCurrent,
          before: [...state.before, state.current]
        }
    }
  }
}
