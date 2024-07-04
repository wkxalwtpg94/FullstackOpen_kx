const Header = (props) => {
  
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
  <div>
    <p>
      {props.part} {props.exercises}
    </p>
  </div>
  )
}

const Content = (props) => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  return (
    <div>
      <Part part ={part1} exercises={exercises1}></Part>
      <Part part ={part2} exercises={exercises2}></Part>
      <Part part ={part3} exercises={exercises3}></Part>
    </div>

  )
}


const Footer = (props) => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'


  return (
    <div>
      <Header course = {course}></Header>
     <Content></Content>
      <Footer></Footer>
    </div>
  )
}

export default App