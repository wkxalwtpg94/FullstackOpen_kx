const Header = (props) => {
  
  return (
    <div>
      <h1>{props.course}</h1>
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
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3} 
      </p>
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