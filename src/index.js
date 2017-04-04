'use strict';

import React from 'react'
import Preview from './preview'
import debounce from 'lodash/debounce'

export const fn = debounce(({ term, display }) => {
  display({
    title: `Weather in ${term}`,
    subtitle: 'Cloudy with a chance of meatballs',
    getPreview: () => <Preview city={term} />
  })
}, 250)
