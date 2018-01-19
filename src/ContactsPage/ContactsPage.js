import React from 'react'
import './ContactsPage.css'
import Button from '../components/Button'
import FileUpload from '../components/FileUpload'

class ContactsPage extends React.Component {
  state = {
    fileName: 'No file selected',
    csvFile: '',
    successUpload: ''
  }

  onChange = event => {
    let fileName = event.target.value
    fileName = fileName.slice(fileName.lastIndexOf('\\') + 1)
    this.setState({
      fileName: fileName,
      csvFile: event.target.files[0],
      successUpload: ''
    })
  }

  render() {
    const { fileName, csvFile, successUpload } = this.state
    const { onUpload } = this.props

    return (
      <form
        encType="multipart/form-data"
        onSubmit={event => {
          event.preventDefault()
          const formData = new FormData()

          formData.append('description', fileName)
          formData.append('csvFile', csvFile)

          onUpload(formData)
            .then(() => {
              this.setState({ successUpload: 'Successfully uploaded' })
            })
            .catch(error => {
              this.setState({
                successUpload: "Could't upload. Please retry."
              })
            })
        }}
      >
        <FileUpload name="csvFile" onChange={this.onChange} />
        <span className="ml-3 file-name">{fileName}</span>
        <br />
        <Button btnStyle="danger btn-contacts" text="Upload" />
        <span className="ml-3">{successUpload}</span>
      </form>
    )
  }
}

export default ContactsPage
