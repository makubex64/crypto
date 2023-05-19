import {useDarkModeContext} from '../context/ThemeContext'
import './Style.css'

const DarkMode = ()=>{

const {theme, setTheme} = useDarkModeContext();


const handleThemeToggle = (event)=>{
	event.preventDefault();
	setTheme( theme === "light" ? "dark" : "light" )

}

const iconLight = <i className="bi bi-toggle-off"></i>
const iconDark  = <i className="bi bi-toggle-on"></i>


	return(
		<>

		<span onClick={handleThemeToggle} style={{cursor: "pointer"}}  >
		{ theme === "light" ? "Dark Mode" : "Light Mode" } 
		</span>

		</>
		)

}

export default DarkMode