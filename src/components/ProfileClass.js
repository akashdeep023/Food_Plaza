import { Component } from "react"; //React.Component
class Profile extends Component {
	constructor(props) {
		super(props);
		console.log("Class Cunstructor");
		this.state = {
			count: 0,
			count2: 10,
			userInfo: {
				name: "Akash Deep",
				login: "akashdeep023",
				bio: "WEB - DEVELOPER ( MERN STACK ) | |  JAVA | PYTHON | DSA  |",
				location: "PATNA, BIHAR",
				html_url: "https://github.com/akashdeep023",
				avatar_url:
					"https://avatars.githubusercontent.com/u/126412088?v=4",
				followers: 28,
				following: 5,
			},
		};
	}
	async componentDidMount() {
		console.log("Class ComponentDidMount");
		const data = await fetch("https://api.github.com/users/akashdeep023");
		const json = await data.json();
		console.log(json);
		if (json.name) {
			this.setState({
				userInfo: json,
			});
		}
	}
	componentDidUpdate(prevProps, prevState) {
		console.log("Class ComponentDidUpdate");
		if (this.state.count !== prevProps.count) {
			// something
		}
		if (this.state.count2 !== prevProps.count2) {
			// something
		}
	}
	componentWillUnmount() {
		console.log("Class ComponentWillUnmount");
		// clearInterval(this.timer);
	}
	render() {
		console.log("Class Render");
		return this.state.userInfo == null ? (
			<div>Wait for data</div>
		) : (
			<div>
				<h1>Profile Class Page</h1>
				<a href={this.state.userInfo.html_url} target="_blank">
					Github Link
				</a>
				<h2>
					{this.state.userInfo.name} ({this.state.userInfo.login})
				</h2>
				<h3>{this.state.userInfo.bio}</h3>
				<h3>{this.state.userInfo.location}</h3>
				<h3>
					followers: {this.state.userInfo.followers || "--"} ||
					following: {this.state.userInfo.following || "--"}
				</h3>
				<img src={this.state.userInfo.avatar_url} />
				<br />
				<button
					onClick={() => {
						this.setState({ count: this.state.count + 1 });
					}}
				>
					Count: {this.state.count}
				</button>
			</div>
		);
	}
}

export default Profile;
