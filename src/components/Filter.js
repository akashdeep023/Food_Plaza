import { useState } from "react";
import {
	findRestaurantsFast,
	findRestaurantsOffer,
	findRestaurantsRating,
	findRestaurantsVeg,
	findRestaurantsLess300,
	findRestaurants300to600,
} from "../utils/helper";

const Filter = ({ Restaurant, setRestaurant, setShowExtraData }) => {
	const [filter, setFilter] = useState("jack");
	return (
		<>
			<button
				onClick={() => {
					findRestaurantsFast(
						Restaurant,
						setRestaurant,
						"Fast",
						filter,
						setFilter
					);
					setShowExtraData(false);
				}}
				id={filter == "Fast" ? "filterSelected" : ""}
			>
				Fast Delivery
				{filter == "Fast" && <i className="fa-solid fa-xmark"></i>}
			</button>
			<button
				onClick={() => {
					findRestaurantsRating(
						Restaurant,
						setRestaurant,
						"Rating",
						filter,
						setFilter,
						setShowExtraData
					);
					setShowExtraData(false);
				}}
				id={filter == "Rating" ? "filterSelected" : ""}
			>
				Ratings 4.0+
				{filter == "Rating" && <i className="fa-solid fa-xmark"></i>}
			</button>
			<button
				onClick={() => {
					findRestaurantsOffer(
						Restaurant,
						setRestaurant,
						"Offer",
						filter,
						setFilter,
						setShowExtraData
					);
					setShowExtraData(false);
				}}
				id={filter == "Offer" ? "filterSelected" : ""}
			>
				Offers
				{filter == "Offer" && <i className="fa-solid fa-xmark"></i>}
			</button>
			<button
				onClick={() => {
					findRestaurantsVeg(
						Restaurant,
						setRestaurant,
						"Veg",
						filter,
						setFilter,
						setShowExtraData
					);
					setShowExtraData(false);
				}}
				id={filter == "Veg" ? "filterSelected" : ""}
			>
				Pure Veg
				{filter == "Veg" && <i className="fa-solid fa-xmark"></i>}
			</button>
			<button
				onClick={() => {
					findRestaurantsLess300(
						Restaurant,
						setRestaurant,
						"less300",
						filter,
						setFilter,
						setShowExtraData
					);
					setShowExtraData(false);
				}}
				id={filter == "less300" ? "filterSelected" : ""}
			>
				Less then Rs.300
				{filter == "less300" && <i className="fa-solid fa-xmark"></i>}
			</button>
			<button
				onClick={() => {
					findRestaurants300to600(
						Restaurant,
						setRestaurant,
						"300to600",
						filter,
						setFilter,
						setShowExtraData
					);
					setShowExtraData(false);
				}}
				id={filter == "300to600" ? "filterSelected" : ""}
			>
				Rs.300-Rs.600
				{filter == "300to600" && <i className="fa-solid fa-xmark"></i>}
			</button>
		</>
	);
};
export default Filter;
