import { Outlet, useNavigation  } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Network from '../components/Network'
import {useDarkModeContext} from '../context/ThemeContext'

const Root = ()=>{

const {theme, setTheme} = useDarkModeContext();

	return ( 

			<div className="App"  > 
			
			<NavBar/>			
			
			<div className="container-fluid py-5">

			<Network/>
			<Outlet/>
			</div>

			</div>

		)
}

export default Root