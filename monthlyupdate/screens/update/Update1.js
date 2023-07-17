import { setUpdate1, setUpdate1Image } from "../../redux/redux";
import { useSelector } from "react-redux";
import UpdateScreen from "./UpdateScreen";

const Update1 = () => {
  const updateTitle = useSelector(state => state.updateField1)
  return (
    <UpdateScreen
      number={1}
      fieldTitle={updateTitle}
      setUpdateAction={setUpdate1}
      setUpdateImageAction={setUpdate1Image}
      navigateFrom={'UpdateSelect'}
      navigateTo={'Update2'}
      />
  )
}


export default Update1
