import React from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
const Table = (props) => {
    const state = props.state
    const func = props.func
  return (
    <div>
      <table>
          <tbody>
            {state.persons.filter((person) => person.name.toLowerCase().startsWith(state.filter.toLowerCase())).map((person) => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td><td><button onClick={func(person.id,person.name)}>poista</button></td></tr>)}
          </tbody>
        </table>
    </div>
  )
}

const Filter = (props) => {
    const {filter,handleFilter} = props
    
  return (
      <div>
        rajaa näytettäviä<input 
          value={filter}
          onChange={handleFilter}
        />
      </div>

  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
      ],
      newName: '',
      newNumber: '',
      filter: '',
      error: null
    }
  }
    
    componentDidMount() {
    console.log('did mount')
    //axios
    //  .get('http://localhost:3001/persons')
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

    addPerson = (event) => {
        event.preventDefault()
        const person = {
            name: this.state.newName,
            number: this.state.newNumber,
            id: Math.max.apply(Math,this.state.persons.map(person => person.id + 1))
        }      
        if (!this.state.persons.map(person => person.name).includes(this.state.newName)) {
            const persons = this.state.persons.concat(person)
        personService
            .create(person)
            .then(response => {
                this.setState({
                    error: "Lisättiin ".concat(person.name),
                    persons: persons,
                    newName: '',
                    newNumber: ''
                })
                setTimeout(() => {
                    this.setState({error: null})
                }, 5000)
            })
        } else if (window.confirm(this.state.newName.concat(" on jo luettelossa korvataanko vanha numero uudella"))) {
            const name = person.name
            const id = this.state.persons.filter(person => person.name === name)[0].id
            person.id = id
            const persons = this.state.persons.filter(person => person.name !== name).concat(person)
            personService.update(id,person).then(response => {
                this.setState({
                    error: "Uudistettiin henkilön ".concat(name).concat(" numero"),
                    persons: persons,
                    newName: '',
                    newNumber: ''
                })
                setTimeout(() => {
                    this.setState({error: null})
                }, 5000)
            }).catch(error => {
                personService
            .create(person)
            .then(response => {
                this.setState({
                    error: "Lisättiin ".concat(name),
                    persons: persons,
                    newName: '',
                    newNumber: ''
                })
                setTimeout(() => {
                    this.setState({error: null})
                }, 5000)
            })
            })
        }
    }
    
    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }
    
    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }
    
    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }
    
    removePerson = (id,name) => () => {
        if (window.confirm("Poistetaanko ".concat(name))) { 
        personService.deletePerson(id).then(response => {
                const persons = this.state.persons.filter(person => person.id !== id)
                this.setState({
                    persons: persons,
                    error: 'poistettiin '.concat(name)
                })
                setTimeout(() => {
                    this.setState({error: null})
                }, 5000)
            })
        }
    }
    
  render() {
    return (
      <div>
        <div>
            <h2>Puhelinluettelo</h2>
            <Notification message={this.state.error} />
            <div>
              <Filter filter={this.state.filter} handleFilter={this.handleFilterChange.bind(this)} />
            </div>
        </div>
        <h3>lisää uusi</h3>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input 
                    value={this.state.newName}
                    onChange={this.handleNameChange}
                  />
          </div>
          <div>
              numero: <input 
                        value={this.state.newNumber}
                        onChange={this.handleNumberChange}
                      />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h3>Numerot</h3>
        <Table state={this.state} func={this.removePerson.bind(this)} />
      </div>
    )
  }
}

export default App