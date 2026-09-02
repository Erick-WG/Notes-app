import { CircleAlertIcon } from "lucide-react"

const ErrorDiv = ({error}) => {
  return error && (
    <div 
      id='error' 
      aria-errormessage={error.message}
      className='flex flex-row items-center justify-center gap-1 text-sm'
      >
        <CircleAlertIcon size={16}/>
        <p>{error.message}</p>
    </div>
  )
}

export default ErrorDiv
