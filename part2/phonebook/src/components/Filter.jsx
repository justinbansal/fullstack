const Filter = (props) => {
  return (
    <div>
      filter shown with <input type="text" onChange={props.handleFilterChange}/>
    </div>
  )
}

export default Filter;
