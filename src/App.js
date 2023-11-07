import React, { Component } from 'react';
import './App.css';
import { readRemoteFile } from 'react-papaparse';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

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
        console.log('Data has been loaded:', results.data);
        this.setState({ data: results.data });
      },
    });
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
      p: 2,
      ...(isCancelled && {
        bgcolor: 'error.light',
        color: 'error.contrastText',
      }),
    }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {event.Дата}
        </Typography>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>
          {event.Описание || 'Нет описания'}
        </Typography>
        <Typography variant="body2" component="p" sx={{ mb: 2 }}>
          Адрес: {event['Ссылка на карту'] ? <Link href={event['Ссылка на карту']} target="_blank">{event['Адрес по-человечески']}</Link> : 'Адрес не указан'}
        </Typography>
        <Typography sx={{ float: 'right', textTransform: 'capitalize', mb: 2 }}>
          {event.Тип || 'Не указан'}
        </Typography>
        {isCancelled && (
          <Typography variant="body2">
            Отменено: {reason}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default App;
