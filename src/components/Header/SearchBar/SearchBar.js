import React from 'react'
import Search from '../../../assets/search.png'

const SearchBar = () => {
    return (
        <div className='searchBar'>
            <input style={{
                width: "300px",
                height: "50px",
                backgroundColor: "white",
                border: "none"
            }} placeholder='  What are you looking for?' />
            <img src={Search} />
        </div>
    )
}

export default SearchBar