import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { refreshJwtToken } from "./helpers/jwt_refresh";

// Import fonts for MaterialUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const CronJob = require('cron').CronJob;

const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap useQuery to use this function by default
const defaultQueryFn = async ({ queryKey }) => {
	const response = await fetch(queryKey[0], queryKey[1]);
	let result;
	if (response.status < 200 || response.status >= 300) {
		try {
			result = await response.json();
			result = result.message ? result.message : response.statusText;
		} catch (err) {
      console.error(err);
			result = response;
		}
		throw result;
	}
  try {
		result = await response.json();
	} catch (err) {
    console.error(err);
		result = response;
	}
	return result;
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: defaultQueryFn,
			staleTime: 300000,
		},
	},
});

document.title = "Game Calendar";

refreshJwtToken().then(_ => {

	new CronJob("0 */5 * * * *", refreshJwtToken, null, true, "Europe/Paris");

	// React.StrictMode will render 2 times on launch
	root.render(
	//<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<meta name="description" content="Game calendar application"></meta>
			<meta name="viewport" content="initial-scale=1, width=device-width" />
			<App />
		</QueryClientProvider>
	//</React.StrictMode>
	);

	// If you want to start measuring performance in your app, pass a function
	// to log results (for example: reportWebVitals(console.log))
	// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
	reportWebVitals();
}).catch(err => console.error(err))

