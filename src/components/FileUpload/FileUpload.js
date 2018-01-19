import React from 'react'
import './FileUpload.css'

const FileUpload = ({ name, onChange }) => {
  return (
    <div className="mt-2">
      <label htmlFor={name} className="btn btn-dark btn-file btn-contacts">
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
  )
}

export default FileUpload
