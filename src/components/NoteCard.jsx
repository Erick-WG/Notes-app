import { useNavigate } from 'react-router-dom';

import { Trash2Icon } from 'lucide-react';

// utils.
import { useData } from '@/utils/provider/DataProvider';
import { getDataFormat } from '@utils/HelperFunction/getDateFormat';


// todo: add a toast to notify the user when actions are successfull.

const NoteCard = ({id, title, content, date, tags}) => {
  const navigate = useNavigate();
  const { deleteNote } = useData()

  const handleNavigate = () => {
    return navigate(`${id}`);
  }

  const handleDeleteNote = async (id) => {
    const { data, error } = await deleteNote(id)
    if(!error) console.log(`Deleted: ${data[0].title}`)
    return { data, error }
  }

  return (
    <div className='group flex-1 flex flex-col w-full h-fit min-w-50 max-w-90 gap-2 bg-card/90 text-card-foreground rounded-2xl p-4 border border-border shadow-md hover:shadow-lg hover:bg-card/60 hover:cursor-pointer hover:border-border break-inside-avoid mb-4'>
      {/* header + Delete icon */}

      {/* <div className='flex flex-row justify-between'>
        <div></div>
        <div 
          className='text-sm text-muted-foreground hover:text-danger md:opacity-0 group-hover:opacity-100 transition-opacity'
          onClick={() => handleDeleteNote(id)}
        >
          <Trash2Icon />
        </div>
      </div> */}

      <div className='flex flex-row justify-between'>
        <div 
          className='flex flex-col font-semibold'
          onClick={handleNavigate}
        >
          <p className='text-sm text-muted-foreground'>{getDataFormat(date)}</p>
          <h2 className='text-xl line-clamp-1 max-w-62'>{title}</h2>
        </div>
        
        <div 
          className='text-sm text-muted-foreground hover:text-danger md:opacity-0 group-hover:opacity-100 transition-opacity'
          onClick={() => handleDeleteNote(id)}
        >
          <Trash2Icon />
        </div>

      </div>

      {/* content preview */}
      <div 
        className='flex flex-1 text-muted-foreground hover:text-foreground'
        onClick={handleNavigate}
      >
        <p className='line-clamp-3'>{content}</p>
      </div>
      
      {/* info */}
      {tags && (
        <div className='flex flex-row items-center justify-between border-t border-border mt-2 pt-4'>
          <div id='tags' className='flex flex-wrap w-full gap-1 text-xs text-primary'>
            {tags.map(tag => (
              <span className='flex items-center bg-primary/10 border border-primary px-1 rounded'>{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteCard