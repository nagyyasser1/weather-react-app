import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { geoApiOptions, GEU_API_URL } from '../api'

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null)

  const handleChange = (searchData) => {
    setSearch(searchData)
    onSearchChange(searchData)
  }

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEU_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions,
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode} `,
            }
          }),
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <AsyncPaginate
        placeholder={'Search for city'}
        value={search}
        debounceTimeout={600}
        onChange={handleChange}
        loadOptions={loadOptions}
      />
    </div>
  )
}

export default Search
