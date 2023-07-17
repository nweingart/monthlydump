import { setUpdate3, setUpdate3Image } from "../../redux/redux";
import { useSelector } from "react-redux";
import UpdateScreen from "./UpdateScreen";

const Update3 = () => {
  const updateTitle = useSelector(state => state.updateField3)
  return (
    <UpdateScreen
      number={3}
      fieldTitle={updateTitle}
      setUpdateAction={setUpdate3}
      setUpdateImageAction={setUpdate3Image}
      navigateFrom={'Update2'}
      navigateTo={'Update4'}
    />
  )
}


export default Update3
