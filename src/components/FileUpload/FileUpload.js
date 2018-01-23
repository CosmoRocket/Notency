import React from 'react'
import './FileUpload.css'

const FileUpload = ({ name, onChange, fileName }) => {
  return (
    <div className="mb-3 mb-md-0 d-sm-flex align-items-center">
      <div>
        <label
          htmlFor={name}
          className="btn btn-dark btn-file btn-contacts m-0"
        >
          Attachment
        </label>
        <input
          type="file"
          id={name}
          name={name}
          className="d-none"
          onChange={onChange}
        />
      </div>
      <div className="ml-3">{fileName}</div>
    </div>
  )
}

export default FileUpload
