import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ProfileClass from "./ProfileClass";
import React from "react";
import UserContext from "../utils/UserContext";
import Burger from "../assets/img/Burger_Img.png";

class About extends React.Component {
	constructor(props) {
		super(props);
		console.log("About Constructor");
		this.state = {
			showProfile: false,
		};
	}
	componentDidMount() {
		console.log("About ComponentDidMount");
	}
	componentDidUpdate(prevProps, prevState) {
		console.log("About ComponentDidUpdate");
	}
	componentWillUnmount() {
		console.log("About ComponentWillUnmount");
	}
	render() {
		console.log("About Render");
		return (
			<div className="body-box about-page">
				<div>
					<h1>About Page</h1>
					<UserContext.Consumer>
						{({ user }) => (
							<h4>
								{user.name} - {user.email}
							</h4>
						)}
					</UserContext.Consumer>
					{this.state.showProfile ? (
						<Link
							to="/about"
							onClick={() => {
								this.setState({ showProfile: false });
							}}
						>
							Hide Profile
						</Link>
					) : (
						<Link
							to="profile"
							onClick={() => {
								this.setState({ showProfile: true });
							}}
						>
							Show Profile
						</Link>
					)}
				</div>
				<div>
					{this.state.showProfile ? (
						<Outlet />
					) : (
						<img className="burger-img" src={Burger} />
					)}
				</div>
			</div>
		);
	}
}
export default About;
