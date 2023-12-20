const Notification = (props) => {
  console.log(props);

  if (props.errorMessage) {
    return (
      <div className='notification error'>
        {props.errorMessage}
      </div>
    )
  }

  if (props.successMessage) {
    return (
      <div className='notification success'>
        {props.successMessage}
      </div>
    )
  }
}

export default Notification;
