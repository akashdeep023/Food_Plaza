import { useState, useEffect, useContext } from "react";
import { FETCH_INFO_URL } from "../constant";
import LocationContext from "./LocationContext";

const useCollections = (resId) => {
	const [restaurant, setRestaurant] = useState(null);

	const { location } = useContext(LocationContext);
	useEffect(() => {
		getCollection();
	}, []);
	const getCollection = async () => {
		try {
			const data = await fetch(
				FETCH_INFO_URL +
					resId +
					"%26lat=" +
					location.latitude +
					"%26lng=" +
					location.longitude
			);
			const json = await data.json();
			const restInfo = json?.data?.cards;
			setRestaurant(restInfo);
		} catch (err) {
			console.log(err);
			setRestaurant(null);
		}
	};
	return restaurant;
};

export default useCollections;
