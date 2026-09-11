import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// components.
import NoteCard from '@components/NoteCard'

// data
import { useData } from '@utils/provider/DataProvider'
import { SquarePenIcon } from 'lucide-react'

const NotesCollection = () => {
  const navigate = useNavigate();

  // data.
  const { getNotes, loading, notes } = useData();

  useEffect(()=>{
    getNotes();
  }, [getNotes])


  return (
    <div className='flex-1 flex w-full flex-wrap justify-center'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        notes.length !== 0 ? (
          <div className={`columns-1 gap-4 md:columns-2 lg:columns-3`}>
            {notes.map(({ id, title, content, created_at, tags }) => (
              <NoteCard key={id} id={id} title={title} content={content} date={created_at} tags={tags}/>
            ))}
          </div>
        ) : (
          <div className='flex-1 flex flex-col gap-2 items-center'>
            <h2 className='text-2xl font-semibold'>No saved notes yet</h2>

            <div className='flex flex-col gap-4 items-center justify-center text-muted-foreground'>
              <p className='flex flex-col text-center w-full max-w-120 italic'>
                " The palest ink is better than the best memory, Ideas are like guests, note them down before they leave "

                <span className='italic text-sm text-muted-foreground'>- Unkown</span>
              </p>

              <button 
                onClick={() => navigate('new')}
                className='flex flex-row gap-2 items-center w-fit text-foreground font-semibold bg-primary/20 hover:bg-primary/50 hover:cursor-pointer px-6 py-1 rounded-2xl border border-primary'
              >
                <SquarePenIcon/> Pen down a thought
              </button>
            </div>
          </div>
        ) 
      )}
    </div>
  )
}

export default NotesCollection
