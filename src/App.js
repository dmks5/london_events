// App.js
import React, { Component } from 'react';
import './App.css';
import { readRemoteFile } from 'react-papaparse';
import { Typography, Grid, Container } from '@mui/material';
import EventCard from './EventCard';

const DAYS_OF_WEEK = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const EVENT_COLORS = {
  'Мафия': '#FADADD', // light pink
  'Квиз': '#ADD8E6', // light blue
  'Нетворкинг': '#90EE90', // light green
  'Настолки': '#FAFAD2', // light goldenrod yellow
};
const DEFAULT_COLOR = 'lightgrey'; // default color
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTPva1TqjJb1q71rdIyiL8kCTg1ErWP8OWYJQqDLWZhNPP43EechxS7r7mOzKL43En-FHBx0Ql0J0Lp/pub?gid=0&single=true&output=csv';

class App extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    readRemoteFile(CSV_URL, {
      complete: (results) => {
        const jsonData = this.convertArrayToJSON(results.data);
        const sortedFilteredData = this.sortAndFilterEvents(jsonData);
        this.setState({ data: sortedFilteredData });
      },
    });
  }

  convertArrayToJSON(array) {
    const [headers, ...rows] = array;
    return rows.map(row => headers.reduce((obj, header, index) => {
      obj[header] = row[index] || '';
      return obj;
    }, {}));
  }

  sortAndFilterEvents(events) {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    return events.reduce((filteredEvents, event) => {
      const date = this.parseEventDate(event['Дата'], event['Время']);
      if (!date || date < currentDate) return filteredEvents;
      filteredEvents.push({
        ...event,
        dateObject: date,
        dayOfWeek: DAYS_OF_WEEK[date.getDay()],
        displayTime: this.formatDisplayTime(event['Время']),
        eventTypeColor: this.getEventTypeColor(event['Тип']),
      });
      return filteredEvents;
    }, []).sort((a, b) => a.dateObject - b.dateObject);
  }

  parseEventDate(dateString, timeString) {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    const [hours, minutes, seconds = '00'] = (timeString ? timeString.split(':') : ['00', '00']);
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    return date;
  }

  formatDisplayTime(timeString) {
    return timeString ? timeString.split(':').slice(0, 2).join(':') : '00:00';
  }

  getEventTypeColor(eventType) {
    return eventType ? EVENT_COLORS[Object.keys(EVENT_COLORS).find(key => eventType.toLowerCase().startsWith(key.toLowerCase()))] || DEFAULT_COLOR : DEFAULT_COLOR;
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem',
            fontSize: { xs: '1.5rem', sm: '2.125rem' },
          }}
        >
          Kommunity Events
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {this.state.data.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default App;
