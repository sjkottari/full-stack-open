const Header = ({name}) => (
  <div>
    <h1>{name}</h1>
  </div>
)

const Content = ({parts}) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = ({part}) => (
  <div>
    <p>
      {part.name} {part.exercises}
    </p>
  </div>
)

const Total = ({parts}) => (
  <div>
    <b>Total of {parts.reduce((sum, part) =>
      sum + part.exercises, 0
    )} exercises</b>
  </div>
)

const Course = ({course}) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
