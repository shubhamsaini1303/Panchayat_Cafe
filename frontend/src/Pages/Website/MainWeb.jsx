import { Outlet } from "react-router-dom"
import Header from "../../Components/Website/Header"
import Footer from "../../Components/Website/Footer"

const MainWeb = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainWeb