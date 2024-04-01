import { useState, useEffect, useContext } from "react";
import { FETCH_REST_URL } from "../constant";
import LocationContext from "./LocationContext";
import CityContext from "./CityContext";

const useAllRestaurants = () => {
	const [allRestaurants, setAllRestaurants] = useState([]);
	const [filteredRestaurants, setFilteredRestaurants] = useState(null);
	console.log("Render()");

	const { location } = useContext(LocationContext);
	const { setCity } = useContext(CityContext);
	useEffect(() => {
		console.log("useEffect()");
		// API call
		getRestaurants();
	}, [location]);

	const getRestaurants = async function () {
		try {
			const data = await fetch(
				FETCH_REST_URL +
					"lat=" +
					location.latitude +
					"%26lng=" +
					location.longitude
			);
			const json = await data.json();
			const topBrand = json?.data?.cards?.find((res) =>
				res?.card?.card?.id?.includes("top_brands_for_you")
			);
			const allRests = json?.data?.cards?.find((res) =>
				res?.card?.card?.id?.includes("restaurant_grid_listing")
			);
			const allRestsTitle = json?.data?.cards?.find((res) =>
				res?.card?.card?.id?.includes("popular_restaurants_title")
			);
			const infoLink = json?.data?.cards?.find((res) =>
				res?.card?.card?.id?.includes("whats_on_your_mind")
			);
			const unService = json?.data?.cards?.find((res) =>
				res?.card?.card?.id?.includes("swiggy_not_present")
			);
			const set1 = new Set(
				topBrand?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
					(item) => item.info.id
				)
			);
			const set2 = new Set(
				allRests?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
					(item) => item.info.id
				)
			);
			const combinedSet = new Set([...set1, ...set2]);
			const allTotalRests = Array.from(combinedSet, (id) => {
				const objInArray1 =
					topBrand?.card?.card?.gridElements?.infoWithStyle?.restaurants.find(
						(item) => item.info.id === id
					);
				const objInArray2 =
					allRests?.card?.card?.gridElements?.infoWithStyle?.restaurants.find(
						(item) => item.info.id === id
					);
				return objInArray1 || objInArray2;
			});
			const additionalRests =
				topBrand?.card?.card?.gridElements?.infoWithStyle?.restaurants.filter(
					(item) => !set2.has(item.info.id)
				);
			setCity(
				json?.data?.cards[
					json?.data?.cards.length - 1
				]?.card?.card?.citySlug?.toUpperCase() || ""
			);
			setAllRestaurants([
				infoLink?.card?.card?.header,
				infoLink?.card?.card?.gridElements?.infoWithStyle?.info,
				topBrand?.card?.card?.header, // Top Brand title
				topBrand?.card?.card?.gridElements?.infoWithStyle?.restaurants, //20 items
				allRestsTitle?.card?.card,
				allTotalRests, // 9 items + 20 items
				unService?.card?.card, // unServiceable
				additionalRests || [], //20 items - 9 items
			]);
			setFilteredRestaurants(
				allRests?.card?.card?.gridElements?.infoWithStyle?.restaurants //9 items
			);
		} catch (err) {
			console.log(err);
			setAllRestaurants(null);
		}
	};
	return [allRestaurants, filteredRestaurants, setFilteredRestaurants];
};
export default useAllRestaurants;
