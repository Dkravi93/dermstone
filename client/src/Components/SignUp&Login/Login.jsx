import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import "./Login.css";
export const Login = () => {
	const initialState = { email: "", password: "" };
	const [userData, setUserData] = useState([]);
	const [loginData, setLoginData] = useState(initialState);

	const { isAuth, handleAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { value, name } = e.target;
		setLoginData({ ...loginData, [name]: value });
	};



	const handleSubmit = async (event) => {
		event.preventDefault();
		let flag = false;

        await axios.post("https://dermstone-app.herokuapp.com//api/login", loginData).then((res)=> {
            const token = res.data.token;
            const data = res.data;			
			localStorage.setItem("userData", JSON.stringify(data));
			localStorage.setItem("userToken", JSON.stringify(token));
			handleAuth(token);
			navigate("/");
		})
		.catch((err) => alert(err.response.message));

	};

	return (
		<div>
			<div id="container">
				<div
					id="main"
					style={{
						paddingTop: "0px",
						marginTop: "5px",
					}}>
					<Link to="/">
						<div id="nav1">
							<img
								src="https://s1.thcdn.com/enterprise/assets/dermstore-global-a3ce7f42-4a2c-4cc5-ad05-ba594900fa02-logo-default.svg"
								alt="Navbar"
							/>
						</div>
					</Link>
				</div>
				<div id="body">
					<div id="bigdiv">
						<form onSubmit={handleSubmit}>
							<div>
								<p id="cus1">Existing Customers</p>
								<div>
									<p id="ep">*Email address</p>
									<input type="text" name="email" onChange={handleChange} />
								</div>
							</div>
							<div>
								<div>
									<p id="ep">*Password</p>
									<input type="text" name="password" onChange={handleChange} />
								</div>
							</div>
							<p id="forgot">
								<a href="google.com/forgot password">
									Forgotten your password?{" "}
								</a>
							</p>
							<input type="submit" id="submit" value="LOGIN TO YOUR ACCOUNT" />

							<p id="ep1">Or, Continue with</p>
						</form>
						<div id="toogle">
							<div id="fg">
								<p id="logopara">
									<a href="facebook.com">
										<img
											id="logo"
											src="https://seeklogo.com/images/F/facebook-logo-C64946D6D2-seeklogo.com.png"
											alt=""
										/>{" "}
										Facebook
									</a>
								</p>
							</div>
							<div id="fg">
								<p id="logopara">
									<a href="google.com">
										<img
											id="logo"
											src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
											alt=""
										/>{" "}
										Google
									</a>
								</p>
							</div>
						</div>
					</div>

					<div id="smldiv">
						<p id="cus">New Customers</p>
						<button className="continue_2">
							<Link
								style={{
									textDecoration: "none",
									color: "white",
								}}
								to="/signUp">
								{" "}
								CONTINUE{" "}
							</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
