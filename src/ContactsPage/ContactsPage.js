import React from 'react'
import './ContactsPage.css'
import Button from '../components/Button'

class ContactsPage extends React.Component {
  state = {
    fileName: 'No file uploaded'
  }

  onChangeFile = (event) => {
    let fileName = event.target.value
    // fileName = fileName.split('/').slice(-1)[0]
    this.setState({
      fileName: fileName
    })

  }
  render() {
    const { fileName } = this.state
    const { onUpload } = this.props

    return (
      <form
        encType="multipart/form-data"
        onSubmit={event => {
          event.preventDefault()

          const form = event.target
          const file = form.csvFile.files
          console.log(file)

          onUpload(file)
        }}>
        <label htmlFor='csvFile' className='btn btn-dark btn-file btn-contacts'>Search File</label>
        <input type='file' id='csvFile' name='csvFile' className='d-none' onChange={this.onChangeFile} />
        <span className='ml-3 file-name'>{fileName}</span>
        <br />
        <Button
          btnStyle='danger btn-contacts'
          text='Upload'
        />
      </form >
    )
  }
}

export default ContactsPage