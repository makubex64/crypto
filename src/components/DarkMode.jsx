import {useDarkModeContext} from '../context/ThemeContext'
import './Style.css' 

const DarkMode = ()=>{

const {theme, setTheme} = useDarkModeContext();


const handleThemeToggle = (event)=>{
	event.preventDefault();
	
	if(theme === "Dark"){
    setTheme("Light");

  }else{
    setTheme("Dark");
  }

}

const iconLight = <i className="bi bi-toggle-off"></i>
const iconDark  = <i className="bi bi-toggle-on"></i>


	return(
		<>

		<span onClick={handleThemeToggle} style={{cursor: "pointer"}}  >
		{ theme === "Light" ? " Light Mode" : "Dark Mode" } 
		</span>

		</>
		)

}

export default DarkMode