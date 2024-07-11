import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('a new name...')
  console.log("checking the current list of persons:", persons)


  const addName = (event) => {
    event.preventDefault()
    console.log("button clicked, where did it come from?", event.target)
 
    // Define new nameObject  
    const nameObject = {
      name: newName
    }

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
    }

  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value = {newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
        <div>
          {persons.map((person, index) => <p key={`${person.name}-${index}`}> {person.name}</p>)}
          

        </div>
    </div>
  )
}
 


export default App