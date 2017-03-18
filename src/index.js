'use strict';

import React from 'react'
import Preview from './preview'

export const fn = ({ term, display }) => {
  display({
    title: `Weather in ${term}`,
    subtitle: 'Cloudy with a chance of meatballs',
    getPreview: () => <Preview city={term} />
  })
}
