import { useDispatch, useSelector } from "react-redux";
import { increaseCount, decreaseCount } from "../utils/cartSlice";
import toast from "react-hot-toast";

const CartInfo = (item) => {
	const { name, itemAttribute, price, defaultPrice, id } = item[0];
	const count = item[1];
	const dispatch = useDispatch();
	const addFoodItem = (i) => {
		dispatch(increaseCount(i));
	};
	const removeFoodItem = (i) => {
		dispatch(decreaseCount(i));
	};
	return (
		<div className="cart-info">
			<div>
				{itemAttribute?.vegClassifier == "VEG" ? (
					<i className="fa-regular fa-circle-stop" id="item-veg"></i>
				) : (
					<i
						className="fa-regular fa-square-caret-up"
						id="item-nonveg"
					></i>
				)}
				<p className="cart-info-name">{name}</p>
			</div>
			<div>
				<span className="cart-remove-btn">
					<button
						className=""
						onClick={() => {
							removeFoodItem(item[0].id);
							toast.success("Item removed successfully");
						}}
					>
						&minus;
					</button>
					<span>{count}</span>
					<button
						className=""
						onClick={() => {
							addFoodItem(item[0].id);
							toast.success("Item added successfully");
						}}
					>
						+
					</button>
				</span>
				<p>₹{(count * (price || defaultPrice)) / 100}</p>
			</div>
		</div>
	);
};
export default CartInfo;
