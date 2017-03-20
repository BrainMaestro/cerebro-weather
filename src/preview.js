import React, { Component, PropTypes } from 'react'
import { getWeather } from './api'
import styles from 'bootstrap/dist/css/bootstrap.css'

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
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(headers).map(header => <th key={header}>{headers[header]}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(headers).map(metric => (
              <td key={metric}>{weather[metric]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    )
  }
}

Preview.propTypes = {
  city: PropTypes.string.isRequired,
}
