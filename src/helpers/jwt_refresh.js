
// Get JWT Token from backend and store it in cookies
export async function refreshJwtToken() {
	await fetch(process.env.REACT_APP_BACK_URL + "/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({
			username: process.env.REACT_APP_BACK_USER,
			password: process.env.REACT_APP_BACK_PWD,
		}),
	}).catch((err) => {
		console.error(err);
	});
}
