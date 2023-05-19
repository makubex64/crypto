import axios                          from 'axios'
import {useState, useEffect, useRef } from 'react'
import { useParams,useNavigate    }   from 'react-router-dom';
import                                     './Style.css'
import {useGlobalContext}             from '../context/GlobalContext'
import {useDarkModeContext}           from '../context/ThemeContext'
import DarkMode from './DarkMode'

const NavBar = ()=>{

const navigate =                      useNavigate();
const {id}  =                         useParams();
const {timeOutRef} =                  useRef();
const inputClickRef =                 useRef(null);
const {lalala} =                      useGlobalContext();
const {theme, setTheme} =             useDarkModeContext();

const [filteredData, setFilteredData] = useState([])
const [show, setShow] = useState(false)

const handleFilter = (event)=>{
    const searchWord = event.target.value;
    const newFilter = lalala.filter((value)=>
      value.symbol.toLowerCase().includes(searchWord.toLowerCase())
      |      
      value.name.toLowerCase().includes(searchWord.toLowerCase())

         );

    if(searchWord === ""){
      setFilteredData([])

    }else{
      setFilteredData(newFilter); 

    }

  
 }

 const handleClick = (event)=>{
  
  inputClickRef.current.value = '';
  setFilteredData([])
  setShow(!show)

 }

const styles = {
  navbar:{
    backgroundColor : theme === "dark" ? "#212F3C" : "white",
    color: theme === "dark" ? "white" : null,

  },
  input:{
    backgroundColor: theme === "dark" ? "#212F3C" : null,
    borderColor: theme === "dark" ? "#404040" : "",
    color: theme === "dark" ? "white" : null

  },

  searchResult:{
    backgroundColor: theme === "dark" ? "white" : null

  }
}

return(

<>  


<nav style={styles.navbar} className="py-3 navbar navbar-expand-lg shadow fixed-top"  >
  <div className="container-fluid">
    <button onClick={handleClick} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div  className={`collapse navbar-collapse ${show ? "show": null }`} id="navbarTogglerDemo02">
      

      <ul className="navbar-nav me-auto mb-2 mb-lg-0 navigation">
        <li className="nav-item">
          <a style={{cursor: "pointer"}} onClick={() => navigate(`/`)}  >Home</a>
        </li>
        <li className="nav-item">
          <a style={{cursor: "pointer"}} >News</a>
        </li>
        <li className="nav-item">
          <a style={{cursor: "pointer"}}>Other</a>
        </li>
      </ul>

    {/*DARK-MODE*/}
      <DarkMode/>

    
      <div style={{width:"20rem"}} className="input-wrapper d-flex form-lala" >
        <i className="bi bi-search"></i>
        <input style={styles.input} ref={inputClickRef} onChange={handleFilter}  className="form-control input" type="search" placeholder="Search" aria-label="Search" />
       
       {
        filteredData.length != 0 && (

          <div style={styles.searchResult} className="lalala-dataResult mt-5">
            
              {
                filteredData.slice(0,8).map(item=>{
                  return(
                    <a style={{textDecoration: "none"}} onClick={handleClick} key={item.id}  className="dataItem">
                      <p style={{width:"100%"}} onClick={()=> navigate(`/coinId/${item.id}`,{replace: true})}>                
                       <img style={{width: "20px"}} className="me-2" src={item.image} alt={item.image} /> 
                       <span className="me-2">{item.name}</span> 
                       <span className="text-uppercase text-muted me-3">{item.symbol}</span>                                         
                       <span style={{fontSize: "10px"}} className="badge bg-info">Rank :{" "} {item.market_cap_rank}</span>                      
                     </p>
                     </a>
                    )
                })
              }
            
          </div>

          ) 
       }
       
      </div>
    </div>
  </div>
</nav>

 

</>
		)

}

export default NavBar