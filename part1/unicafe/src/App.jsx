import { useState } from 'react'

const Statistics = (props) => {
  if (props.good==0 && props.neutral==0 && props.bad==0) {
    return (
      <div>
      <p></p>
      <p>No feedback given</p>
      </div>
    )
  } else {
  
  return (
  <div>
  <h1>Statistics</h1>
    <table>
      <tbody>
      <tr>
        <td>Good</td>
        <td>{props.good}</td>
      </tr>
      <tr>
        <td>Neutral</td>
        <td>{props.neutral}</td>
      </tr>
      <tr>
        <td>Bad</td>
        <td>{props.bad}</td>
      </tr>
      <tr>
        <td>Total Feedback</td>
        <td>{props.total}</td>
      </tr>
      <tr>
        <td>Average Feedback</td>
        <td>{props.average}</td>
      </tr>
      <tr>
        <td>Percentage Positive Feedback</td>
        <td>{props.percentPositive}</td>
      </tr>
      </tbody>
    </table>
  </div>
  )
    
}
}

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

      <Statistics good={good} neutral ={neutral} bad={bad} total={total} average={average} percentPositive={percentPositive}></Statistics>
    </div>
  )
}

export default App