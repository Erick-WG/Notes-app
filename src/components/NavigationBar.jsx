import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { LayoutDashboard, MenuIcon, ScrollText, SquarePenIcon, X } from 'lucide-react';
import SignOutButton from './SignOutButton';
import ThemeSwitch from './ThemeSwitch';

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // handler functions.
  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen)
  }


  return (
    <nav className='z-100 fixed backdrop-blur-sm bg-background/80 w-full h-full max-h-14.25 flex flex-row justify-between items-center p-4 border-b border-border'>
      {/* logo */}
      <div className='flex flex-row gap-1'>
        <ScrollText />
        <Link 
          to={'/'}
          className='font-semibold'
        >
            Noted
        </Link>
      </div>

      {/* large screen navbar */}
      <div className='hidden md:flex'>
        <ThemeSwitch />
      </div>

      {/* menu icon, small screens */}
      <div className='flex md:hidden hover:cursor-pointer' onClick={handleOpenMenu}>
        {menuOpen ? (
          <div className='flex'>
            <X/>
          </div>
        ) : (
          <MenuIcon/>
        )}
      </div>

      {/* Main menu section. */}
      <div 
        className={`${menuOpen ? 'flex items-end' : 'hidden'} absolute z-12 backdrop-blur-sm bg-background/80 min-h-[90svh] w-full flex flex-col top-14.25 right-0`} 
        onClick={handleOpenMenu}
      >
        <div className='bg-card border-l border-b rounded-bl-xl min-h-fit max-h-[70svh] w-full max-w-52 flex flex-col gap-4 right-0 items-center shadow-lg'>
          {/* links */}
          <div className=' flex-1 flex flex-col w-full pt-4'>
            <Link to={'/dashboard'} className='flex flex-row gap-1 items-center font-semibold py-2 px-4 hover:bg-border border-y border-card hover:border-foreground'><LayoutDashboard/> Dashboard</Link>
            <Link to={'/notes'} className='flex flex-row gap-1 items-center font-semibold py-2 px-4 hover:bg-border border-y border-card hover:border-foreground'><ScrollText/> My Notes</Link>

            <Link to={'/notes/new'} className='flex flex-row gap-1 items-center text-primary font-semibold py-2 px-4  hover:bg-primary-hover/8 border-y border-card hover:border-primary'><SquarePenIcon/> New Note</Link>
          </div>

          {/* controls. */}
          <div className='bg-background rounded-bl-xl flex flex-col gap-2 border-t border-muted-foreground pt-2 px-4 pb-4 w-full h-fit'>
            <ThemeSwitch />
            <SignOutButton/>
          </div>
        </div>
      </div>
      {/* end menu. */}
    </nav>
  )
}

export default NavigationBar
