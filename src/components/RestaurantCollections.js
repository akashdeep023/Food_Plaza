import { IMG_INFO_URL } from "../constant";

const RestaurantCollections = (restaurantinfo) => {
	const { imageId } = restaurantinfo;
	return (
		<div className="info-img-box">
			<img className="info-img" src={IMG_INFO_URL + imageId}></img>
		</div>
	);
};
export default RestaurantCollections;
