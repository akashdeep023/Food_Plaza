import { useRouteError, Link } from "react-router-dom";
import { IMG_ERROR_URL } from "../constant";
const Error = () => {
	const { status, statusText } = useRouteError();
	return (
		<div className="error-page">
			<div>
				<h1>Oops!!</h1>
				<h2>Something went wrong.</h2>
				<h3>{status + " " + statusText}</h3>
				<Link to="/">Back Home</Link>
			</div>
			<div>
				<img className="error-img" src={IMG_ERROR_URL} />
			</div>
		</div>
	);
};
export default Error;
