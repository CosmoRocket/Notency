import React from 'react'
import './NotificationForm.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import RadioMenu from '../../components/RadioMenu'
import ReactSelect from 'react-select'
import 'react-select/dist/react-select.css'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import Yup from 'yup'
import { groupBy } from 'ramda'
import capitalize from 'lodash/capitalize'
import isEmpty from 'lodash/isEmpty'
import { reject } from 'ramda'

export default function NotificationForm({
  recipients,
  handleCreateNotification
}) {
  return (
    <Formik
      initialValues={{
        subject: '',
        code: '',
        body: '',
        bodyHtml: '',
        group: 'all',
        recipients: recipients,
        nationality: [],
        role: undefined,
        groups: []
      }}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        handleCreateNotification({
          code: values.code,
          subject: values.subject,
          body: values.body,
          bodyHtml: values.bodyHtml,
          groups: values.groups.map(group => group.value),
          recipients: values.recipients
        })
      }}
      validationSchema={Yup.object().shape({
        code: Yup.string().required('Please enter a 3-digit code'),
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
            <div className="d-flex">
              <p className="m-0">To: </p>
              <RadioMenu
                name="group"
                options={['All', 'Nationality', 'Role']}
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
                  }
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
                  { value: { name: 'role', item: 'student' }, label: 'Student' }
                ]}
              />
            )}
            <Input
              name="code"
              placeholder="Enter a 3-digit code"
              value={values.code}
              onChange={e => {
                handleChange(e)
                setFieldValue(
                  'body',
                  `Reply with '${e.target.value} OK' if you are safe.`
                )
              }}
              onBlur={handleBlur}
              errorMessage={errors.code && touched.code && errors.code}
            />
            <Input
              name="subject"
              placeholder="Subject"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.subject && touched.subject && errors.subject}
            />
            <TextArea
              name="body"
              id="body"
              rows="10"
              maxLength="160"
              placeholder="Type your message here..."
              value={values.body}
              onChange={e => {
                handleChange(e)
                setFieldValue(
                  'bodyHtml',
                  `<p>${reject(
                    el => el === '',
                    e.target.value.split('\n')
                  ).join('</p><p>')}</p>`
                )
              }}
              onBlur={handleBlur}
              errorMessage={errors.body && touched.body && errors.body}
            />
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
