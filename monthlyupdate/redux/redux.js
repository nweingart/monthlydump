import { createStore, applyMiddleware} from 'redux'
import thunkMiddleWare from 'redux-thunk'

const initialState = {
  favoriteAnimal: 'lion',
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "mailingList": return {...state, mailingList: action.value}
    case "updateField1": return { ...state, updateField1: action.value}
    case "update1": return { ...state, update1: action.value}
    case "update1Image": return { ...state, update1Image: action.value}
    case "updateField2": return { ...state, updateField2: action.value}
    case "update2": return { ...state, update2: action.value}
    case "update2Image": return { ...state, update2Image: action.value}
    case "updateField3": return { ...state, updateField3: action.value}
    case "update3": return { ...state, update3: action.value}
    case "update3Image": return { ...state, update3Image: action.value}
    case "updateField4": return { ...state, updateField4: action.value}
    case "update4": return { ...state, update4: action.value}
    case "update4Image": return { ...state, update4Image: action.value}
    case "updateField5": return { ...state, updateField5: action.value}
    case "update5": return { ...state, update5: action.value}
    case "update5Image": return { ...state, update5Image: action.value}
    case "updateSubmitted": return { ...state, updateSubmitted: action.value}
    default: return state
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleWare))
export { store }

const setFirstName = (firstName) => {
  return {
    type: 'firstName',
    value: firstName
  }
}

const setMailingList = (mailingList) => {
  return {
    type: 'mailingList',
    value: mailingList
  }
}

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

const setUpdate1Image = (update1Image) => {
  return {
    type: 'update1Image',
    value: update1Image
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

const setUpdate2Image = (update2Image) => {
  return {
    type: 'update2Image',
    value: update2Image
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

const setUpdate3Image = (update3Image) => {
  return {
    type: 'update3Image',
    value: update3Image
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

const setUpdate4Image = (update4Image) => {
  return {
    type: 'update4Image',
    value: update4Image
  }
}

const setUpdateSubmitted = (updateSubmitted) => {
  return {
    type: 'updateSubmitted',
    value: updateSubmitted
  }
}

export {
  setFirstName,
  setMailingList,
  setUpdateField1,
  setUpdate1,
  setUpdate1Image,
  setUpdate2,
  setUpdateField2,
  setUpdate2Image,
  setUpdateField3,
  setUpdate3,
  setUpdate3Image,
  setUpdate4,
  setUpdateField4,
  setUpdate4Image,
  setUpdateSubmitted,
}
