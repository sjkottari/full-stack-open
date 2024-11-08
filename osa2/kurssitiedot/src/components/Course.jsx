const Header = ({ name }) => (
  <div>
      <h2>{name}</h2>
  </div>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = ({ part }) => (
  <div>
    <p>
      {part.name} {part.exercises}
    </p>
  </div>
)

const Total = ({ parts }) => (
  <div>
    <b>Total of {parts.reduce((sum, part) =>
      sum + part.exercises, 0
    )} exercises</b>
  </div>
)

const Course = ({ courses }) => (
  <div>
    {courses.map(course =>
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )}
  </div>
)

export default Course
