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

export default Course;
