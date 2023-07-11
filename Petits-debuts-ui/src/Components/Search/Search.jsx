import * as React from "react"
import "./Search.css"

export default function Search() {
  return (
    <div className="search">
        <div className="row-search">
        
        <input
        className="searchBar"
        type="text"
        placeholder="type here"
        
        
      />
      <button className="searchBarButton">
        Search
      </button>
      <button className="filter-button">
        Filter

      </button>
      
      

            
    
            
        </div>
      
    </div>
  )
}