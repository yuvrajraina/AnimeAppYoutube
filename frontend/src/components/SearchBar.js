function SearchBar({ query, setQuery, onSearch}){
    return (
        <form className="search-bar" onSubmit={onSearch}>
            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search anime, for example naruto"
            />
            <button type="submit">search</button>
        </form>
    );
}

export default SearchBar;