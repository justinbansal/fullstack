const Add = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input onChange={props.handleChange}/>
      </div>
      <div>
        number: <input type="tel" onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Add;
