import { setUpdate4, setUpdate4Image } from "../../redux/redux";
import { useSelector } from "react-redux";
import UpdateScreen from "./UpdateScreen";

const Update4 = () => {
  const updateTitle = useSelector(state => state.updateField4)
  return (
    <UpdateScreen
      number={4}
      fieldTitle={updateTitle}
      setUpdateAction={setUpdate4}
      setUpdateImageAction={setUpdate4Image}
      navigateFrom={'Update3'}
      navigateTo={'Goals'}
    />
  )
}


export default Update4
