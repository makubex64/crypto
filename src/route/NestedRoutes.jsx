import {
  createHashRouter, 
  
} from "react-router-dom";

import React from 'react'

import Coins  from '../components/Coins'         
import CoindId from '../components/CoinId'    
import Root                      from './Root'
import ErrorElement              from '../components/ErrorElement'



export const router = createHashRouter([
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
                element: <Coins />,                
                
                      
              },

              {
                path: "/coinId/:id",
                element: <CoindId />,
                
                
              }, 

            ],
        },
      
    ],
  },
]);