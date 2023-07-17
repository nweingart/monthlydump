import { setUpdate2, setUpdate2Image } from "../../redux/redux";
import { useSelector } from "react-redux";
import UpdateScreen from "./UpdateScreen";

const Update2 = () => {
  const updateTitle = useSelector(state => state.updateField2)
  return (
    <UpdateScreen
      number={2}
      fieldTitle={updateTitle}
      setUpdateAction={setUpdate2}
      setUpdateImageAction={setUpdate2Image}
      navigateFrom={'Update1'}
      navigateTo={'Update3'}
    />
  )
}


export default Update2
