const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => {
    console.log(sum)

    let totalSum = sum.reduce(((previousValue,currentValue)=> previousValue + currentValue.exercises), 0)

    return (
    <p>
      Number of exercises {totalSum}
    </p>
    )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (<p key = {part.id}>{part.name} {part.exercises}</p>))}
    </div>
  )
}

const Course = (props) => {
  return (
  <div>
    <Header course = {props.course.name}></Header>
    <Content parts = {props.course.parts}></Content>
    <Total sum = {props.course.parts}></Total>
    
    
  </div>
  )
}

export default Course