import {
  createHashRouter, 
  createBrowserRouter,
  useLoaderData
} from "react-router-dom";

import React, {Suspense} from 'react'

const Coins = React.lazy(()=> import ('../components/Coins'))         
const CoindId = React.lazy(()=> import ('../components/CoinId'))    
import Root                      from './Root'
import ErrorElement              from '../components/ErrorElement'



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement/>,    
    children: [
      {
          errorElement: <ErrorElement/>,
          children: [
              {
                index: "/",
                element:  <Suspense fallback={<> <p className="mt-5">loading...</p> </> } > 
                            <Coins /> 
                          </Suspense> ,                
                id: "root",
                      
              },

              {
                path: "/coinId/:id",
                element:  <Suspense fallback={<> <p className="mt-5">loading...</p> </> }> 
                            <CoindId />  
                          </Suspense> ,
                
                
              }, 

            ],
        },
      
    ],
  },
]);