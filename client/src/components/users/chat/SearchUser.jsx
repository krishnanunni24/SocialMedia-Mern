import React from 'react'

function SearchUser({searchTxt,setSearchTxt}) {
    const handleChange=(e)=>{
        setSearchTxt(e.target.value)
    }
  return (
    <div className="border-b px-4 py-4 dark:border-gray-600">
    <div className="input-with-icon rounded-md bg-gray-100 dark:bg-gray-700">
      <input
        id="autocomplete-input"
        type="text"
        value={searchTxt}
        onChange={handleChange}
        placeholder="Search"
        className="max-h-10 bg-transparent p-3 shadow-none outline-none"
      />
      <i className="icon-material-outline-search"></i>
    </div>
  </div>
  )
}

export default SearchUser
