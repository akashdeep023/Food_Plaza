import { OFFER_LOGO_URL } from "../constant";

const RestaurantMenuOffer = (offers) => {
	const { offerTag, offerLogo, header, couponCode, description } = offers;
	const idx = offers.idx;
	return (
		<div id="res-menu-offbox" key={"offer" + idx}>
			{offerTag ? (
				<>
					<div className="res-menu-flat">{offerTag}</div>
					<div className="res-menu-flath"></div>
				</>
			) : null}
			<div>
				<h4>
					<img src={OFFER_LOGO_URL + offerLogo} />
					{header}
				</h4>
				<div>
					<h5>
						{couponCode} |&nbsp;
						{description}
					</h5>
				</div>
			</div>
		</div>
	);
};
export default RestaurantMenuOffer;
