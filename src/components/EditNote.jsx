import React, { useActionState, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// utils.
import { useData } from '@utils/provider/DataProvider';

// components
import ErrorDiv from '@components/ErrorDiv';
import TagPicker from '@components/TagPicker';



const EditNote = () => {
    const navigate = useNavigate();

    // data.
    const { getNoteById, updateNote } = useData();
    const { noteId } = useParams();
    const [note, setNote] = useState({});
    const {id, title, tags, content} = note;
    const [tagsData, setTagsData] = useState([]);

    // getting the note data on initial page load.
    useEffect(()=>{
    const getNote = async () => {
        const { data, error } = await getNoteById(noteId);
        if(!error) {
            setNote(data)
            setTagsData(data.tags)
        }
    }

    getNote();
    }, [getNoteById])



    const [error, handleAddNote, isPending] = useActionState(async (_prevState, formData) => {
        try {
            // get data from form.
            const title = formData.get('title')
            const content = formData.get('content')

            // supabase insert method
            const { data, error } = await updateNote(id, {title, content, tags: tagsData});

            // todo: send success state, when we don't have errors.
            if(!error) {
                console.log(data)
                return navigate(-1)
            };

            if(error) {
                console.log(error.message)
                throw new Error(`Failed to add new note`)
            }


        } catch (error) {
            return new Error(`Failed to add new note!`)
        }
        },
        null // initial error state.
        )

    return (
        Object.values(note).length === 0 ? (
            <div>Loading</div>
        ) : (
        <form 
            action={handleAddNote} 
            className='flex flex-col rounded-md p-4'
        >
            <h2 className='flex w-full mb-4 font-semibold items-center justify-center text-2xl'>Update Note</h2>

            <label for="title" >
            Title: 
            <input 
                id="title" 
                name='title'
                defaultValue={title}
                aria-errormessage={error ? 'failed to update note': ''}/>
            </label>
            <label for="content" >
            Note: 
            <textarea 
                id="content" 
                name='content'
                defaultValue={content}
                aria-errormessage={error ? 'failed to update note': ''}/>
            </label>

            <TagPicker initialTags={tags} onChange={setTagsData}/>

            <button type='submit' disabled={isPending}>{isPending ? "Updating note..." : "Update Note"}</button>

            {/* error info section */}
            <ErrorDiv error={error}/>
        </form>
        )
    )
}

export default EditNote
