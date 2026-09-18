import { Zap } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className='flex flex-col gap-1 md:flex-row items-center justify-center md:justify-between px-4 py-3 border-t border-border'>
      {/* signature. */}
      <div className='flex flex-row items-center gap-1'>
        <p className='font-sans font-bold text-lg font-stretch-75% tracking-wide'>Erick WG</p>
        <p className="font-thin text-2xl text-neutral-500">X</p>
        <p className='flex flex-row items-center font-sans font-bold text-lg font-stretch-75% tracking-wide text-emerald-500'>Supabase <Zap/></p>
      </div>

      {/* rights */}
      <div></div>

      {/* llta */}
      <p className='text-sm font-mono tracking-wide font-semibold'>Made with <span className='text-sky-600 line-through'>React</span> ❤️</p>
    </footer>
  )
}

export default Footer
