import React, { Component, PropTypes } from 'react'
import { getWeather } from './api';

const headers = {
  weather_state_name: 'State',
  applicable_date: 'Date',
  min_temp: 'Min Temp',
  max_temp: 'Max Temp',
  the_temp: 'Temp',
  humidity: 'Humidity',
}

export default class Preview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null,
    }
  }

  componentDidMount() {
    getWeather(this.props.city).then(weather => this.setState({ weather }))
  }

  render() {
    if (! this.state.weather) return <div>Loading...</div>

    const weather = this.state.weather.consolidated_weather[0]

    return (
      <ul>
        {Object.keys(headers).map(metric => (
          <ul key={metric}>{`${headers[metric]}: ${weather[metric]}`}</ul>
        ))}
      </ul>
    )
  }
}

Preview.propTypes = {
  city: PropTypes.string.isRequired,
}
