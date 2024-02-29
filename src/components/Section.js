import { useState } from "react";

const Section = ({ title, description, isVisibal, setIsVisible }) => {
	return (
		<div className="section-box">
			<div>
				<h2 className="section-title">{title}</h2>
				{isVisibal ? (
					<>
						<button
							className="section-btn"
							onClick={() => setIsVisible(false)}
						>
							Hide
						</button>
					</>
				) : (
					<button
						className="section-btn"
						onClick={() => setIsVisible(true)}
					>
						Show
					</button>
				)}
			</div>
			<p className={`section-des ${isVisibal ? "visible" : "hidden"}`}>
				{isVisibal && (
					<div>
						<h4>👋Hello {description.name}</h4>
						<p>{description.description}</p>
						<button>
							{description.icon}
							<a href={description.link} target="_blank">
								{description.social}
							</a>
						</button>
						<br></br>
						<p>{description.subDescription}</p>
						<p>{description.msg}</p>
						<p>[Akash Deep]</p>
					</div>
				)}
			</p>
		</div>
	);
};
export default Section;
