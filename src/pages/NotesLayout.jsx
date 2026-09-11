import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const NotesLayout = () => {
    const navigate = useNavigate();

    // handler
    const handleNavigate = () => {
        return navigate(-1);
    }

  return (
    <div className='relative flex-1 flex flex-col gap-8 w-full'>
        {/* navigation options */}
        <div 
            className='sticky top-14.25 z-10 backdrop-blur-sm bg-background/80 py-4 flex w-full'
            onClick={handleNavigate}
        >
            <div className='flex flex-row h-8 items-center hover:cursor-pointer hover:text-muted-foreground'>
                <ArrowLeft />
                <p>Back</p>
            </div>
        </div>

        {/* children render in a div */}
        <div className='flex-1 flex w-full justify-center'>
            <Outlet/>
        </div>
    </div>
  )
}

export default NotesLayout
