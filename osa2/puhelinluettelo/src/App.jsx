import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({query, handler}) => {
  return (
    <div>
      filter shown with <input value={query} onChange={handler} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
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

const Persons = ({persons, deletePerson}) => {
  const handleDeletion = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id)
    }
  }

  return (
    <>
      {persons.map(person => (
          <p key={person.name}>
            {person.name} {person.number}
            <button type='button' onClick={() => handleDeletion(person)}>
              delete
            </button>
          </p>
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
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    function checkPerson(array, value) {
      return array.some((arrayValue) => arrayValue.name === value)
    }

    if (checkPerson(persons, newName)) {
      if (newNumber.trim() !== '') {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const existingPerson = persons.find(n => n.name === newName)
          console.log(existingPerson)
          const changedPerson = { ...existingPerson, number: newNumber.trim() }
          console.log(changedPerson)

          personService
            .update(existingPerson.id, changedPerson)
            .then(returnedData => {
              console.log(returnedData)
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedData))
            })
          return
        }
        console.log("User not updated")
        return
      }
      window.alert(`${newName} is already added to phonebook, but there's no new number!`)
      return
    }

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim()
    }

    personService
      .create(personObject)
        .then(returnedData => {
        setPersons(persons.concat(returnedData))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = id => {
    personService
      .purge(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
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
        addPerson={addPerson}
        name={newName}
        namehandler={handleNameChange}
        number={newNumber}
        numberhandler={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App
