import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({stats}) => {
  if (stats.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const average = ((1*stats.goodCount)+(0*stats.neutralCount)+(-1*stats.badCount))/stats.total
  const positivePercentage = (stats.goodCount/stats.total)*100
  return (
    <>
      <StatisticLine text="good" value={stats.goodCount} />
      <StatisticLine text="neutral" value={stats.neutralCount} />
      <StatisticLine text="bad" value={stats.badCount} />
      <StatisticLine text="all" value={stats.total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive%" value={positivePercentage} />
    </>
  )
}

const StatisticLine = (props) => (
  <div>
    {props.text} {props.value}
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  const feedback = {
    goodCount: good,
    neutralCount: neutral,
    badCount: bad,
    total: good + neutral + bad
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good" />
      <Button handleClick={incrementNeutral} text="neutral" />
      <Button handleClick={incrementBad} text="bad" />
      <h1>statistics</h1>
      <Statistics stats={feedback}/>
    </div>
  )
}

export default App
