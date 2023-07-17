import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider} from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap useQuery to use this function by default
const defaultQueryFn = async ({ queryKey }) => {
  const data = await fetch(queryKey[0], queryKey[1])
  return await data.json();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 300000,
    },
  },
})

// Get JWT Token from backend and store it in cookies
fetch('http://127.0.0.1:3000/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    username: process.env.REACT_APP_BACK_USER,
    password: process.env.REACT_APP_BACK_PWD
  })
}).catch(err => {
  console.error(err);
});

// React.StrictMode will render 2 times on launch
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
