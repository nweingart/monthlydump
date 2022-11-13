import { createStore, applyMiddleware} from "redux";
import thunkMiddleWare from 'redux-thunk'

const initialState = {
  favoriteAnimal: 'lion',
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "updateField1": return { ...state, updateField1: action.value}
    case "updateField2": return { ...state, updateField2: action.value}
    case "updateField3": return { ...state, updateField3: action.value}
    case "updateField4": return { ...state, updateField4: action.value}
    case "updateField5": return { ...state, updateField5: action.value}
    default: return state
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleWare))
export { store }


const setUpdateField1 = (updateField1) => {
  return {
    type: "updateField1",
    value: updateField1

  }
}

const setUpdateField2 = (updateField2) => {
  return {
    type: 'updateField2',
    value: updateField2
  }
}

const setUpdateField3 = (updateField3) => {
  return {
    type: 'updateField3',
    value: updateField3
  }
}

const setUpdateField4 = (updateField4) => {
  return {
    type: 'updateField4',
    value: updateField4
  }
}

const setUpdateField5 = (updateField5) => {
  return {
    type: 'updateField4',
    value: updateField5
  }
}

export { setUpdateField1, setUpdateField2, setUpdateField3, setUpdateField4, setUpdateField5 }
