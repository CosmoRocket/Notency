import React from 'react'
import './ContactsPage.css'
import Button from '../components/Button'
import FileUpload from '../components/FileUpload'
import Recipient from '../components/Recipient'

class ContactsPage extends React.Component {
  state = {
    fileName: 'No file selected',
    csvFile: '',
    successUpload: '',
    error: ''
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
    const { fileName, csvFile, successUpload, error } = this.state
    const { onUpload, recipients } = this.props
    const recipientsList = recipients.map(recipient => {
      return <Recipient key={recipient._id} recipient={recipient} />
    })

    return (
      <form
        encType="multipart/form-data"
        onSubmit={event => {
          event.preventDefault()

          if (!csvFile) {
            this.setState({
              error: 'No file was selected. Please select a file.'
            })
          } else if (!/\.csv$/.test(fileName)) {
            this.setState({
              error:
                'Please make sure the file you have selected has .csv extension.'
            })
          } else {
            const formData = new FormData()
            formData.append('description', fileName)
            formData.append('csvFile', csvFile)

            onUpload(formData)
              .then(() => {
                this.setState({
                  successUpload: 'File was successfully uploaded!'
                })
              })
              .catch(error => {
                this.setState({
                  error
                })
              })
          }
        }}
      >
        <div className="text-center mb-3">
          <FileUpload
            name="csvFile"
            onChange={this.onChange}
            fileName={fileName}
          />
          <Button btnStyle="danger btn-contacts" text="Upload" />
          {successUpload && <div>{successUpload}</div>}
          {error && <div className="error-message">{error}</div>}
        </div>
        {recipientsList}
      </form>
    )
  }
}

export default ContactsPage
