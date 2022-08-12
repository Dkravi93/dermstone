import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../Footer";
import Navbar from "../Navbar/Navbar";
import "./wishlist.css";

export const Wishlist = () => {
	const [wData, setWData] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/wishlist").then(({ data }) => {
			// console.log(data);
			setWData(data);
		});
	}, []);

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		const data = await fetch("http://localhost:8080/wishlist").then((d) =>
			d.json()
		);
		setWData(data);
		//  console.log(data);
	}

	const Sort = (e) => {
		if (e.target.value === "LTH") {
			const d = [...wData].sort((a, b) => {
				return Number(a.price) - Number(b.price);
			});
			console.log(d);
			setWData(d);
		}

		if (e.target.value === "HTL") {
			const d = [...wData].sort((a, b) => {
				return Number(b.price) - Number(a.price);
			});
			console.log(d);
			setWData(d);
		}

		if (e.target.value === "ATZ") {
			const d = [...wData].sort((a, b) => {
				return a.title > b.title ? 1 : -1;
			});
			console.log(d);
			setWData(d);
		}
	};

	return (
		<div>
			{" "}
			<Navbar />
			<div style={{ width: "90%", marginLeft: "5%", marginTop: "5%" }}>
				<h3 className="WHP">My Favorites</h3>
				<p className="WHP">{`${wData.length} item(s). Simplify your shopping and save 10% off items in your favorites list, use code FAVORITE at the cart. Exclusions Apply, see FAQs for all excluded brands.`}</p>
				<div
					style={{
						display: "flex",
					}}>
					<p style={{ fontSize: "90%", marginRight: "2%", marginTop: "1.5%" }}>
						Sort by
					</p>
					<select
						onClick={Sort}
						style={{ width: "20%", height: "35px", marginTop: "1%" }}>
						<option value="">Default</option>
						<option value="LTH">Price : Low to High</option>
						<option value="HTL">Price : High to Low</option>
						<option value="ATZ">A - Z</option>
					</select>
				</div>
				<div className="PR">
					{wData.map((e) => {
						return (
							<div key={e.id} className="WP">
								<div className="PRData">
									<div>
										<img src={e.img} alt="" />
									</div>
									<div>
										<p style={{ textAlign: "center", marginTop: "5%" }}>
											{e.title}
										</p>
										<p
											style={{
												fontWeight: "bold",
												textAlign: "center",
												marginTop: "1%",
											}}>{`$ ${e.price}`}</p>
									</div>
								</div>
								<div className="ATCBtn">
									<button
										onClick={() => {
											alert("Item Added to Cart ☺️");
											getData();
											const data = e;
											fetch("http://localhost:8080/Cart", {
												method: "POST",
												headers: {
													"content-type": "application/json",
												},
												body: JSON.stringify(data),
											});
										}}
										className="ATC">
										ADD TO CART
									</button>
								</div>
							</div>
						);
					})}
				</div>
				<hr />
				<div className="GTH">
					<p>Add more products to My Favorites list</p>
					<Link to="/">
						<button>CONTINUE SHOPPING</button>
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	);
};
