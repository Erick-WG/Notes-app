import { useEffect } from "react";
import { useAuth } from "@/utils/provider/AuthProvider"
import { useNavigate } from "react-router-dom";
import Note from "@/components/Note";

const Dashboard = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/signin');
    }
  }, [session, navigate]);

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      Hi, there {user?.user_metadata.name}

      <div id="notes" className="flex-1 flex flex-col w-full">
        <Note />
      </div>
    </div>
  )
}

export default Dashboard