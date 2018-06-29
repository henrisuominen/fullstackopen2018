import React from 'react';
import ReactDOM from 'react-dom';
/*
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono:0
    }
      
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button handleclick='this.setState({ hyva: this.state.hyva + 1 })}' text="hyva" />
        <button onClick={() => this.setState({ neutraali: this.state.neutraali + 1 })}>neutraali</button>
        <button onClick={() => this.setState({ huono: this.state.huono + 1 })}>huono</button>
        <h1>Statistiikka</h1>
        <div>hyvä {this.state.hyva}</div>
        <div>neutraali {this.state.neutraali}</div>
        <div>huono {this.state.huono}</div>
        <div>keskiarvo {(this.state.hyva-this.state.huono)/(this.state.hyva+this.state.neutraali+this.state.huono)}</div>
        <div>positiivisa {this.state.hyva/(this.state.hyva+this.state.neutraali+this.state.huono)}</div>
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
*/

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({hyva,neutraali,huono}) => {
    
    if (hyva+neutraali+huono === 0) {
        return (
            <div>
                <p>ei yhtään palautetta annettu</p>
            </div>
        )
    } else {
        return (
            <div>
                <table>
                    <tbody>
                        <Statistic text='hyva' arvo={hyva}/>
                        <Statistic text='neutraali' arvo={neutraali}/>
                        <Statistic text='huono' arvo={huono}/>
                        <Statistic text='keskiarvo' arvo={((hyva-huono)/(hyva+neutraali+huono)).toFixed(1)}/>
                        <Statistic text='positiivisia' arvo={(100*(hyva)/(hyva+neutraali+huono)).toFixed(1) + "%"}/>
                    </tbody>
                </table>
            </div>
        )
    }
    
}

const Statistic = ({text,arvo}) => (
        <tr><td>{text}</td><td>{arvo}</td></tr>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }
  
  click = (nimi,arvo) => {
      return () => {
        this.setState({ [nimi]: arvo })
      }
  }

  render() {
    return (
        <div>
          <h2>anna palautetta</h2>
          <Button handleClick={this.click('hyva',this.state.hyva+1)} text='hyva' />
          <Button handleClick={this.click('neutraali',this.state.neutraali+1)} text='neutraali' />
          <Button handleClick={this.click('huono',this.state.huono+1)} text='huono' />
          <h2>statistiikka</h2>
          <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono}/>
        </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)