# NOTENCY

## Our Client

[Embassy English](https://www.embassyenglish.com/) is an organisation that seeks to provide teaching and resources for students learning English. They currently have schools in Australia, New Zealand, Canada, the UK and the USA.

## Our Task

Our client is looking for a web-based dashboard which would allow them to send notifications (via a service like SMS) and email announcements. The notifications are particularly critical, as they would allow the school to confirm the safety of their students in case of an emergency such as a flood. Since entering in each individual student into the system would be impractical, they would like to be able to upload student data via existing files, e.g. an excel spreadsheet containing the students' ids, names, phone numbers etc.

We set out to build a MERN stack application that would achieve these objectives.

## Planning

We took an agile approach to organising our workflow, using trello to collect ideas and manage tasks. 

[Link to our board](https://trello.com/b/Xl2taIie/embassy-english)


## Program flow and Basic ERD

![One-Way Messaging](docs/one-way-messaging.png)

![Two-Way Messaging](docs/two-way-messaging.png)

![Basic ERD](docs/basic-erd.png)

## Wireframing

We made three iterant mock designs, building on the things we liked and the features that we thought worked best for this application. Links to each design can be found on our trello board.

![Desktop Wireframes](docs/desktop-wireframes.png)

![Mobile Wireframes](docs/mobile-wireframes.png)


## Notency API

The [Notency API](https://github.com/CosmoRocket/Notency-api/) is the Node.JS back-end for Notency which uses Express and Mongoose. It was created with test driven development in mind having 100% test coverage and using tools such as Flow and Jest. It also uses the async/await syntax for all its routes and API calls.

Notency API makes use of Twilio for sending text messages and Mailgun for sending e-mail messages. These APIs are the foundation of our Notification and Announcement features as two-way communication is the main goal of the App.

## Setting up Notency API
1. Git clone https://github.com/CosmoRocket/Notency-api.git
2. Create a .env file containing the following keys in the root folder
```
JWT_SECRET =
JWT_ALGORITHM =
JWT_EXPIRES_IN =

TWILIO_ACCOUNT_SID =
TWILIO_AUTH_TOKEN =
TWILIO_NUMBER =
TWILIO_MESSAGING_SERVICE_SID =

MAILGUN_DOMAIN =
MAILGUN_API_KEY =
MAILGUN_PUB_KEY =

MONGO_URI = 
MONGO_TEST_URI = 
```

## Our Test Pipeline
Notency API is built with 100% Test Driven Development coverage

1. Run syntax checker
```
yarn flow
```
2. Run test server
```
yarn test
```
3. Run tests
```
yarn jest
```

## The routes for Notency API

### User

`GET /users`
- Get a list of all users

`GET /users/:id`
- Get a specific user

`POST /users`
- Create a new user
- Request Parameters: `username`, `password`

`DELETE /users/:id`
- Delete a specific user


### Auth

`POST /auth/register`
- Register as a new user
- Request Parameters: `username`, `password`

`POST /auth`
- Sign in as an existing user
- Request Parameters: `username`, `password`


### Recipient

`POST /recipients/search`
- Search for a Recipient using filters
- Request Parameters: `nationality`, `role`, `graduationDate`
```javascript
{
  "nationality": "Australia",
  "role": "Student",
  "graduationDate": "31/12/2018",
  "active": true
}
```

`GET /recipients/active`
- Get a list of all active recipients

`GET /recipients`
- Get a list of all recipients

`GET /recipients`
- Get a specific recipient

`POST /recipients`
- Create a new recipient
- Request Parameters: `idNo`, `firstName`, `lastName`, `role`, `mobile`, `email`, `nationality`, `graduationDate`

`PATCH /recipients/:id`
- Update a recipient
- Request Parameters: `idNo`, `firstName`, `lastName`, `role`, `mobile`, `email`, `nationality`, `graduationDate`

`DELETE /recipients/:id`
- Delete a specific recipient


### Notification

`GET /notifications/latest/:limit`
- Get a number of latest notifications
- Request Parameter: `limit`
```javascript
/notifications/latest/5
```

`GET /notifications`
- Get a list of all notifications

`GET /notifications`
- Get a specific notification

`POST /notifications`
- Create a new notification
- Request Parameters: `code`, `subject`, `body`, `bodyHtml`, `groups`, `recipients`, `responses`, `createdAt`

`PATCH /notifications/:id`
- Update a notification
- Request Parameters: `code`, `subject`, `body`, `bodyHtml`, `groups`, `recipients`, `responses`, `createdAt`

`DELETE /notifications/:id`
- Delete a specific notification



### Announcement

`GET /announcements/latest/:limit`
- Get a number of latest announcements
- Request Parameter: `limit`
```javascript
/announcements/latest/5
```

`GET /announcements`
- Get a list of all announcements

`GET /announcements`
- Get a specific announcement

`POST /announcements`
- Create a new announcement
- Request Parameters: `subject`, `bodyHtml`, `groups`, `recipients`, `createdAt`

`PATCH /announcements/:id`
- Update a announcement
- Request Parameters: `subject`, `bodyHtml`, `groups`, `recipients`, `createdAt``responses`, `createdAt`

`DELETE /announcements/:id`
- Delete a specific announcement



### Message

`GET /messages`
- Get a list of all messages

`GET /messages`
- Get a specific message

`POST /messages`
- Create a new message
- Request Parameters: `sender`, `body`, `createdAt`

`PATCH /messages/:id`
- Update a message
- Request Parameters: `sender`, `body`, `createdAt`

`DELETE /messages/:id`
- Delete a specific message



### SMS

`POST /sms/receive`
- Receive SMS messages and store them in the Notification responses
- Request Parameters: `From`, `Body`
```javascript
{
  From: '+61444888000',
  Body: 'EQ1 OK'
}
```

`POST /sms/send`
- Send SMS messages to a single mobile number
- Request Parameters: `recipient`, `message`
```javascript
{
  recipient: '+61444555555',
  message: 'This is a test notification!'
}
```

`POST /sms/groupSend`
- Send SMS messages to multiple mobile numbers
- Request Parameters: `recipients`, `message`
```javascript
{
  recipients: ['+61444555555', '+61444555552', '+61444555553'],
  message: 'This is a test notification!'
}
```

### E-mail

`POST /email/receive`
- Receive E-mail messages and store them in the Notification responses
- Request Parameters: `sender`, `subject`, `stripped-text`
```javascript
{
  sender: 'somone@example.com',
  subject: 'Re: Hello',
  'stripped-text': 'EQ1 OK'
}
```

`POST /email/send`
- Send E-mail messages to a single or several e-mail addresses
- Request Parameters: `recipients`, `subject`, `text`, `html`
```javascript
{
  recipients: ["someone@example.com"],
  subject: "Hello",
  text: "Testing some Mailgun awesomness!",
  html: "<h1>Testing some Mailgun awesomness!</h1>"
}
```

### File Upload
`POST /upload`
- Upload a CSV file and store data as Recipients
- Request Parameters: `file`


## NPM / Yarn Packages
- mongoose
- express
- react
- body-parser
- nodemon
- dotenv
- axios
- twilio
- mailgun
- exceljs
- react-draft-wysiwyg
- immutable.js
- draft.js
- flow
- jest
- multer
- moment
- ramda

## Issues

### Tracking SMS responses

How to connect incoming messages to a particular notification? There were two possible solutions: 

1. Generate a short unique code for the student to type in which would link to a notification sent out

2. Have multiple numbers, where a notification is assigned a number and the numbers are rotated through as new notifications are created. The Sent number can then easily be connected to a notification.

We chose the first option, though left open the possibility of adding more numbers through Twilio.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).