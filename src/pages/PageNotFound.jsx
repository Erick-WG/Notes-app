import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 h-full flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-3xl font-serif">Page Not Found</h1>
        <span className="text-7xl font-black text-transparent bg-linear-to-r from-primary to-muted-foreground bg-clip-text">404</span>
      </div>
      <div className="flex flex-row gap-4">
        <button 
          className="flex items-center px-4 py-1 border hover:border-primary rounded-2xl hover:cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <button 
          className="flex items-center px-4 py-1 border border-primary text-primary bg-primary/10 hover:border-primary-hover hover:bg-primary-hover/20 rounded-2xl hover:cursor-pointer"
          onClick={() => navigate('/')}
        >
          Go Home
        </button>
      </div>      
    </div>
  )
}

export default PageNotFound
