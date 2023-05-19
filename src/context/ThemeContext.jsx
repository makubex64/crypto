import {createContext, useContext, useState, useEffect} from 'react'

const DarkModeContext = createContext();

const DarkModeProvider = ({children})=>{

const [theme, setTheme] = useState(localStorage.getItem('light'))

useEffect(()=>{

	localStorage.setItem('light', theme)
  document.body.className = theme;
},[theme])


	return(
		<>

		<DarkModeContext.Provider value={{theme, setTheme}} > 
			{children}
		</DarkModeContext.Provider>

		</>
		)

}

export const useDarkModeContext = ()=>{
	return useContext(DarkModeContext)
}



export default DarkModeProvider;