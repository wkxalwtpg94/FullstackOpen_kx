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

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name={props.part1} exercises={props.exercises1}></Part>
      <Part name={props.part2} exercises={props.exercises2}></Part>
      <Part name={props.part3} exercises={props.exercises3}></Part>
    </div>

  )
}


const Footer = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course}></Header>
      <Content 
        part1 = {part1.name} exercises1 = {part1.exercises}
        part2 = {part2.name} exercises2 = {part2.exercises}
        part3 = {part3.name} exercises3 = {part3.exercises}
        ></Content>
      <Footer exercises1 = {part1.exercises} exercises2 = {part2.exercises} exercises3 = {part3.exercises}>
      </Footer>

    </div>

  )
}

export default App


