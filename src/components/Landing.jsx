import { Navigate } from "react-router-dom";

import { useAuth } from "@utils/provider/AuthProvider";

const Landing = () => {
    const { session } = useAuth();
    if(session === undefined) return (
        <div className="flex h-full w-full items-center justify-center">Loading...</div>
    )
    return session ? <Navigate to={'/dashboard'}/> : <Navigate to={'/signin'}/>
}

export default Landing
