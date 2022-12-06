import { createStore, applyMiddleware} from "redux";
import thunkMiddleWare from 'redux-thunk'

const initialState = {
  favoriteAnimal: 'lion',
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "updateField1": return { ...state, updateField1: action.value}
    case "update1": return { ...state, update1: action.value}
    case "updateField2": return { ...state, updateField2: action.value}
    case "update2": return { ...state, update2: action.value}
    case "updateField3": return { ...state, updateField3: action.value}
    case "update3": return { ...state, update3: action.value}
    case "updateField4": return { ...state, updateField4: action.value}
    case "update4": return { ...state, update4: action.value}
    case "updateField5": return { ...state, updateField5: action.value}
    case "update5": return { ...state, update5: action.value}
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

const setUpdate1 = (update1) => {
  return{
    type: 'update1',
    value: update1
  }
}

const setUpdateField2 = (updateField2) => {
  return {
    type: 'updateField2',
    value: updateField2
  }
}

const setUpdate2 = (update2) => {
  return {
    type: 'update2',
    value: update2
  }
}

const setUpdateField3 = (updateField3) => {
  return {
    type: 'updateField3',
    value: updateField3
  }
}

const setUpdate3 = (update3) => {
return {
    type: 'update3',
    value: update3
  }
}

const setUpdateField4 = (updateField4) => {
  return {
    type: 'updateField4',
    value: updateField4
  }
}

const setUpdate4 = (update4) => {
  return {
    type: 'update4',
    value: update4
  }
}

const setUpdateField5 = (updateField5) => {
  return {
    type: 'updateField5',
    value: updateField5
  }
}

const setUpdate5 = (update5) => {
  return {
    type: 'update5',
    value: update5
  }
}

export {setUpdateField1, setUpdate1, setUpdateField2, setUpdate2, setUpdateField3, setUpdate3, setUpdate4, setUpdateField4, setUpdate5, setUpdateField5 }
