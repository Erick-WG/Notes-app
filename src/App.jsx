import { AuthProvider } from "@utils/provider/AuthProvider";



function App() {

  return (
    <AuthProvider>
      <div className="flex w-full min-h-screen h-full items-center justify-center">
        Notes app --&gt; start
      </div>
    </AuthProvider>
  )
}

export default App
