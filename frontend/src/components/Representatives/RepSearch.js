import React from 'react';


const RepSearch = ({ chamber, unitedStates, searchTerm, setSearchTerm, setSelectValue }) => {

  return (
    <div className='rep-search__container'>
      <div className='rep-search__title'>
        Find {chamber} Members
      </div>
      <div className='rep-search__filters'>
        <form>
          <input
            className='rep-search__searchbar'
            name='searchTerm'
            placeholder='Search By Name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
          <select 
          className='rep-search__dropdown'
          onChange={(e) => setSelectValue(e.target.value)}>
            <option value=''>-- select state --</option>
            { unitedStates.map(state => {
              return <option key={`unitedState-${state.id}`} value={state.abbreviation}>
                {state.name}
                </option>
            })}
          </select>
        </form>
      </div>
    </div>
  )
}


export default RepSearch;