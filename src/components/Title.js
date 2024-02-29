import { Link } from "react-router-dom";
import logo from "../assets/img/Food-Plaza.png";
import { useContext, useState } from "react";
import LocationContext from "../utils/LocationContext";
import CityContext from "../utils/CityContext";
import { handleScrollTop } from "../utils/helper";
const Title = () => {
	const [nearMe, setNearMe] = useState(false);
	// Location Context----------------------------------
	const { setLocation } = useContext(LocationContext);
	const { city } = useContext(CityContext);
	const handlerLocationNear = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position?.coords;
			setLocation({
				latitude: latitude,
				longitude: longitude,
			});
			setNearMe(true);
		});
	};
	const handlerLocationDefault = () => {
		setLocation({
			latitude: 28.7040592, //Delhi
			longitude: 77.1024901,
		});
		setNearMe(false);
	};
	return (
		<div className="title-box" onClick={() => handleScrollTop()}>
			<Link to="/">
				<img className="logo" alt="logo" src={logo} />
			</Link>
			{nearMe ? (
				<div onClick={() => handlerLocationDefault()}>
					<button>Default</button>
					<div className="location-name">
						<i
							className="fa-solid fa-location-dot"
							style={{ color: "#ff8800" }}
						></i>
						<p>{city}</p>
					</div>
				</div>
			) : (
				<div onClick={() => handlerLocationNear()}>
					<button>Near Me!</button>
					<div className="location-name">
						<i
							className="fa-solid fa-location-dot"
							style={{ color: "#ff8800" }}
						></i>
						<p>{city}</p>
					</div>
				</div>
			)}
		</div>
	);
};
export default Title;
