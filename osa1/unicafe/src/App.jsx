import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({feedback, total}) => {

  const average = ((1*feedback.goodCount)+(0*feedback.neutralCount)+(-1*feedback.badCount))/total
  const positivePercentage = (feedback.goodCount/total)*100

  return (
    <>
      <div>good {feedback.goodCount}</div>
      <div>neutral {feedback.neutralCount}</div>
      <div>bad {feedback.badCount}</div>
      <div>all {total}</div>
      <div>average {average}</div>
      <div>positive {positivePercentage} %</div>
    </>
  )
}

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

  const feedback = {
    goodCount: good,
    neutralCount: neutral,
    badCount: bad
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good" />
      <Button handleClick={incrementNeutral} text="neutral" />
      <Button handleClick={incrementBad} text="bad" />
      <h1>statistics</h1>
      <Statistics feedback={feedback} total={total}/>
    </div>
  )
}

export default App
