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
  recipients,
  handleCreateAnnouncement
}) {
  return (
    <Formik
      initialValues={{
        subject: '',
        recipients: recipients,
        bodyHtml: '',
        group: 'all',
        nationality: [],
        role: undefined,
        groups: []
      }}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        handleCreateAnnouncement(values)
        console.log(values)
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
        const filterRecipients = (allRecipients, category, groups) => {
          const filteredRecipients = allRecipients.filter(recipient => {
            if (groups.length === 0) {
              return true
            } else {
              return groups.some(
                group => recipient[category] === group.value.item
              )
            }
          })

          setFieldValue('recipients', filteredRecipients)
        }
        const arrangeByNationality = groupBy(recipient => recipient.nationality)
        const nationalities =
          recipients &&
          Object.keys(arrangeByNationality(recipients)).map(nationality => {
            return {
              value: { name: 'nationality', item: nationality },
              label: capitalize(nationality)
            }
          })

        return (
          <form onSubmit={handleSubmit}>
            {/* RADIO BUTTONS - select all or by group */}
            <div className="d-flex">
              <p className="m-0">To: </p>
              <RadioMenu
                name="group"
                options={['All', 'Nationality', 'Role']}
                selectedValue={values.group}
                onChange={e => {
                  handleChange(e)
                  e.target.value === 'all' &&
                    setFieldValue('groups', []) &&
                    filterRecipients(recipients, 'all', [])
                  e.target.value === 'nationality' &&
                    setFieldValue('groups', values.nationality) &&
                    filterRecipients(
                      recipients,
                      'nationality',
                      values.nationality
                    )
                  e.target.value === 'role' &&
                    setFieldValue('groups', values.role ? [] : [values.role]) &&
                    filterRecipients(recipients, 'role', [values.role])
                }}
              />
            </div>
            {values.group === 'nationality' && (
              <ReactSelect
                name="nationality"
                placeholder="Select a nationality"
                onChange={selectedValue => {
                  setFieldValue('nationality', selectedValue)
                  setFieldValue('groups', selectedValue)
                  filterRecipients(recipients, 'nationality', selectedValue)
                }}
                value={values.nationality}
                multi={true}
                options={nationalities}
              />
            )}
            {values.group === 'role' && (
              <ReactSelect
                name="role"
                placeholder="Select a role"
                onChange={selectedValue => {
                  setFieldValue('role', selectedValue)
                  setFieldValue('groups', [selectedValue])
                  filterRecipients(recipients, 'role', [selectedValue])
                }}
                value={values.role}
                options={[
                  {
                    value: { name: 'role', item: 'teacher' },
                    label: 'Teacher'
                  },
                  { value: { name: 'role', item: 'student' }, label: 'Student' }
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
              name="body"
              wrapperClassName="editorSection"
              editorClassName="wrapperSection"
              onContentStateChange={contentState => {
                setFieldValue('body', contentState)
                setFieldValue('bodyHtml', draftToHtml(contentState))
              }}
              toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'fontFamily']
              }}
            />
            {/* BOTTOM BUTTONS */}
            <div className="formActions">
              <Link className="formBack" to="/">
                Back
              </Link>
              <Button className="sendButton" text="SEND" />
            </div>
          </form>
        )
      }}
    />
  )
}
