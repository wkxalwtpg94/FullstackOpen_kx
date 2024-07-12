import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567"},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('a new name...')
  const [newNumber, setNewNumber] = useState("012-XX40523")
  const [newFilter, setNewFilter] = useState("")

  console.log("checking the current list of persons:", persons)


  const addName = (event) => {
    event.preventDefault()
    console.log("button clicked, where did it come from?", event.target)
 
    // Define new nameObject  
    const nameObject = {
      name: newName,
      number: newNumber
    }

    // Check if name already exists
    let exists = false;
    for (let index = 0; index < persons.length; index++) {
      if (persons[index].name === nameObject.name) {
        exists = true;
        break
      }
    }

    if (exists === true) {
      alert(`${nameObject.name} already exists in the phonebook!`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName("")
      setNewNumber("")
    }

  }

  // handle onChange
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

 // handle Filtern onChange
  

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  let personsToShow;
  if (newFilter === "") {
    personsToShow = persons
  } else {
    personsToShow = persons.filter((person)=> {return (person.name.toLowerCase().startsWith(newFilter.toLowerCase()))})
  }
    console.log(personsToShow)

  return (
    <div>
      <h1>Phonebook</h1>
      <div>Filter names with: <input value ={newFilter} onChange={handleFilterChange}></input></div>
      <h2>Add New Contact</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value = {newName} onChange={handleNameChange}/>
        </div>
        <div>
        number: <input value = {newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
          {personsToShow.map((person) => <p key={person.name}>{person.name} {person.number} </p>)}
        </div>
    </div>
  )
}
 


export default App