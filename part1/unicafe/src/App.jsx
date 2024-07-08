import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Define total, average & percentage good number of feedbacks
  let total = good + neutral + bad
  let average = ((good*1)+(neutral*0)+(bad*(-1)))/total
  let percentPositive = (good/total)*100

  // Define event handler functions
  const goodFeedback = () => {
    console.log("Current level of good", {good})
    setGood(good + 1)
  }

  const neutralFeedback = () => {
    console.log("Current level of neutral", {good})
    setNeutral(neutral + 1)
  }

  const badFeedback = () => {
    console.log("Current level of bad", {good})
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={goodFeedback}>Good</button>
      <button onClick={neutralFeedback}>Neutral</button>
      <button onClick={badFeedback}>Bad</button>

      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>Total feedback {total}</p>
      <p>Average feeback {average}</p>
      <p>Percentage of positive feedback {percentPositive}%</p>
    </div>
  )
}

export default App