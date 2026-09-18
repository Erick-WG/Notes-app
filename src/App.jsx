import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./utils/provider/AppProvider";

// components.
import MainLayout from "@pages/MainLayout";
import Landing from "@components/Landing";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Dashboard from "@pages/Dashboard";
import NotesLayout from "@pages/NotesLayout";
import NotesCollection from "@pages/NotesCollection";
import PageNotFound from "@pages/PageNotFound";
import Note from "@components/Note";
import AddNote from "@components/AddNote";
import EditNote from "@components/EditNote";


function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Landing />}/>
            <Route path="signin" element={<SignIn />}/>
            <Route path="signup" element={<SignUp/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>

            {/* notes page */}
            <Route path="notes" element={<NotesLayout />}>
              <Route index element={<NotesCollection />}/>
              <Route path="new" element={<AddNote />} />
              <Route path=":noteId" element={<Note/>}/>
              <Route path=":noteId/edit" element={<EditNote/>}/>
            </Route>

            {/* default page */}
            <Route path="*" element={<PageNotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
