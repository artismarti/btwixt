import React from 'react'

const SuggestedLocation = ({ midpoint }) => {
  return (
    <div className={'info_card suggested_location'}>
      <p>Suggested Location:</p>
      <a
        href={`https://www.google.co.uk/maps/search/${midpoint}`}
        target="_blank"
      >
        {midpoint}
      </a>
    </div>
  )
}

export default SuggestedLocation
