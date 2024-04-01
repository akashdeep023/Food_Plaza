import { useState, useEffect, useContext } from "react";
import { FETCH_MENU_URL } from "../constant";
import LocationContext from "./LocationContext";

const useRestaurant = (resId) => {
	const [restaurant, setRestaurant] = useState([]);
	const { location } = useContext(LocationContext);
	useEffect(() => {
		getRestaurantMenu();
	}, []);
	const getRestaurantMenu = async () => {
		try {
			const data = await fetch(
				FETCH_MENU_URL +
					resId +
					"%26lat=" +
					location.latitude +
					"%26lng=" +
					location.longitude
			);
			const json = await data.json();
			const restInfo = json?.data?.cards?.find((res) =>
				res?.card?.card["@type"]?.includes("food.v2.Restaurant")
			);
			const restOffer = json?.data?.cards?.find((res) =>
				res?.card?.card?.gridElements?.infoWithStyle["@type"]?.includes(
					"food.v2.OfferInfoWithStyle"
				)
			);
			const restMenus = json?.data?.cards?.find((res) =>
				res?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((menu) =>
					menu?.card?.card["@type"]?.includes("food.v2.ItemCategory")
				)
			);
			setRestaurant({ restInfo, restOffer, restMenus });
		} catch (err) {
			console.log(err);
			setRestaurant(null);
		}
	};
	return restaurant;
};

export default useRestaurant;
