import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import ErrorDiv from "@components/ErrorDiv";
// utils
import { formatDistanceToNow } from "date-fns";

// data provider.
import { useAuth } from "@utils/provider/AuthProvider"
import { useData } from "@utils/provider/DataProvider";
import { Plus, RotateCcwClock, SquareArrowOutUpRight } from "lucide-react";



// todo: under the note data, use error state to also update the preview div.
const Dashboard = () => {
  const { user, session } = useAuth();
  // data.
  const { getRecentNote, totalNotes, getNotes } = useData();
  const [note, setNote] = useState(undefined);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/signin');
    }

    getNotes();

    const getRecentActivity = async () => {
      const recentNote = await getRecentNote()
      .then((resolve)=>(setNote(resolve?.data[0])), (reject)=>(setError(new Error(`Failed to get recent note!`, reject))));
      return recentNote;
    }
    getRecentActivity();
  }, [session, navigate, getRecentNote, getNotes]);
  
  if (!session) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col gap-8 justify-center mt-6">
      <h1 className="flex flex-row gap-1.5 w-full text-2xl items-center justify-center md:justify-start">
        Hi there,
        <span className="font-bold bg-linear-to-r from-primary-hover to-secondary bg-clip-text text-transparent">
          {user?.user_metadata.name}
        </span>
      </h1>

      {/* body flex-1 */}
      <div className="flex-1 flex flex-col-reverse md:flex-row w-full gap-6 mt-6 justify-center items-center md:items-start">
        {/* notes db metrix, grid */}
        <div className="flex flex-col gap-1 md:max-w-1/4 md:min-w-80">
          <div className="grid grid-cols-4 w-full min-w-60 max-w-120 grid-rows-2 gap-2 gap-y-6 md:gap-y-4">
            <div className="col-span-4 flex min-h-10 px-4 py-2 shadow border border-border rounded-2xl">
              <p className='flex flex-col text-center w-full max-w-120 italic'>
                " The palest ink is better than the best memory, Ideas are like guests, note them down before they leave "
                <span className='italic text-sm text-muted-foreground'>- Unkown</span>
              </p>
            </div>

            <div 
              className="col-span-2 flex flex-col min-h-10 w-full h-full px-4 py-2 shadow border border-border rounded-2xl hover:cursor-pointer"
              onClick={()=> navigate('/notes')}
            >
              <p className="flex items-start tracking-wide font-semibold text-xs text-muted-foreground">Notes saved</p>
              <div className="flex-1 flex items-center justify-center">
                <p className="font-bold font-noto-sans text-5xl">{totalNotes}</p>
              </div>
            </div>
            <div 
              className="col-span-2 flex items-center justify-center min-h-10 px-4 py-2 shadow border border-primary rounded-2xl text-primary bg-primary/10 hover:bg-primary-hover/20 hover:cursor-pointer"
              onClick={()=> navigate('/notes/new')}
            >
              <Plus/>
            </div>
          </div>
        </div>

        {/* recent activity note preview */}
        <div 
          id="recent-note-preview" 
          className="group flex-1 max-w-120 flex flex-col gap-2 rounded-2xl border border-border pb-4 shadow hover:shadow-lg"
        >
          {/* header */}
          <div className="flex flex-row items-center justify-between p-4 text-muted-foreground border-b border-border bg-muted rounded-t-2xl">
            <h3 className="flex flex-row items-center gap-1"><RotateCcwClock /> Recent Activity</h3>

            <p className="text-sm">
              {note && !error ? formatDistanceToNow(note.created_at,{ addSuffix: true }) : ''}
            </p>
          </div>
          
          {/* note preview. */}
          <div className="flex flex-col gap-1.5 px-4">
            {/* head and view link */}
            <div id="view" className="flex flex-row items-center justify-between text-muted-foreground">
              <p className="text-xs">Note preview</p>
              <Link to={`/notes/${note ? note.id : ''}`} className="hover:cursor-pointer hover:text-primary  md:opacity-0 group-hover:opacity-100">
                <SquareArrowOutUpRight/>
              </Link>
            </div>

            {/* note data. */} 
            {note && !error ? (
              <div 
                className="flex-1 flex flex-col gap-1  hover:cursor-pointer"
                onClick={()=> navigate(`/notes/${note.id}`)}>
                <h3 className="text-2xl leading-7 font-semibold">{note.title}</h3>
                <div className="flex-1 pb-6 text-muted-foreground hover:text-foreground">
                  <p className="line-clamp-3">{note.content}</p>
                </div>
                {note.tags && (
                  <div id="tags" className="relative w-full">
                    <div className="flex h-10 flex-wrap content-start gap-1 overflow-hidden text-xs text-primary">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center rounded border border-primary bg-primary/10 px-1 leading-4"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Soft fade at the end of the second line */}
                    <div className={`${note.tags.length < 10 ? 'hidden' : 'hidden'} pointer-events-none absolute bottom-0 right-0 h-5 w-16 bg-linear-to-r from-card/60 to-background `}/>
                </div>)}
              </div>
            ) : (
              error ? (
                <ErrorDiv error={error}/>
              ) : (
                totalNotes === 0 ? (
                  <div className="flex-1 flex min-h-20 items-center justify-center">Create a note to see the preview...</div>
                  
                ) : (
                  <div className="flex-1 min-h-30 items-center">Loading preview...</div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard