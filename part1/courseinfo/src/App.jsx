const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (part) => {
  console.log(part)
  return (
  <div>
    <p>
      {part.name} {part.exercises}
    </p>
  </div>
  )
}

/* What is the problem now?
i want to divide into 3 parts the array

*/
const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises}></Part>
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises}></Part>
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises}></Part>
    </div>

  )
}


const Footer = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = {course}></Header>
      <Content parts={parts} />
      <Footer parts = {parts} />
      

    </div>

  )
}

export default App


