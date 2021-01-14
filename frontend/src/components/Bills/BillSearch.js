import React from 'react';


const BillSearch = ({ category, searchTerm, setSearchTerm }) => {

  return (
    <div className='bill-search__container'>
      <div className='bill-search__title'>
        Search {category.title}
      </div>
      <div className='bill-search__filters'>
        <form>
          <input
            className='bill-search__searchbar'
            name='searchTerm'
            placeholder='Search By Keyword'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </form>
      </div>
    </div>
  )
}


export default BillSearch;