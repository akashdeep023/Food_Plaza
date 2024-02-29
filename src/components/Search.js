import React from "react";
import { useState } from "react";
import { findRestaurants } from "../utils/helper";

const Search = ({
	allRestaurants,
	setFilteredRestaurants,
	setShowExtraData,
}) => {
	const [searchText, setSearchText] = useState("");

	return (
		<div id="search-container">
			<input
				type="text"
				placeholder="Search Restaurant"
				value={searchText}
				onChange={(e) => {
					setSearchText(e.target.value);
					const data = findRestaurants(
						e.target.value,
						allRestaurants
					);
					setFilteredRestaurants(data);
					setShowExtraData(false);
				}}
			/>
		</div>
	);
};

export default Search;
