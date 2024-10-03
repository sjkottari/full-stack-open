import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good" />
      <Button handleClick={incrementNeutral} text="neutral" />
      <Button handleClick={incrementBad} text="bad" />
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {total}</div>
      <div>average {((1*good)+(0*neutral)+(-1*bad))/total}</div>
      <div>positive {(good/total)*100} %</div>
    </div>
  )
}

export default App
