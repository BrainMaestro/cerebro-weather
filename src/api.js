import { memoize } from 'cerebro-tools'
import { head, prop, curry, tryCatch } from 'ramda'

const BASE_URL = 'https://www.metaweather.com/api/location'

const lifetime = { maxAge: 1000 * 3600 }

const searchCity = memoize(
  city => fetch(`${BASE_URL}/search/?query=${city}`).then(decode),
  lifetime
)

const getCityWeather = memoize(
  woeid => fetch(`${BASE_URL}/${woeid}`).then(decode),
  lifetime
)

const decode = response => response.json()

export const getWeather = city =>
  searchCity(city)
    .then(head)
    .then(
      tryCatch(prop('woeid'), () =>
        Promise.reject(`Can't find weather for ${city}`)
      )
    )
    .then(getCityWeather)
