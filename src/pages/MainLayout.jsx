import { Outlet } from "react-router-dom"

// components.
import NavigationBar from "@components/NavigationBar"
import Footer from "@components/Footer"
import SideBar from "@components/SideBar"


const MainLayout = () => {
  return (
    <div className="relative bg-background text-foreground flex flex-col w-full min-h-screen h-full">
      <NavigationBar />
      <main className="relative flex flex-row gap-12 flex-1 w-full items-stretch mt-14.25">
        <aside className="hidden md:flex border-r border-border">
          <SideBar/>
        </aside>
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
