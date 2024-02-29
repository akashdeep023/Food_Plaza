import React from "react";
import { useState } from "react";
import { IMG_SMALL_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCount, increaseCount } from "../utils/cartSlice";
import toast from "react-hot-toast";

function RestaurantMenuInfo(card) {
	const { title, itemCards, resCart } = card;
	const [showMenu, setShowMenu] = useState(true);
	const [showPopUp, setShowPopUp] = useState(false);
	const [popItem, setPopItem] = useState(null);

	// Redux Store --------------------------------
	const itemsCart = useSelector((store) => store.cart);
	const dispatch = useDispatch();
	const addFoodItem = (item) => {
		if (
			itemsCart?.restaurant?.id == undefined ||
			itemsCart?.restaurant?.id == resCart?.id
		) {
			dispatch(addToCart({ item: [item, 1], resCart }));
			toast.success("Item added successfully");
		} else {
			setShowPopUp(true);
			setPopItem(item);
		}
	};

	const PopUp = () => {
		return (
			<>
				<h3>Items already in cart</h3>
				<p>
					Your cart contains items from other restaurant. Would you
					like to reset your cart for adding items from this
					restaurant?
				</p>
				<div>
					<button
						onClick={() => {
							setShowPopUp(false);
						}}
					>
						NO
					</button>
					<button
						onClick={() => {
							dispatch(
								addToCart({ item: [popItem, 1], resCart })
							);
							toast.success("Item added successfully");
							setShowPopUp(false);
						}}
					>
						YES, START AFRESH
					</button>
				</div>
			</>
		);
	};
	const increaseFoodItem = (i) => {
		dispatch(increaseCount(i));
	};
	const removeFoodItem = (i) => {
		dispatch(decreaseCount(i));
	};
	return (
		<div id="res-menu-cardb">
			<div
				className="res-menu-h"
				onClick={() => {
					setShowMenu(showMenu ? false : true);
				}}
			>
				<h4>{title + " (" + itemCards?.length + ")"}</h4>
				{showMenu ? (
					<i className="fa-solid fa-angle-up"></i>
				) : (
					<i className="fa-solid fa-angle-down"></i>
				)}
			</div>
			{showMenu ? (
				<div>
					{itemCards?.map((cardb, index) => {
						return (
							<div id="res-menu-cardele" key={"card" + index}>
								<div>
									{cardb?.card?.info?.itemAttribute
										?.vegClassifier == "VEG" ? (
										<i
											className="fa-regular fa-circle-stop"
											id="item-veg"
										></i>
									) : (
										<i
											className="fa-regular fa-square-caret-up"
											id="item-nonveg"
										></i>
									)}
									<h5>{cardb?.card?.info?.name}</h5>
									<p>
										{"₹" +
											(cardb?.card?.info?.price ??
												cardb?.card?.info
													?.defaultPrice) /
												100}
									</p>
									<p className="card-head">
										{cardb?.card?.info?.description}
									</p>
								</div>
								<div className="menu-img-box">
									{cardb?.card?.info?.imageId ? (
										<img
											className="menu-img"
											src={
												IMG_SMALL_URL +
												cardb?.card?.info?.imageId
											}
										/>
									) : (
										<div className="menu-img"></div>
									)}
									{itemsCart?.items?.filter(
										(item) =>
											item[0]?.id == cardb?.card?.info?.id
									).length == 0 ? (
										<>
											<button
												className="cart-remove-btn item-add"
												id="item-add"
												onClick={() => {
													addFoodItem(
														cardb?.card?.info
													);
												}}
											>
												Add
											</button>
										</>
									) : (
										<span
											className="cart-remove-btn"
											id="item-add"
										>
											<button
												onClick={() => {
													removeFoodItem(
														cardb?.card?.info?.id
													);
													toast.success(
														"Item removed successfully"
													);
												}}
											>
												&minus;
											</button>
											<span>
												{
													itemsCart?.items?.find(
														(item) =>
															item[0]?.id ==
															cardb?.card?.info
																?.id
													)[1]
												}
											</span>
											<button
												onClick={() => {
													increaseFoodItem(
														cardb?.card?.info?.id
													);
													toast.success(
														"Item added successfully"
													);
												}}
											>
												+
											</button>
										</span>
									)}
								</div>
							</div>
						);
					})}
				</div>
			) : null}
			{showPopUp && (
				<div className="popup-page">
					<PopUp />
				</div>
			)}
		</div>
	);
}

export default RestaurantMenuInfo;
