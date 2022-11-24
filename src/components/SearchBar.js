import { useState } from "react";

function SearchBar({searchByName}){
  const [name,setName]=useState('')

  const handleChange = (e) =>{
    setName(e.target.value)
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    searchByName(name)
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={handleChange} placeholder={"이름으로 검색하세요"}/>
            <button className="search-button" onClick={handleSubmit}>검색</button>
        </form>
    </div>
  )
}

export default SearchBar