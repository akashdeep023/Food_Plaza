import toast from "react-hot-toast";
export const findRestaurants = (search, restaurants) => {
	const data = restaurants.filter((restaurant) => {
		return restaurant.info.name
			.toLowerCase()
			.includes(search.toLowerCase());
	});
	return data;
};

export const findRestaurantsFast = (res, setRes, fil, filter, setFilter) => {
	if (fil == filter) {
		setRes(res);
		setFilter("jack");
		toast.success("All Restaurants Display");
	} else {
		setFilter(fil);
		const data = res?.filter(
			(restItem) => restItem?.info?.sla?.deliveryTime <= 25
		);
		setRes(data);
		toast.success("Fast Delivery Restaurants");
	}
};
export const findRestaurantsRating = (res, setRes, fil, filter, setFilter) => {
	if (fil == filter) {
		setRes(res);
		setFilter("jack");
		toast.success("All Restaurants Display");
	} else {
		setFilter(fil);
		const data = res?.filter((restItem) => restItem?.info?.avgRating >= 4);
		setRes(data);
		toast.success("Top Ratings Restaurants");
	}
};
export const findRestaurantsOffer = (res, setRes, fil, filter, setFilter) => {
	if (fil == filter) {
		setRes(res);
		setFilter("jack");
		toast.success("All Restaurants Display");
	} else {
		setFilter(fil);
		const data = res?.filter((restItem) =>
			restItem?.info?.aggregatedDiscountInfoV3?.header?.includes("OFF")
		);
		setRes(data);
		toast.success("Showing Offers Restaurants");
	}
};
// ---------
export const findRestaurantsVeg = (res, setRes, fil, filter, setFilter) => {
	if (fil == filter) {
		setRes(res);
		setFilter("jack");
		toast.success("All Restaurants Display");
	} else {
		setFilter(fil);
		const data = res?.filter((restItem) => restItem?.info?.veg == true);
		setRes(data);
		toast.success("Showing Pure Veg Restaurants");
	}
};
export const findRestaurantsLess300 = (res, setRes, fil, filter, setFilter) => {
	if (fil == filter) {
		setRes(res);
		setFilter("jack");
		toast.success("All Restaurants Display");
	} else {
		setFilter(fil);
		const data = res?.filter(
			(restItem) =>
				restItem?.info?.costForTwo?.includes("200") ||
				restItem?.info?.costForTwo?.includes("250")
		);
		setRes(data);
		toast.success("Budget-Friendly Restaurants");
	}
};
export const findRestaurants300to600 = (
	res,
	setRes,
	fil,
	filter,
	setFilter
) => {
	if (fil == filter) {
		setRes(res);
		setFilter("jack");
		toast.success("All Restaurants Display");
	} else {
		setFilter(fil);
		const data = res?.filter(
			(restItem) =>
				restItem?.info?.costForTwo?.includes("300") ||
				restItem?.info?.costForTwo?.includes("350") ||
				restItem?.info?.costForTwo?.includes("400") ||
				restItem?.info?.costForTwo?.includes("450") ||
				restItem?.info?.costForTwo?.includes("500") ||
				restItem?.info?.costForTwo?.includes("550") ||
				restItem?.info?.costForTwo?.includes("600")
		);
		setRes(data);
		toast.success("Discover Dining Deals: ₹300 - ₹600");
	}
};
export const handleScrollTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};
