import React, { Component, PropTypes } from 'react'
import { getWeather } from './api'
import styles from './styles.scss'

const headers = {
  weather_state_abbr: '#',
  weather_state_name: 'State',
  applicable_date: 'Date',
  min_temp: 'Min Temp (c)',
  max_temp: 'Max Temp (c)',
  the_temp: 'Temp (c)',
  humidity: 'Humidity',
}

export default class Preview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null,
      error: null,
    }
  }

  componentDidMount() {
    getWeather(this.props.city)
      .then(weather => this.setState({ weather }))
      .catch(error => this.setState({ error }))
  }

  renderTags() {
    const {
      title: city,
      parent: { title: parentLocation },
    } = this.state.weather
    const locations = [city, parentLocation]
    const badgeStyle = `${styles.badge} ${styles['badge-default']} ${styles['mr-2']}`
    return (
      <div className={styles['tags']}>
        {locations.map(location => (
          <span key={location} className={badgeStyle}>{location}</span>
        ))}
      </div>
    )
  }

  render() {
    if (!this.state.weather && !this.state.error) return <div>Loading...</div>
    else if (this.state.error) return <div>Error: {this.state.error}</div>
    const weatherReports = this.state.weather.consolidated_weather

    return (
      <div className={styles.preview}>
        {this.renderTags()}
        <table className={styles.table}>
          <thead>
            <tr>
              {Object.keys(headers).map(header => (
                <th key={header}>{headers[header]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weatherReports.map((report, index) => (
              <tr key={index}>
                {Object.keys(headers).map(metric => {
                  let value = report[metric]
                  if (typeof value == 'number' && value % 1 != 0) {
                    value = value.toFixed(2)
                  }

                  if (metric == 'weather_state_abbr') {
                    value = (
                      <img
                        src={`https://www.metaweather.com/static/img/weather/${value}.svg`}
                        width="30"
                      />
                    )
                  }

                  return <td key={metric}>{value}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

Preview.propTypes = {
  city: PropTypes.string.isRequired,
}
