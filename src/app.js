import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";

const Cart = lazy(() => import("./components/Cart"));

import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import store from "./utils/store";
const RestaurantCollectionsInfo = lazy(() =>
	import("./components/RestaurantCollectionsInfo")
);
import Shimmer from "./components/Shimmer";
import SearchBox from "./components/SearchBox";
import { Toaster } from "react-hot-toast";
import LocationContext from "./utils/LocationContext";
import CityContext from "./utils/CityContext";

const AppLayout = () => {
	const [user, setUser] = useState({
		name: "Akash deep",
		email: "ad3500476@gmail.com",
	});
	const [location, setLocation] = useState({
		latitude: 28.7040592, // Delhi
		longitude: 77.1024901,
	});
	const [city, setCity] = useState("DELHI");
	return (
		<Provider store={store}>
			<UserContext.Provider value={{ user: user, setUser: setUser }}>
				<LocationContext.Provider
					value={{ location: location, setLocation: setLocation }}
				>
					<CityContext.Provider
						value={{ city: city, setCity: setCity }}
					>
						<Toaster
							position="bottot-center"
							reverseOrder={false}
							gutter={30}
							containerClassName="toaster-container"
							toastOptions={{
								className: "toaster-toast",
								duration: 1500,
							}}
						/>
						<Header />
						<Outlet />
						<Footer />
					</CityContext.Provider>
				</LocationContext.Provider>
			</UserContext.Provider>
		</Provider>
	);
};

const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Body />,
			},
			{
				path: "/search",
				element: <SearchBox />,
			},
			{
				path: "/about",
				element: <About />,
				children: [
					{
						path: "profile",
						element: <Profile />,
					},
				],
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "/cart",
				element: (
					<Suspense fallback={<Shimmer />}>
						<Cart />
					</Suspense>
				),
			},
			{
				path: "/restaurant/:resId",
				element: <RestaurantMenu />,
			},
			{
				path: "/collections/:resId",
				element: (
					<Suspense fallback={<Shimmer />}>
						<RestaurantCollectionsInfo />
					</Suspense>
				),
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
