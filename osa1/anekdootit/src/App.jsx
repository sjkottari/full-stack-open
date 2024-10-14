import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({anecdote, votes}) => (
  <>
    <div>{anecdote}</div>
    <div>has {votes} votes</div>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [largest, setLargest] = useState(0)

  const randomizeNext = () => {
    // Inspired by https://stackoverflow.com/a/7228322
    const random = Math.floor(Math.random() * ((anecdotes.length - 1) + 1))
    setSelected(random)
  }

  const handleVote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] = points[selected] + 1
    if (pointsCopy[selected] > points[largest]) {
      setLargest(selected)
    }
    setPoints(pointsCopy)
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <Display anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={handleVote} text={"Vote"} />
      <Button handleClick={randomizeNext} text={"Next anecdote"} />
      <h2>Anecdote with most votes</h2>
      <Display anecdote={anecdotes[largest]} votes={points[largest]} />
    </>
  )
}

export default App
