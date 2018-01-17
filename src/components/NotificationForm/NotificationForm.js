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
import { createNotification } from '../../api/notifications'
import { reject } from 'ramda'

export default function NotificationForm({ recipients }) {
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
      validationSchema={Yup.object().shape({
        code: Yup.string().required('Please enter a 3-digit code'),
        subject: Yup.string().required('Please enter a subject'),
        body: Yup.string().required('Please enter a message')
      })}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        createNotification(values).then(
          notification => {
            setSubmitting(false)
            return notification
          },
          errors => {
            setSubmitting(false)
          }
        )
      }}
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
