import React from 'react'
import { Sidebar, SquarePenIcon, LayoutDashboard, ScrollText } from 'lucide-react'
import { Link } from 'react-router-dom'

import SignOutButton from './SignOutButton'

const SideBar = () => {
  return (
    <div className='flex flex-col sticky top-14.25 max-h-[90svh] min-w-50 max-w-60'>
        {/* top logo + sidebar toggle */}
        <div className='flex flex-row w-full justify-between gap-2 pt-4 px-4'>
            <div></div>
            <div className='text-muted-foreground hover:text-foreground hover:cursor-e-resize'>
                <Sidebar/>
            </div>
        </div>

        {/* nav links */}
        <div className='flex-1 pt-4 flex flex-col gap-4 right-0 justify-between shadow-lg'>
            {/* links */}
            <div className=' flex-1 flex flex-col w-full overflow-hidden'>
                <Link to={'/dashboard'} 
                    className='flex flex-row flex-nowrap gap-1 items-center py-2 px-4 hover:bg-border border-y border-background hover:border-foreground'
                >
                    <LayoutDashboard/> Dashboard
                </Link>
                <Link to={'/notes'} 
                    className='flex flex-row flex-nowrap gap-1 items-center py-2 px-4 hover:bg-border border-y border-background hover:border-foreground'
                >
                    <ScrollText/> My Notes
                </Link>

                <Link to={'/notes/new'} 
                    className='flex flex-row flex-nowrap gap-1 items-center text-primary py-2 px-4  hover:bg-primary-hover/8 border-y border-background hover:border-primary'
                >
                    <SquarePenIcon/> New Note
                </Link>
            </div>

            {/* controls. */}
            <div className='bg-background rounded-bl-xl flex pt-2 px-4 pb-4 w-full h-fit'>
                <SignOutButton/>
            </div>
        </div>
    </div>
  )
}

export default SideBar
