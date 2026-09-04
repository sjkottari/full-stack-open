import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({query, handler}) => {
  return (
    <div>
      filter shown with <input value={query} onChange={handler} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.function}>
      <div>
        name: <input value={props.name} onChange={props.namehandler} />
      </div>
      <div>
        number: <input value={props.number} onChange={props.numberhandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons}) => {
  return (
    <>
      {persons.map(person => (
          <p key={person.name}>{person.name} {person.number}</p>
        ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    function checkPerson(array, value) {
      return array.some((arrayValue) => arrayValue.name === value)
    }

    if (checkPerson(persons, newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    const person = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={filter} handler={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        function={addPerson}
        name={newName}
        namehandler={handleNameChange}
        number={newNumber}
        numberhandler={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons}/>
    </div>
  )

}

export default App
