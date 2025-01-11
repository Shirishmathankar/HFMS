import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import SignIn from '../pages/Signin.jsx'
import SignUp from '../pages/signup.jsx'
import Admin from '../pages/adimin.jsx'
import Delivery from '../pages/delivery.jsx'
import Pantry from '../pages/pantry.jsx'
const Body = () => {
    const Applayout=createBrowserRouter([
       
        {
          path:"/sign-in",
          element:<SignIn/>
        },
        {
          path:"/sign-up",
          element:<SignUp/>
       },
       {
        path:"/admin",
        element:<Admin/>
       },
       {
        path:"/delivery",
        element:<Delivery/>
       },
       {
        path:"pantry",
        element:<Pantry/>
       }
 
    ])
    
      return (
         <RouterProvider router={Applayout}/>
      )
}

export default Body