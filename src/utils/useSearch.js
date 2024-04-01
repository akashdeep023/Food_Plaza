import { useContext, useEffect, useState } from "react";
import { FETCH_PRE_SEARCH_URL, FETCH_SEARCH_URL } from "../constant";
import LocationContext from "./LocationContext";

const useSearch = (query) => {
	const [searchPreData, setSearchPreData] = useState([]);
	const [searchData, setSearchData] = useState(null);

	const { location } = useContext(LocationContext);
	useEffect(() => {
		getPreSearch();
	}, []);
	const getPreSearch = async function () {
		const data = await fetch(
			FETCH_PRE_SEARCH_URL +
				"lat=" +
				location.latitude +
				"%26lng=" +
				location.longitude
		);
		const json = await data.json();
		setSearchPreData(
			json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
				?.info || []
		);
	};

	useEffect(() => {
		getSearchData(query);
	}, [query]);
	const getSearchData = async function (query) {
		if (query?.trim() == "") {
			setSearchData([]);
			return;
		}
		const data = await fetch(
			FETCH_SEARCH_URL +
				"%26lat=" +
				location.latitude +
				"%26lng=" +
				location.longitude +
				"%26str=" +
				query
		);
		const json = await data.json();
		const selectedData = json?.data?.suggestions?.filter(
			(resData) => resData?.type == "RESTAURANT"
		);
		setSearchData(selectedData || []);
	};
	return [searchData, searchPreData];
};

export default useSearch;
