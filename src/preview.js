import React, { Component, PropTypes } from 'react'

export default class Preview extends Component {
  render() {
    const { city } = this.props

    return (
      <div>
        {city == 'london' ? 'Endless Rain' : 'Look Outside'}
      </div>
    )
  }
}

Preview.propTypes = {
  city: PropTypes.string.isRequired,
}
