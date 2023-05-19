import {useState, useEffect} from 'react'
import {useDarkModeContext} from '../context/ThemeContext'


const Converter = ({lalala})=>{


const newVal = lalala?.market_data?.current_price?.usd

// amount and currencies
const [currencies1, setCurrencies1] = useState(newVal)
const {theme} = useDarkModeContext();



const [currencies2, setCurrencies2] = useState([])
const [amount1, setAmount1] = useState("")
const [amount2, setAmount2] = useState("")




// const handlePro = (e)=>{
// 
// 	event.target.value
// 	setValue1(event.target.value)
// }

// input1
const [value1,  setValue1] = useState('')
console.log(value1)
const handleChange1 = (event) => {
// 👇 Get input value from "event"
    const regex = /^[0-9\b]+$/;

    if (event.target.value === "" || regex.test(event.target.value)) {
    	setValue1(event.target.value)
    }


  };
  // input2
const [value2, setValue2]  = useState('')
const handleChange2 = (event) => {
// 👇 Get input value from "event"
    const regex = /^[0-9\b]+$/;

    if (event.target.value === "" || regex.test(event.target.value)) {
    	setValue2(event.target.value)
    }


  };


   const styles = {
 	input:{
    background: theme === "dark" ? "#212F3C" : null,
    borderColor: theme === "dark" ? "#404040" : "",
    color: theme === "dark" ? "white" : null

  },
 }

	return(

		<>
		<h5>Convertor</h5>
		<input style={styles.input} amount1={amount1} value={value1} onChange={handleChange1} className="form-control"  placeholder={lalala?.name} />
		<input style={styles.input} amount2={amount2} value={value2} onChange={handleChange2}  className="form-control mt-3"  placeholder="Usd" />
		<p className="fw-semibold mt-3">
		1{" "}
		{lalala?.name} 
		{" = "} 
		{lalala?.market_data?.current_price?.usd} 
		{" $"}
		</p>
		</>

		)
}

export default Converter