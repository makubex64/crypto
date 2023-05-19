import React            from 'react'
import ReactDOM         from 'react-dom/client'
import {router}         from './route/NestedRoutes'
import {RouterProvider} from 'react-router-dom';
import GlobalContextProvider from './context/GlobalContext';
import DarkModeProvider from './context/ThemeContext';


ReactDOM.createRoot(document.getElementById('root')).render(
<DarkModeProvider>
  <GlobalContextProvider> 
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GlobalContextProvider>
</DarkModeProvider>
)

