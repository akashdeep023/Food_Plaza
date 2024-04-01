import RestaurantCard from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useAllRestaurants from "../utils/useAllRestaurants";
import Search from "./Search";
import useOnline from "../utils/useOnline";
import RestaurantCollections from "./RestaurantCollections";
import Filter from "./Filter";
import {
	IMG_NOT_FOUND_URL,
	IMG_OFFLINE_URL,
	IMG_RESTAURANT_NOT_URL,
} from "../constant";
import { handleScrollTop } from "../utils/helper";

window.addEventListener("DOMContentLoaded", function () {
	window.scrollTo(0, 0);
});

const Body = () => {
	const [allRestaurants, filteredRestaurants, setFilteredRestaurants] =
		useAllRestaurants();
	const [againApiCall, setAgainApiCall] = useState(false);
	const [extraRestsData, setExtraRestsData] = useState(null);
	const [showExtraData, setShowExtraData] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const viewportHeight = window.innerHeight;
			const documentHeight = document.body.scrollHeight;
			const distanceFromBottom =
				documentHeight - (scrollPosition + viewportHeight);
			if (!againApiCall && allRestaurants != null) {
				if (distanceFromBottom <= 400) {
					setExtraRestsData([]);
					setAgainApiCall(true);
					setTimeout(() => {
						setExtraRestsData(allRestaurants[7]);
					}, 2000);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [againApiCall, allRestaurants]);

	const isOnline = useOnline();
	if (!isOnline) {
		return (
			<div className="offline-page">
				<img alt="url img" src={IMG_OFFLINE_URL} />
				<h2>Oops! You're Offline</h2>
				<p>Please check your internet connection and try again.</p>
			</div>
		);
	}
	if (!allRestaurants) {
		return (
			<div className="body-box res-not-page">
				<img src={IMG_RESTAURANT_NOT_URL} />
				<h3 className="">Data Not Found.</h3>
				<p>Something went wrong.</p>
				<a href="/">
					<button>TRY AGAIN</button>
				</a>
			</div>
		);
	}
	if (allRestaurants[6]) {
		return (
			<div className="body-box unservice-page">
				<img src={allRestaurants[6]?.imageLink} />
				<h3 className="">{allRestaurants[6]?.title}</h3>
				<p>We don’t have any services here till now.</p>
				<p>Try changing location.</p>
			</div>
		);
	}
	const scrollHandler = (idx, direction) => {
		const box = document.querySelectorAll(".topBrand")[idx];
		if (direction == "left") {
			box.scrollLeft += -(box.clientWidth - box.clientWidth * 0.15);
		} else {
			box.scrollLeft += box.clientWidth - box.clientWidth * 0.15;
		}
	};
	return allRestaurants?.length == 0 ? (
		<Shimmer />
	) : (
		<>
			<div className="body-box-res body-box">
				{allRestaurants[0] != undefined ? (
					<div className="main-header-box">
						<h2 className="main-card-title">
							<span>{allRestaurants[0]?.title}</span>
							<div className="scr-btn">
								<span
									onClick={(e) => {
										scrollHandler(0, "left");
									}}
								>
									<i className="fa-solid fa-arrow-left"></i>
								</span>
								&nbsp;&nbsp;
								<span
									onClick={(e) => {
										scrollHandler(0, "right");
									}}
								>
									<i className="fa-solid fa-arrow-right"></i>
								</span>
							</div>
						</h2>
						<div className="topBrand">
							{allRestaurants[1].map((info) => {
								return (
									<Link
										to={
											"/collections/" +
											info?.action?.link
												?.split("=")[1]
												?.split("&")[0]
										}
										key={"collections" + info?.id}
										onClick={() => handleScrollTop()}
									>
										<RestaurantCollections {...info} />
									</Link>
								);
							})}{" "}
						</div>
						<hr className="topBrandHr" />
					</div>
				) : null}
				{allRestaurants[2] != undefined ? (
					<div className="main-header-box">
						<h2 className="main-card-title">
							<span>{allRestaurants[2]?.title}</span>
							<div>
								<span
									onClick={(e) => {
										scrollHandler(1, "left");
									}}
								>
									<i className="fa-solid fa-arrow-left"></i>
								</span>
								&nbsp;&nbsp;
								<span
									onClick={(e) => {
										scrollHandler(1, "right");
									}}
								>
									<i className="fa-solid fa-arrow-right"></i>
								</span>
							</div>
						</h2>
						<div className="topBrand">
							{allRestaurants[3].map((restaurant) => {
								return (
									<Link
										to={"/restaurant/" + restaurant.info.id}
										key={"allres" + restaurant.info.id}
										onClick={() => handleScrollTop()}
									>
										<RestaurantCard {...restaurant.info} />
									</Link>
								);
							})}
						</div>
						<hr className="topBrandHr" />
					</div>
				) : null}
				<div className="main-header-box">
					<h2 className="main-card-title">
						{allRestaurants[4]?.title}
					</h2>
					<div className="main-header-filter">
						<Search
							allRestaurants={allRestaurants[5]}
							setFilteredRestaurants={setFilteredRestaurants}
							setShowExtraData={setShowExtraData}
						/>
						<Filter
							Restaurant={allRestaurants[5]}
							setRestaurant={setFilteredRestaurants}
							setShowExtraData={setShowExtraData}
						/>
					</div>
					{filteredRestaurants?.length != 0 ? (
						<div className="main-card">
							{filteredRestaurants?.map((restaurant) => {
								return (
									<Link
										to={
											"/restaurant/" +
											restaurant?.info?.id
										}
										key={"filter" + restaurant?.info?.id}
										onClick={() => handleScrollTop()}
									>
										<RestaurantCard {...restaurant.info} />
									</Link>
								);
							})}
							{showExtraData &&
								(!extraRestsData
									? null
									: extraRestsData.length == 0
									? Array(allRestaurants[7]?.length)
											.fill("")
											.map((elem, idx) => {
												return (
													<div
														className="shimmer card"
														key={
															"shimmer-menu" + idx
														}
													>
														<div className="img-box img-shimmer"></div>
														<div className="box-shimmer big-shimmer"></div>
														<div className="box-shimmer"></div>
														<div className="box-shimmer"></div>
														<div className="box-shimmer"></div>
													</div>
												);
											})
									: extraRestsData?.map((restaurant) => {
											return (
												<Link
													to={
														"/restaurant/" +
														restaurant?.info?.id
													}
													key={
														"filters" +
														restaurant?.info?.id
													}
													onClick={() =>
														handleScrollTop()
													}
												>
													<RestaurantCard
														{...restaurant.info}
													/>
												</Link>
											);
									  }))}
						</div>
					) : (
						<div className="body-box search-empty">
							<p>No Restaurant Found !!</p>
							<img src={IMG_NOT_FOUND_URL} />
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default Body;
