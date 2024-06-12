import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './module/login/Login'
import AssignmentForm from './module/assignment/Assignment'
import AttendancePage from './module/attendance/Attendence'
import AddNotesPage from './module/notes/Notes'
import AllNotesPage from './module/notes/AllNotes'
import LandingPage from './module/landing/Landing'
import SubmissionForm from './module/submission/Submission'

function App() {
  const [count, setCount] = useState(0)
  const route = createBrowserRouter([{
    path:"/",
    element: <LandingPage/>
  },{
    path:"/login",
    element: <Login/>
  },
{
  path: '/assignment',
  element: <AssignmentForm/>
},
{
  path: '/submission',
  element:<SubmissionForm/>
},
{
  path:'/attendance',
  element:<AttendancePage/>
},
{
  path:'/notes',
  element:<AddNotesPage/>
},
{
  path:'/all-notes',
  element:<AllNotesPage/>
}]);

  return <RouterProvider router={route} />
}

export default App