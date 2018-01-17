import React from 'react'
import './ContactsPage.css'
import Button from '../components/Button'

class ContactsPage extends React.Component {
  state = {
    fileName: 'No file uploaded',
    csvFile: '',
  }

  onChange = (event) => {
    this.setState({
      fileName: event.target.value,
      csvFile: event.target.files[0]
    })
  }

  render() {
    const { fileName, csvFile } = this.state;
    const { onUpload } = this.props

    return (
      <form
        encType="multipart/form-data"
        onSubmit={event => {
          const formData = new FormData();

          formData.append('description', fileName);
          formData.append('csvFile', csvFile);

          onUpload(formData)
        }}>
        <label htmlFor='csvFile' className='btn btn-dark btn-file btn-contacts'>Search File</label>
        <input type='file' id='csvFile' name='csvFile' className='d-none' onChange={this.onChange} />
        <span className='ml-3 file-name'>{fileName}</span>
        <br />
        <Button
          btnStyle='danger btn-contacts'
          text='Upload'
        />
      </form>
    )
  }
}

export default ContactsPage