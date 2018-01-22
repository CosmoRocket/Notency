import React from 'react'
import './AnnouncementForm.css'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
import FileUpload from '../../components/FileUpload'
import RadioMenu from '../../components/RadioMenu'
import draftToHtml from 'draftjs-to-html'
import { sendEmail } from '../../api/email'
import { Link, withRouter } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Formik } from 'formik'
import Yup from 'yup'
import { groupBy } from 'ramda'
import capitalize from 'lodash/capitalize'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'

function AnnouncementForm({ recipients, handleCreateAnnouncement, history }) {
  if (recipients.length !== 0) {
    return (
      <Formik
        initialValues={{
          subject: '',
          recipients: recipients,
          body: '',
          bodyHtml: '',
          group: 'all',
          nationality: [],
          graduationDate: {},
          role: undefined, // set to undefined so that placeholder will show up
          groups: [],
          attachmentFileName: '',
          attachment: ''
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          handleCreateAnnouncement({
            subject: values.subject,
            bodyHtml: values.bodyHtml,
            groups: values.groups.map(group => group.value),
            recipients: values.recipients
          })
            .then(({ newAnnouncement, announcementData }) => {
              history.push(`/announcements/${newAnnouncement._id}`)
              return { newAnnouncement, announcementData }
            })
            .then(({ announcementData }) => {
              const formData = new FormData()
              formData.append(
                'recipients',
                announcementData.recipients.map(recipient => recipient.email)
              )
              formData.append('subject', announcementData.subject)
              formData.append('text', values.body)
              formData.append('html', announcementData.bodyHtml)
              formData.append('attachment', values.attachment)
              sendEmail(formData)
            })
            .catch(error => {
              console.log('There was an error')
            })
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
              if (groups.length === 0 || category === 'all') {
                return true
              } else if (category === 'graduationDate') {
                return groups.some(
                  group =>
                    moment
                      .utc(recipient['graduationDate'])
                      .format('DD/MM/YYYY') === group.value.item
                )
              } else {
                return groups.some(
                  group =>
                    recipient[category] && recipient[category].toLowerCase() ===
                    group.value.item.toLowerCase()
                )
              }
            })

            setFieldValue('recipients', filteredRecipients)
          }
          const arrangeByNationality = groupBy(
            recipient => recipient.nationality
          )
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
              <div className="d-flex">
                <p className="m-0">To: </p>
                <RadioMenu
                  name="group"
                  options={['All', 'Nationality', 'Role', 'Graduation Date']}
                  selectedValue={values.group}
                  onChange={e => {
                    handleChange(e)
                    if (e.target.value === 'all') {
                      const groups = []
                      setFieldValue('groups', groups)
                      filterRecipients(recipients, 'all', groups)
                    } else if (e.target.value === 'nationality') {
                      const groups = values.nationality
                      setFieldValue('groups', groups)
                      filterRecipients(recipients, 'nationality', groups)
                    } else if (e.target.value === 'role') {
                      const groups = values.role ? [values.role] : []
                      setFieldValue('groups', groups)
                      filterRecipients(recipients, 'role', groups)
                    } else if (e.target.value === 'graduationDate') {
                      const groups = isEmpty(values.graduationDate)
                        ? []
                        : [values.graduationDate]
                      setFieldValue('groups', groups)
                      filterRecipients(recipients, 'graduationDate', groups)
                    }
                  }}
                />
              </div>
              <div className='recipientTally'>Number of Recipients: {values.recipients.length}</div>
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
                    if (selectedValue === null) {
                      selectedValue = undefined
                      setFieldValue('role', selectedValue)
                      setFieldValue('groups', [])
                      filterRecipients(recipients, 'role', [])
                    } else {
                      setFieldValue('role', selectedValue)
                      setFieldValue('groups', [selectedValue])
                      filterRecipients(recipients, 'role', [selectedValue])
                    }
                  }}
                  value={values.role}
                  options={[
                    {
                      value: { name: 'role', item: 'staff' },
                      label: 'Staff'
                    },
                    {
                      value: { name: 'role', item: 'student' },
                      label: 'Student'
                    }
                  ]}
                />
              )}
              {values.group === 'graduationDate' && (
                <Input
                  name="graduationDate"
                  type="date"
                  value={values.graduationDate.label}
                  onChange={e => {
                    const group = {
                      value: {
                        name: 'graduationDate',
                        item: moment
                          .utc(e.target.value, 'YYYY-MM-DD')
                          .format('DD/MM/YYYY')
                      },
                      label: e.target.value
                    }
                    setFieldValue('graduationDate', group)
                    setFieldValue('groups', [group])
                    filterRecipients(recipients, 'graduationDate', [group])
                  }}
                  onBlur={handleBlur}
                />
              )}
              <Input
                name="subject"
                placeholder="Subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  errors.subject && touched.subject && errors.subject
                }
              />
              <Editor
                name="body"
                wrapperClassName="editorSection"
                editorClassName="wrapperSection"
                onContentStateChange={contentState => {
                  const htmlContent = draftToHtml(contentState)
                  setFieldValue('body', htmlContent.replace(/<[^>]+>/g, ''))
                  setFieldValue('bodyHtml', htmlContent)
                }}
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'fontFamily']
                }}
              />
              <FileUpload
                name="attachment"
                onChange={e => {
                  const fileName = e.target.value
                  setFieldValue('attachmentFileName', fileName.slice(fileName.lastIndexOf('\\') + 1))
                  setFieldValue('attachment', e.target.files[0])
                }}
              />
              <div className="file-name">{values.attachmentFileName}</div>
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
  } else {
    return <div>Loading...</div>
  }
}

export default withRouter(AnnouncementForm)
