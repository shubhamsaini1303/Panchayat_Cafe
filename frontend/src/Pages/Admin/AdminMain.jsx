import { Outlet } from "react-router-dom"
import Header from "../../Components/Admin/Header"
import Slider from "../../Components/Admin/Slider"

const AdminMain = () => {
  return (
    <div className="grid grid-cols-9">
        <div className="col-span-2">
        <Header/>
        <Slider/>
        </div>
        <div className="col-span-7">
            <Outlet/>
        </div>
       
    </div>
  )
}

export default AdminMain