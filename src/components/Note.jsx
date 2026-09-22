import React, { useEffect, useState } from 'react';
import { SquarePenIcon, Trash2Icon } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

// data.
import { useData } from '@/utils/provider/DataProvider';
import { getDataFormat } from '@/utils/HelperFunction/getDateFormat';
import { formatDistanceToNow } from 'date-fns';

// todo: confirm deletion with a modal.
const Note = () => {
  const navigate = useNavigate();

  // data.
  const { getNoteById, deleteNote } = useData();
  const { noteId } = useParams();
  const [note, setNote] = useState({})
  const {id, title, created_at, content, tags} = note

  // getting the note data on initial page load.
  useEffect(()=>{
    const getNote = async () => {
      const { data, error } = await getNoteById(noteId);
      if(!error) setNote(data)
    }

    getNote();
  }, [getNoteById, noteId])

  // todo: add alert when delete is successfull.
  // handler functions.
  const handleDeleteNote = async (id) => {
    const { data, error } = await deleteNote(id)
    if(!error) return navigate(-1);
    console.log(`Deleted: ${data[0].title}`)
    return { data, error }
  }

  return (
    Object.values(note).length !== 0 ? (
      <div className='relative flex-1 flex flex-col gap-1.5 w-full max-w-180'>
        {/* page title */}
        <title>
          {title}
        </title>

        {/* header */}
        <div className='flex flex-col tracking-wide w-full font-extralight text-sm text-muted-foreground'>
          <p className='text-sm italic'>
            {getDataFormat(created_at)}
          </p>
          <span className='text-xs'>
            {formatDistanceToNow(created_at, {addSuffix: true})}
          </span>
        </div>
        
        {/* content */}
        <div className='flex-1 flex flex-col gap-1.5 mt-4'>
          <h2 className='text-foreground font-semibold text-2xl'>
            {title}
          </h2>
          <p className='flex-1 min-h-40'>
            {content}
          </p>

          <div className='flex flex-col gap-2'>
            {/* <h3>Tags</h3> */}
            <div className='flex flex-row flex-wrap gap-2'>
              {tags.map((tag, index) => (
                <span key={index} className='flex items-center text-xs text-muted-foreground bg-muted-foreground/10 px-4 py-0.5 rounded-lg border border-muted-foreground'>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div id="controls" className='sticky bottom-0 bg-background flex flex-col gap-4 mt-12 border-border border-t py-6'>

          <div className='flex flex-row gap-4 font-semibold'>
            <button 
              className='flex flex-row gap-1 items-center bg-primary/10 px-6 py-1.5 rounded-2xl border border-primary text-primary hover:cursor-pointer hover:bg-primary/20'
              onClick={() => navigate('edit')}
            >
              <SquarePenIcon />
              Edit
            </button>
            <button 
              className='flex flex-row gap-1 items-center bg-danger/20 px-6 py-1.5 rounded-2xl border border-danger text-danger hover:cursor-pointer hover:bg-danger/40'
              onClick={() => handleDeleteNote(id)}
            >
              <Trash2Icon />
              Delete
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading</div>
    )
  )
}

export default Note
