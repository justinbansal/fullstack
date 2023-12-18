const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const result = parts.map(part => <Part part={part} key={part.id}/>);
  return (
    <>
      {result}
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      },
      {
        name: 'Redux',
        exercises: 10,
        id: 4
      }
    ]
  }

  const Course = ({ course }) => {
    const total = course.parts.reduce((sum, part) => {
      return sum + part.exercises;
    }, 0);
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={total}/>
      </>
    )
  }

  return <Course course={course} />
}

export default App
