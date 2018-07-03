import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


const List = (props) => {
    const list = props.list
    const func = props.func
    
    if (list.length > 10) {
        return (
            <div>
                <p>too many matches, specify another filter</p>
            </div>
        )
     } else if (list.length === 1) {
         const country = list[0]
        return (
            <div>
                <h2>{country.name} {country.nativeName}</h2>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
                <img src={country.flag} alt="flag" height="200" width="300" />
            </div>
        )        
     } else {
        return (
            <div>
            <table>
                <tbody>
                    {list.map(country => <tr key={country.name}><td onClick={func(country.name)}>{country.name}</td></tr>)}
                </tbody>
            </table>
            </div>
        )
                
     }

}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [
      ],
      filter: '',
      filtered: [          
      ]
    }
  }
    
    componentDidMount() {
    console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data,
                        filtered: response.data
                      })
        console.log(response)
      })
  }
    
    handlefilterChange = (event) => {
        const filtered = this.state.countries.filter((country) => country.name.toLowerCase().includes(event.target.value.toLowerCase()) === true)
        this.setState({ filter: event.target.value,
                        filtered: filtered  
                      })
    }

    clickCountry = (name) => () => {
        const filtered = this.state.countries.filter(country => country.name === name)
        this.setState({
            filter: name,
            filtered: filtered
        })
    }
    
  render() {
    return (
      <div>
        find countries: <input 
            value={this.state.filter}
            onChange={this.handlefilterChange}
        />
        <List list={this.state.filtered} func={this.clickCountry.bind(this)} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

