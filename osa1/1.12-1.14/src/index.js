import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: [-1, 0, 0, 0, 0, 0],
      maxindex: 0
    }
  }

  click = (arvo,array) => {
      let rand = Math.floor(arvo*Math.random());
      console.log(this.state.pisteet)
      return () => {
          this.setState({ selected: rand })
          array[rand]--;
          this.setState({ pisteet: array })
      }
  }
  
  vote = (array,number) => {
      array[number]++;
      let maxindex = 0;
      for (let i = 0; i < 6; i++) {
          if (array[i] > array[maxindex]) {
              maxindex = i;
              console.log(i)
            }
      }
      return () => {
          this.setState({pisteet:array})
          this.setState({maxindex: maxindex})
      }
  }
  
  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <div>
            <button onClick={this.vote(this.state.pisteet,this.state.selected)}>vote</button>
            <button onClick={this.click(anecdotes.length,this.state.pisteet)}>next anecdote</button>
        </div>
        <h2>anecdote with the most votes</h2>
        {this.props.anecdotes[this.state.maxindex]}
        <p>has {Math.max.apply(Math,this.state.pisteet)} votes</p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
