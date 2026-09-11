import { Outlet } from "react-router-dom"

// components.
import NavigationBar from "@components/NavigationBar"
import Footer from "@components/Footer"


const MainLayout = () => {
  return (
    <div className="relative bg-background text-foreground flex flex-col gap-6 w-full min-h-screen h-full">
      <NavigationBar />
      <main className="flex flex-col flex-1 w-full p-4 items-stretch mt-14.25">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
