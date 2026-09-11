import React, { useEffect } from 'react'
import NoteCard from '@components/NoteCard'

// data
import { useData } from '@utils/provider/DataProvider'

const NotesCollection = () => {
  const { getNotes, loading, notes } = useData();

  useEffect(()=>{
    getNotes();
  }, [getNotes])


  return (
    <div className='flex-1 flex w-full flex-wrap justify-center'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={`columns-1 gap-4 md:columns-2 lg:columns-3`}>
          {notes.map(({ id, title, content, created_at, tags }) => (
            <NoteCard key={id} id={id} title={title} content={content} date={created_at} tags={tags}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default NotesCollection
