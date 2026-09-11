import React, { useActionState, useEffect, useState } from 'react';

// utils.
import { useData } from '@utils/provider/DataProvider';

// components
import { CircleCheckBig, SquarePenIcon } from 'lucide-react';
import ErrorDiv from '@components/ErrorDiv';
import TagPicker from '@components/TagPicker';
import { useNavigate } from 'react-router-dom';



const AddNote = () => {
  const { addNote } = useData();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [noteId, setNoteId] = useState(null);
  const [submitComplete, setSubmitComplete] = useState(false);

  const handleViewNote = (id) => {
    return navigate(`/notes/${id}`)
  }

  const [error, handleAddNote, isPending] = useActionState(async (_prevState, formData) => {
      try {
        // get data from form.
        const title = formData.get('title')
        const content = formData.get('content')

        // supabase insert method
        const { data, error } = await addNote(title, content, tags);

        
        if(!error) {
          setSubmitComplete(true);
          setNoteId(data[0].id)
          return {data, error}
        };

        if(error) {
          console.log(error)
          throw new Error(`Failed to add new note`)
        }

        // if no error update the submit complete.
        else {
          setSubmitComplete(true)
        }

      } catch (error) {
        return new Error(`Failed to add new note!`)
      }
    },
    null // initial error state.
    )

  return (
    submitComplete ? (
      <div id='success' className="flex flex-col items-center justify-center w-full">
        <div className='flex flex-col items-center gap-6'>
          <h2 className='flex flex-row gap-2 items-center text-2xl text-success font-semibold'>Note added Successfully <CircleCheckBig strokeWidth={2.5}/></h2>

          <div className='flex flex-col md:flex-row gap-4 items-center'>
            <button 
              onClick={() => setSubmitComplete(!submitComplete)}
              className='flex flex-row gap-1 items-center justify-center bg-primary/50 py-2 px-8 rounded-lg w-fit border border-primary hover:cursor-pointer hover:bg-primary font-semibold'
            >
              <SquarePenIcon/> Add New Note
            </button>


            <button 
              onClick={() => handleViewNote(noteId)}
              className='flex flex-row gap-1 items-center justify-center py-2 px-8 rounded-lg w-fit border border-primary hover:cursor-pointer hover:bg-primary/10 font-semibold'
            >
              View New Note
            </button>
          </div>
        </div>
      </div>
    ) : (
      <form 
        action={handleAddNote} 
        className='flex flex-col rounded-md p-4'
      >
        <h2 className='flex w-full mb-4 font-semibold items-center justify-center text-2xl'>Add New Note</h2>

        <label for="title" >
          Title: 
          <input 
            id="title" 
            name='title'
            aria-errormessage={error ? 'failed to add new note': ''}/>
        </label>
        <label for="content" >
          Note: 
          <textarea 
            id="content" 
            name='content'
            aria-errormessage={error ? 'failed to add new note': ''}/>
        </label>

        <TagPicker onChange={setTags}/>

        <button type='submit' disabled={isPending}>{isPending ? "Saving note..." : "Add Note"}</button>

        {/* error info section */}
        <ErrorDiv error={error}/>
      </form>
    )
  )
}

export default AddNote
