import {Component} from 'react'
import {v4} from 'uuid'
import Tags from '../Tags'
import TasksCard from '../TasksCard'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Tasks extends Component {
  state = {
    inputText: '',
    activeId: tagsList[0].optionId,
    tasksList: [],
    tag: 'INITIAL',
  }

  onChangeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onChangeActiveId = event => {
    this.setState({activeId: event.target.value})
  }

  addTask = event => {
    event.preventDefault()
    const {tasksList, inputText, activeId} = this.state

    const newTask = {
      id: v4(),
      word: inputText,
      activeTag: activeId,
    }

    if (inputText.length !== 0) {
      this.setState(prev => ({
        tasksList: [...prev.tasksList, newTask],
        inputText: '',
        activeId: tagsList[0].optionId,
      }))
    }

    return tasksList
  }

  clickTag = optionId => {
    this.setState(prev => ({
      tag: prev.tag === optionId ? 'INITIAL' : optionId,
    }))
  }

  renderInputElements = () => {
    const {inputText, activeId} = this.state
    return (
      <form
        className="form-control d-flex flex-column justify-content-center"
        onSubmit={this.addTask}
      >
        <div className="d-flex flex-column mb-2">
          <label htmlFor="Task">Task</label>
          <input
            type="text"
            id="Task"
            value={inputText}
            onChange={this.onChangeInput}
            placeholder="Enter the task here"
          />
        </div>
        <div className="d-flex flex-column mb-2">
          <label htmlFor="Tags">Tags</label>
          <select id="Tags" onChange={this.onChangeActiveId} value={activeId}>
            {tagsList.map(each => (
              <option key={each.optionId} value={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button className="btn btn-primary" type="submit">
            Add Task
          </button>
        </div>
      </form>
    )
  }

  renderTagsElements = () => (
    <div>
      <ul className="d-flex flex-row justify-content-center">
        {tagsList.map(each => (
          <Tags
            tagsValues={each}
            key={each.optionId}
            clickTag={this.clickTag}
          />
        ))}
      </ul>
    </div>
  )

  renderTasksCards = () => {
    const {tasksList, tag} = this.state

    const filtered =
      tag === 'INITIAL'
        ? tasksList
        : tasksList.filter(each => each.activeTag.toUpperCase() === tag)

    return (
      <div>
        <ul>
          {filtered.map(each => (
            <TasksCard taskDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {tasksList} = this.state
    return (
      <div className="d-flex flex-row">
        <div className="d-flex flex-column">
          <h1>Create a task!</h1>
          {this.renderInputElements()}
        </div>
        <div className="">
          <div className="">
            <h1 className="">Tags</h1>
            {this.renderTagsElements()}
          </div>
          <div>
            <h1>Tasks</h1>
            {tasksList.length === 0 ? (
              <p>No Tasks Added Yet</p>
            ) : (
              this.renderTasksCards()
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default Tasks
