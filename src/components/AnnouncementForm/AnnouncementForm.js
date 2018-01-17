import React from 'react'
import './AnnouncementForm.css'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import RadioMenu from '../../components/RadioMenu'
import draftToHtml from 'draftjs-to-html'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Formik } from 'formik'
import Yup from 'yup'
import { groupBy } from 'ramda'
import capitalize from 'lodash/capitalize'

export default function AnnouncementForm({
  subject,
  handleContentStateChange,
  contentState
}) {
  return (
    <Formik
      initialValues={{
        subject: '',
        body: '',
        group: 'all',
        nationality: []
      }}
      validationSchema={Yup.object().shape({
        subject: Yup.string().required('Please enter a subject'),
        body: Yup.string().required('Please enter a message')
      })}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => {
        const arrangeByNationality = groupBy(recipient => recipient.nationality)
        const nationalities =
          recipients &&
          Object.keys(arrangeByNationality(recipients)).map(nationality => {
            return { value: nationality, label: capitalize(nationality) }
          })
  
          return (
            <form
              onSubmit={event => {
                event.preventDefault()
        
                const subject = event.target.elements.subject.value
                const contentData = draftToHtml(contentState)
        
                const announcement = {
                  subject: subject,
                  contentData: contentData
                }
        
                this.handleCreateAnnouncement(announcement)
              }}
            >
              {/* RADIO BUTTONS - select all or by group */}
              <div className="d-flex">
                <p className="m-0">To: </p>
                <RadioMenu
                  name="group"
                  options={['All', 'Nationality', 'Role']}
                  onChange={handleChange}
                />
              </div>
              {values.group === 'nationality' && (
                <ReactSelect
                  name="nationality"
                  placeholder="Select a nationality"
                  onChange={selectedValue =>
                    setFieldValue('nationality', selectedValue)
                  }
                  value={values.nationality}
                  multi={true}
                  options={nationalities}
                />
              )}
              {values.group === 'role' && (
                <ReactSelect
                  name="role"
                  placeholder="Select a role"
                  onChange={selectedValue => setFieldValue('role', selectedValue)}
                  value={values.role}
                  options={[
                    { value: 'teacher', label: 'Teacher' },
                    { value: 'student', label: 'Student' }
                  ]}
                />
              )}
              {/* INPUT FOR EMAIL SUBJECT */}
              <Input
                name="subject"
                placeholder="Subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.subject && touched.subject && errors.subject}
              />
              {/* REACT CONTENT EDITOR (pass in options as props) */}
              <Editor
                wrapperClassName="editorSection"
                editorClassName="wrapperSection"
                handleContentStateChange={handleContentStateChange}
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'fontFamily']
                }}
              />
              {/* BOTTOM BUTTONS */}
              <div className="formActions">
                <Link className="formBack" to="/">
                  Back
                </Link>
                <p
                  className={`char-length ${values.body.length === 160 &&
                    'char-limit-reached'}`}
                >
                  Characters used: {values.body.length}/160
                </p>
                <Button className="sendButton" text="SEND" />
              </div>
            </form>
          )
        }}
      />
    )
  }