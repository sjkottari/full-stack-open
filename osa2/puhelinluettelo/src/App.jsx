import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

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
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const name = newName.trim()
    const number = newNumber.trim()

    const existingPerson = persons.find(n => n.name === name)

    if (existingPerson) {
      if (number === '') {
        window.alert(`${name} is already added to phonebook, but there's no new number!`)
        return
      }

      const confirmed = window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmed) {
        const changedPerson = { ...existingPerson, number: number }
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedData => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedData
            ))
            setNotification({
              message: `Modified ${returnedData.name}`,
              type: 'success'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotification({
              message: `Update request failed: Person has been removed or operation unsupported by server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
        return
      }
      console.log("User not updated")
      return
    }

    const personObject = {
      name,
      number
    }

    personService
      .create(personObject)
      .then(returnedData => {
        setPersons(persons.concat(returnedData))
        setNotification({
          message: `Added ${returnedData.name}`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = id => {
    personService
      .purge(id)
      .then(() => {
        const deletedPerson = persons.find(person => person.id === id)
        setPersons(persons.filter(person => person.id !== id))
        setNotification({
          message: `Deleted ${deletedPerson.name}`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
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
      <Notification notification={notification} />
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
