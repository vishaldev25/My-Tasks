const TasksCard = props => {
  const {taskDetails} = props
  const {word, activeTag} = taskDetails
  return (
    <li className="d-flex flex-row justify-content-between">
      <p>{word}</p>
      <p>{activeTag}</p>
    </li>
  )
}

export default TasksCard
