import axios                          from 'axios'
import {useState, useEffect, useRef } from 'react'
import { useParams,useNavigate    }   from 'react-router-dom';
import                                     './Style.css'
import {useGlobalContext}             from '../context/GlobalContext'
import {useDarkModeContext}           from '../context/ThemeContext'
import Image    from '../../public/vite.svg'
import debounce from 'lodash.debounce';
import DarkMode from './DarkMode'

const NavBar = ()=>{

const navigate =                      useNavigate();
const {id}  =                         useParams();
const inputClickRef =                 useRef(null);
const {lalala, setCoins} =            useGlobalContext();
const {theme, setTheme} =             useDarkModeContext();
const [value, setValue] =             useState("");
const [loading, setLoading]       =   useState(false);

const [windowSize, setWindowSize] = useState(getWindowSize());

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

useEffect(()=>{

  function handleWindowResize(){
    setWindowSize(getWindowSize());
  }

  window.addEventListener('resize', handleWindowResize=>{
    if(getWindowSize.innerWidth <= 700){

    }
  });

  return ()=>{
    window.removeEventListener('resize', handleWindowResize)
  }

}, []);




const onChange = (event)=>{
  let query = event.target.value;
  setValue(query)
}

const onClear = () => {
    ref.current.value = "";
}

const styles = {
  navbar:{
    backgroundColor : theme === "Light" ? "#212F3C" : "white",
    color: theme === "Light" ? "white" : null,

  },
  input:{
    backgroundColor: theme === "Light" ? "#212F3C" : null,
    borderColor: theme === "Light" ? "#404040" : "",
    color: theme === "Light" ? "white" : null

  },

  searchResult:{
    backgroundColor: theme === "Light" ? "#212F3C" : null,
    color: theme === "Light" ? "white" : null

  }
}
return(

<>  


<nav style={styles.navbar} className="py-3 navbar navbar-expand-lg shadow fixed-top "  >
  <div className="container-fluid ">    
      

      <div className="">
        <a style={{cursor: "pointer"}} onClick={() => navigate(`/`)}  ><img  src={Image} alt="" /> CryptoMain</a>
      </div>

      

    {/*DARK-MODE*/}
    <div className="border border-secondary ps-2 pe-2  rounded-pill">
      <DarkMode/>
    </div>
      
   
      

    
      <div  className="d-flex form-lala" >

      <div className=" input-wrapper">
        <i className="bi bi-search"></i>
        <input style={styles.input} value={value} onChange={onChange} className="form-control input-pro" type="search" placeholder="Search" aria-label="Search" />
      </div>
     
        
       
       {
        value.length != 0 ?(

          <div style={styles.searchResult} className="lalala-dataResult mt-5 p-1">

          {
            lalala.filter(item=>{
              const searchTerm = value.toLowerCase() || value.toUpperCase();
              const fullName   = item.name.toLowerCase().includes(value.toLowerCase())   || 
                                 item.name.toUpperCase().includes(value.toUpperCase())   || 
                                 item.symbol.toLowerCase().includes(value.toLowerCase()) ||
                                 item.symbol.toUpperCase().includes(value.toUpperCase())

              return searchTerm && fullName
            })
            .slice(0,9)
            .map(item=>{
              
              return <a style={{cursor: 'pointer'}} onClick={()=> {setValue(""), navigate(`/coinId/${item.id}`)}} className="list-group-item py-1" key={item.id}>
                      <img style={{width: "20px"}} className="me-2" src={item.image} alt={item.image} />
                      <span className="me-2">{item.name}</span>
                      <span className="text-uppercase  me-3">{item.symbol}</span>                                         
                      <span style={{fontSize: "10px"}} className="badge bg-info">Rank :{" "} {item.market_cap_rank}</span>
                
                     </a>
            })
          }
            
          </div>
          ): null
            
       }


       {/*
        searchText.length > 0 ? (
          
          <div onClick={handleClick} style={styles.searchResult} className="lalala-dataResult mt-5 p-1">
                
                  {
                    searchData ?

                    searchData.slice(0,5).map(coin=>{
                      console.log(coin)
                      return <a onClick={()=> navigate(`/coinId/${coin.id}`) }  style={{textDecoration: "none", cursor: "pointer"}}  key={coin.id}  className="list-group-item py-1">
                              <img style={{width: "20px"}} className="me-2" src={coin.large} alt={coin.image} /> 
                              <span className="me-2">{coin.name}</span>
                              <span className="text-uppercase  me-3">{coin.symbol}</span>                                         
                             <span style={{fontSize: "10px"}} className="badge bg-info">Rank :{" "} {coin.market_cap_rank}</span>                      

                            </a>
                        


                    })

                    : <p>Please wait...</p>
                  }
                
              </div>
        ) : null  */}


       {/*
        filteredData.length != 0 && (

          <div style={styles.searchResult} className="lalala-dataResult mt-5">
            
              {
                filteredData.slice(0,2).map(item=>{
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
      */ }
       
      </div>
   
  </div>
</nav>

 

</>
		)

}

export default NavBar