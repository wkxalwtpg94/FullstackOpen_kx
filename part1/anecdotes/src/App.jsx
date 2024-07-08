import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setAll] = useState(new Uint32Array(8))


// Define nextAnecdote event handler function
const nextAnecdote = () => {
  let randomNumber = Math.floor((Math.random() * 8));
  setSelected(randomNumber)
}

// Define Vote event handler function
const votePoints = () => {
  
  const copy = [...points]
  copy[selected] += 1
  setAll(copy)
  
  
}

// Find anecdote with max votes
let max = points[0];
let maximumIndex = 0;
let topAnecdote;
for (let index = 1; index < points.length; index++) {
  if (points[index] > max) {
    max = points[index]
    maximumIndex = index
  }
}
  



  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}

      <p>Current Votes: {points[selected]} votes</p>
      <p>
        <button onClick={votePoints}>Vote</button>
        <button onClick={nextAnecdote}>Next Anecdote</button>
      </p>
      <h1>Anecdote with Most Votes</h1>
      {anecdotes[maximumIndex]}
      <p>Current Votes: {points[maximumIndex]} votes</p>
    </div>
    
  )
}

export default App