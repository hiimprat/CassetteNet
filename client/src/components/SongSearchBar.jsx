import React, { useEffect, useRef, useState } from 'react';
import { songSearch } from '../utils/api';
import { debounce } from 'lodash';
import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from 'react-autocomplete';


function SongSearchBar({ apiToUse, setSelected, toExclude }) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchQuery) return; // don't bother calling api if search is empty
    setLoading(true); // make loading circle appear
    songSearch(apiToUse, searchQuery)
      .then(results => {
        setOptions(results.filter(s => !toExclude.includes(s.id)));
        setLoading(false);
      })
      .catch(err => alert(err));
  }, [searchQuery]);

  const search = (e) => {
    setSearchQuery(e.target.value);
  }

  return (
    <Autocomplete
      getItemValue={item => item.name}
      items={options}
      value={searchQuery}
      renderItem={(item, isHighlighted) => (
        <div style={{cursor: 'pointer'}}>{item.name}</div>
      )}
      onChange={search}
      onSelect={(name, val) => setSelected(val)}
    />
  );
}

export default SongSearchBar;
