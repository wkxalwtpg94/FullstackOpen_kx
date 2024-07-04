let t = [1,2,3]

let t_new = t.map(function (a) {
    return a*a
})

console.log(t_new)


let alternative_t = t.map((x) => {
    return x*x
})

console.log(alternative_t)





const Content = (props) => {
    console.log(props)
    return (
      <div>
        <Part name={props.course.parts[0].name} exercises={props.course.parts[0].exercises}></Part>
  
    )
  }