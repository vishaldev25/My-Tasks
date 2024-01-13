import './index.css'

const Tags = props => {
  const {tagsValues, clickTag} = props
  const {displayText, optionId} = tagsValues

  const onClickTag = () => {
    clickTag(optionId)
  }
  return (
    <li className="tags-list">
      <button
        type="button"
        className="btn btn-info"
        onClick={onClickTag}
        value={optionId}
      >
        {displayText}
      </button>
    </li>
  )
}

export default Tags
