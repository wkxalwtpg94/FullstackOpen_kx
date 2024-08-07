import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from "./services/persons"


const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addName}>
        <div>
          name: <input value = {props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
        number: <input value = {props.newNumber} onChange = {props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      Filter names with: <input value ={props.newFilter} onChange={props.handleFilterChange}></input>
    </div>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map((person) => <p key={person.name}>{person.name} {person.number} <button onClick={() => props.deletePerson(person.id)}>delete</button> </p>)}
    </div>
  )
}

const Notification = ({message}) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderColor: "green"
  }
  if (message === null) {
    return null
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  const notificationStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderColor: "red"
  }
  if (message === null) {
    return null
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('a new name...')
  const [newNumber, setNewNumber] = useState("012-XX40523")
  const [newFilter, setNewFilter] = useState("")
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log("effect")
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])
  
  console.log("render", persons.length, "persons")
  
  
  console.log("checking the current list of persons:", persons)

  // Event handler to Add New Names
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
    let idToUpdate;
    for (let index = 0; index < persons.length; index++) {
      if (persons[index].name === nameObject.name) {
        exists = true;
        idToUpdate = persons[index].id
        console.log(idToUpdate)
        break
      }
    }

    if (exists === true) {
      window.confirm(`${nameObject.name} already exists in the phonebook!, replace old number with new one?`)
      personService
        .update(idToUpdate, nameObject)
        .then(returnedPerson => {
          let updatedPerson = persons.map(person => person.id !== idToUpdate ? person : returnedPerson)
          setPersons(updatedPerson)
          
          setMessage(`Updated ${nameObject.name}'s number`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(error => {
          setErrorMessage(`${nameObject.name} was already deleted from the server`)
          setTimeout(()=>{setErrorMessage(null)}, 5000)
          setPersons(persons.filter(person => person.id !== idToUpdate))
        })

    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        setMessage(`Added ${nameObject.name}`)
        setTimeout(() => {setMessage(null)}, 5000)
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

 // handle Filter onChange
  

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


// Delete Person
//want to try to reference the persons name or id, to delete him, how to get the name?
const deleteThisPerson = (id) => {
  console.log(`button clicked, it should delete person with ${id} id`)
  const personToDelete = persons.find(person => person.id === id)
  console.log(personToDelete)
  window.confirm(`Do you really want to delete ${personToDelete.name}?`)
  personService
    .deletePerson(id)
    .then(deletedPerson => {
      setPersons(
        persons.filter(person => person.id !== id))
    })
}


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message ={message} />
      <ErrorNotification message = {errorMessage}/>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}></Filter>
      <h2>Add New Contact</h2>
      <PersonForm addName = {addName} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
        <Persons personsToShow = {personsToShow} deletePerson= {deleteThisPerson} ></Persons>
    </div>
  )
}
 


export default App