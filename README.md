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

A detailed documentation of our API routes can be found in the [Notency API Readme](https://github.com/CosmoRocket/Notency-api/blob/master/README.md)


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

## How our API works

## Issues

### Tracking SMS responses

How to connect incoming messages to a particular notification? There were two possible solutions: 

1. Generate a short unique code for the student to type in which would link to a notification sent out

2. Have multiple numbers, where a notification is assigned a number and the numbers are rotated through as new notifications are created. The Sent number can then easily be connected to a notification.

We chose the first option, though left open the possibility of adding more numbers through Twilio.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).