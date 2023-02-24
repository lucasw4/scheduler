# Interview Scheduler

## Description

The Interview Scheduler app is a Single Page Application built with React. This application allows users to create, edit and delete appointments for different days.

This application uses a backend API running on Express, and a database using PostgreSQL to manage the data. It's also built using best practices with Test Driven Development, Unit Testing, Integration Testing and End to End Testing.

This application was finished by Lucas Sahota, as part of his studies at the Lighthouse Labs bootcamp.

## Features

- Book appointments from 12pm to 3pm Monday through Friday
- Edit and delete appointments
- Displays number of appointment spots left for each day

### Demo

##### Home Page

![Home page](https://github.com/lucasw4/scheduler/blob/master/docs/day-view.png?raw=true)

##### Booking an Appointment

![Booking an appointment](https://github.com/lucasw4/scheduler/blob/master/docs/booking-appointment.png?raw=true)

## Setup

- Fork and clone this project
- Open your terminal and cd into the root directory for this project
- Install dependencies with `npm install`
- ** For full functionality you must also setup the API **
- To setup the API:
  - Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) project into a seperate folder
  - Follow the README in that project to setup the API
- Ensure the API is running and then run `npm start` in the terminal
- Navigate to the [localhost](http://localhost:8000/)

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

### Dependencies

- @babel/core@7.9.0
- @storybook/addon-actions@5.0.10
- @storybook/addon-backgrounds@5.0.10
- @storybook/addon-links@5.0.10
- @storybook/addons@5.0.10
- @storybook/react@5.0.10
- @testing-library/jest-dom@4.0.0
- @testing-library/react@8.0.7
- @testing-library/react-hooks@8.0.1
- axios@1.3.2
- babel-loader@8.1.0- classnames@2.2.6
- normalize.css@8.0.1
- prop-types@15.8.1
- react@16.9.0
- react-dom@16.9.0
- react-scripts@3.4.4
- react-test-renderer@16.9.0
- sass@1.53.0
