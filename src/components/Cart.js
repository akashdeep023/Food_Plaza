import { useDispatch, useSelector } from "react-redux";
import CartInfo from "./CartInfo";
import { clearCart } from "../utils/cartSlice";
import { useEffect, useState } from "react";
import CartEmpty from "../assets/img/Cart-empty.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { handleScrollTop } from "../utils/helper";

const Cart = () => {
	const [contact, setContect] = useState(false);
	const [pay, setPay] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const cartItems = useSelector((store) => store.cart);
	useEffect(() => {
		setTotalPrice(
			cartItems?.items?.reduce(
				(sum, item) =>
					sum + (item[0]?.defaultPrice || item[0]?.price) * item[1],
				0
			)
		);
	});
	const handleSound = () => {
		const audio = document.getElementById("payment-sound");
		audio.play();
		console.log(audio);
	};
	const dispatch = useDispatch();
	const clearFoodItems = () => {
		dispatch(clearCart());
	};
	return !cartItems.restaurant ? (
		<div className="body-box cart-empty">
			<img src={CartEmpty} />
			<h3>Your cart is empty</h3>
			<p>You can go to home page to view more restaurants</p>
			<Link to="/" onClick={() => handleScrollTop()}>
				<button>SEE RESTAURANTS NEAR YOU</button>
			</Link>
		</div>
	) : (
		<div className="body-box cart-page">
			{pay ? null : (
				<>
					<h1 className="cart-h">Cart</h1>
					<div className="cart-main">
						<div className="cart-rest">
							{cartItems?.restaurant && (
								<img src={cartItems?.restaurant?.imgUrl}></img>
							)}
							<div>
								<h3>{cartItems?.restaurant?.name}</h3>
								<p>{cartItems?.restaurant?.areaName}</p>
							</div>
						</div>
						<div className="cart-box">
							{cartItems?.items?.map((item, idx) => {
								return (
									<CartInfo
										key={"card-box" + idx}
										{...item}
									/>
								);
							})}
						</div>
						<div className="cart-cls-add">
							<button
								className="cart-clear-btn"
								onClick={() => {
									clearFoodItems();
									toast.success("Cart cleared successfully");
								}}
							>
								Clear Cart
							</button>
							<button className="cart-clear-btn">
								<Link
									to={
										"/restaurant/" +
										cartItems?.restaurant?.id
									}
								>
									Add More Items
								</Link>
							</button>
						</div>
						<div className="cart-bills">
							<div className="cart-opt">
								<div className="cart-check">
									<input
										type="checkbox"
										onClick={() => {
											setContect(contact ? false : true);
										}}
									/>
								</div>
								<div>
									<p>Opt in for No-contact Delivery</p>
									{contact ? (
										<p>
											Our delivery partner will call to
											confirm. Please ensure that your
											address has all the required
											details.
										</p>
									) : (
										<p>
											Unwell, or avoiding contact? Please
											select no-contact delivery. Partner
											will safely place the order outside
											your door (not for COD)
										</p>
									)}
								</div>
							</div>
							<p>Bill Details</p>
							<div className="cart-bill-his">
								<p>Item Total</p>
								<p>{"₹" + totalPrice / 100}</p>
							</div>
							<div className="cart-bill-his">
								<p>
									Delivery Fee
									{" | " +
										(cartItems?.restaurant?.distance
											?.lastMileTravelString ?? "2km")}
								</p>
								<p>
									₹
									{(
										(cartItems?.restaurant?.distance
											?.lastMileTravel ?? 2) * 20
									).toFixed(2)}
								</p>
							</div>
							<div className="cart-bill-his">
								<p>GST and Restaurant Charges</p>
								<p>₹{((totalPrice * 5) / 10000).toFixed(2)}</p>
							</div>
							<div className="cart-bill-his to-pay">
								<p>To Pay </p>
								<p>
									₹
									{(
										(totalPrice * 105) / 10000 +
										(cartItems?.restaurant?.distance
											?.lastMileTravel ?? 2) *
											20
									).toFixed(2)}
								</p>
							</div>
						</div>
					</div>
				</>
			)}
			{pay ? (
				<div className="cart-empty">
					<img
						className="payment-success"
						src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/media/7d97855e253a86edc1383557c28412bc.gif"
					></img>
				</div>
			) : (
				<div
					className="pay-now"
					onClick={() => {
						setPay(true);
						handleScrollTop();
						const toastId = toast.loading("Loading...");
						setTimeout(() => {
							toast.dismiss(toastId);
							toast.success("Payment successfully");
							handleSound();
						}, 5500);
						setTimeout(() => {
							handleSound();
						}, 3000);
						setTimeout(() => {
							clearFoodItems();
						}, 6000);
					}}
				>
					Pay Now
				</div>
			)}
		</div>
	);
};

export default Cart;
