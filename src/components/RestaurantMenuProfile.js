import React from "react";
import { IMG_URL } from "../constant";

const RestaurantMenuProfile = (menuProfile) => {
	const {
		name,
		cuisines,
		areaName,
		sla,
		avgRatingString,
		totalRatingsString,
		costForTwoMessage,
		cloudinaryImageId,
	} = menuProfile;
	return (
		<div id="res-menu-box">
			<div id="res-menu-name">
				<div>
					<h3>{name}</h3> <p>{cuisines?.join(", ")}</p>
					<p>
						{areaName}, {sla?.lastMileTravelString}
					</p>
				</div>
				<div>
					<h4 className="rating">
						<i className="fa-solid fa-star"></i>
						{avgRatingString || "-- --"}
					</h4>
					<hr />
					<p className="rating-tot">
						{totalRatingsString || "0+ ratings"}
					</p>
				</div>
			</div>
			<div id="res-menu-price">
				<h4>
					<i className="fa-regular fa-handshake"></i> {sla?.slaString}{" "}
					&nbsp;&nbsp;&nbsp;&nbsp;
					<i className="fa-solid fa-indian-rupee-sign"></i>{" "}
					{costForTwoMessage}
				</h4>
			</div>

			<img id="res-menu-img" src={IMG_URL + cloudinaryImageId} />
		</div>
	);
};

export default RestaurantMenuProfile;
