import { useState, useEffect } from 'react'
import axios from "axios"

const Country = (props) => {
  if (props.filteredCountries.length > 10) {
    return (<div>Too many country matches, please further specify your search</div>)
  } else if (props.filteredCountries.length > 1) {
    return (props.filteredCountries.map((country) => 
      <p key ={country.name.common}> {country.name.common} </p>))
  } else if (props.filteredCountries.length === 1) {
    return (
      
      props.filteredCountries.map((country) => {
      return (
      <div key ={country.name.common}> 
      <h1>{country.name.common}</h1>
      <p></p>
      <p>Capital: {country.capital}</p>
      <p>Area code: {country.area} </p>
      <p></p>
      <h2>Languages</h2>
      <ul>
        {(Object.values(country.languages)).map((language)=> {
          return (<li key={language}> {language} </li>)
        })}
      </ul>
      {console.log(country.flags.png)}
      <img src={country.flags.png}></img>
      
      </div>)})
    )
  
  }


  <div>

  </div>
}


function App() {
  const [newFilter, setNewFilter] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
      console.log("fetching relevant countries")
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then(
          response => {
            console.log(response.data)
            setCountries(response.data)
          })
    
  },[])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  let filteredCountries; 
  if (newFilter === "") {
      filteredCountries = countries
    } else {
      filteredCountries = countries.filter((country) => {return country.name.common.toLowerCase().startsWith(newFilter.toLowerCase())})
    }
    console.log(filteredCountries)
    

  return (
    <div>
      <label>find countries <input value={newFilter} onChange={handleFilterChange}></input></label>
      <p></p>
      <Country filteredCountries = {filteredCountries} />
    </div>
  )
}

export default App
