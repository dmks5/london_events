import React, { Component } from 'react';
import './App.css';
import { readRemoteFile } from 'react-papaparse';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    readRemoteFile('https://docs.google.com/spreadsheets/d/e/2PACX-1vTPva1TqjJb1q71rdIyiL8kCTg1ErWP8OWYJQqDLWZhNPP43EechxS7r7mOzKL43En-FHBx0Ql0J0Lp/pub?gid=0&single=true&output=csv', {
      complete: (results) => {
        const jsonData = this.convertArrayToJSON(results.data);
        const sortedFilteredData = this.sortAndFilterEvents(jsonData);
        this.setState({ data: sortedFilteredData });
      },
    });
  }

  convertArrayToJSON(array) {
    const headers = array[0];
    const data = array.slice(1);
    return data.map(row => {
      let obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
  }

  sortAndFilterEvents(events) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return events
      .map(event => ({
        ...event,
        dateObject: new Date(event['Дата'].split('/').reverse().join('/'))
      }))
      .filter(event => event.dateObject >= currentDate)
      .sort((a, b) => a.dateObject - b.dateObject);
  }

  render() {
    return (
      <Box sx={{ p: 2 }}>
        {this.state.data.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </Box>
    );
  }
}

const EventCard = ({ event }) => {
  const isCancelled = event['Отменено?']?.toLowerCase() === 'да';
  const reason = event['Причина отмены'] || 'Я - Катя и я пиздец ленивая, потому причины отмены сегодня не будет';

  return (
    <Card sx={{
      mb: 2,
      ...(isCancelled && {
        bgcolor: 'error.light',
        color: 'error.contrastText',
      }),
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.paper' }}>
        <Typography sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
          {event.Тип || 'Не указан'}
        </Typography>
        <Typography variant="body2" component="p">
          {event.Дата}
        </Typography>
      </Box>
      <CardContent>
        <Typography color="textSecondary">
          {event.Описание || 'Нет описания'}
        </Typography>
        <Typography variant="body2" component="p">
          Адрес: {event['Ссылка на карту'] ? <Link href={event['Ссылка на карту']} target="_blank">{event['Адрес по-человечески']}</Link> : 'Адрес не указан'}
        </Typography>
        {isCancelled && (
          <Typography color="error" variant="body2">
            Отменено: {reason}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default App;
