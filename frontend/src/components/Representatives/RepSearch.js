import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUnitedStates } from '../../store/states';


const RepSearch = ({ user, reps, chamber }) => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [allStates, setAllStates] = useState([]);

  useEffect(() => {

  }, [])

  return (
    <>
    { !loaded &&
      <div className='rep-search__container'>
        <div className='rep-search__title'>
          Search {chamber} Members
        </div>
        <div className='rep-search__filters'>
          <form class='rep-search__searchbar'>
            <input
              name='searchTerm'
              placeholder='Search By Name'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
            <select>
              <option>-- select state --</option>
              {/* MAP DROPDOWN OPTION FOR STATE IN allSTATES */}
            </select>
          </form>
        </div>
      </div>
    }
    </>
  )
}


export default RepSearch;