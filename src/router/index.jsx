import {
	Outlet,
	RouterProvider,
	createBrowserRouter,
	redirect,
	useFetcher,
	useRouteLoaderData,
} from 'react-router-dom';

import { Layout } from 'antd';
import { fakeAuthProvider } from './auth';
import NoMatch from '../pages/404.jsx';

import LoginPage from '../pages/login/index.jsx';

const { Header, Content } = Layout;

const router = createBrowserRouter([
	{
		id: 'root',
		path: '/',
		loader() {
			// Our root route always provides the user, if logged in
			return { user: fakeAuthProvider.username };
		},
		// Component: Layout,
		children: [
			{
				index: true,
				Component: PublicPage,
				loader: protectedLoader,
				// async lazy() {
				// 	let { DashboardIndex } = await import("./pages/Dashboard");
				// 	return { Component: DashboardIndex };
				// },
			},
			{
				path: 'login',
				action: loginAction,
				loader: loginLoader,
				Component: LoginPage,
			},
			{
				path: 'protected',
				loader: protectedLoader,
				Component: ProtectedPage,
			},
			{
				path: '*',
				element: <NoMatch />,
			},
		],
	},
	{
		path: '/logout',
		async action() {
			// We signout in a "resource route" that we can hit from a fetcher.Form
			await fakeAuthProvider.signout();
			return redirect('/');
		},
	},
]);

export default function App() {
	return (
		<Layout>
			<Header>Header</Header>
			<Content>
				<RouterProvider
					router={router}
					fallbackElement={<p>Initial Load...</p>}
				/>
				<Outlet />
			</Content>
		</Layout>
	);
}

// function Layout() {
// 	return (
// 		<div>
// 			<AuthStatus />
//
// 			<ul>
// 				<li>
// 					<Link to="/">Public Page</Link>
// 				</li>
// 				<li>
// 					<Link to="/protected">Protected Page</Link>
// 				</li>
// 			</ul>
//
// 			<Outlet />
// 		</div>
// 	);
// }

function AuthStatus() {
	// Get our logged in user, if they exist, from the root route loader data
	let { user } = useRouteLoaderData('root');
	let fetcher = useFetcher();

	if (!user) {
		return <p>You are not logged in.</p>;
	}

	let isLoggingOut = fetcher.formData != null;

	return (
		<div>
			<p>Welcome {user}!</p>
			<fetcher.Form method="post" action="/logout">
				<button type="submit" disabled={isLoggingOut}>
					{isLoggingOut ? 'Signing out...' : 'Sign out'}
				</button>
			</fetcher.Form>
		</div>
	);
}

async function loginAction({ request }) {
	let formData = await request.formData();
	let username = formData.get('username');

	// Validate our form inputs and return validation errors via useActionData()
	if (!username) {
		return {
			error: 'You must provide a username to log in',
		};
	}

	// Sign in and redirect to the proper destination if successful.
	try {
		await fakeAuthProvider.signin(username);
	} catch (error) {
		// Unused as of now but this is how you would handle invalid
		// username/password combinations - just like validating the inputs
		// above
		return {
			error: 'Invalid login attempt',
		};
	}

	let redirectTo = formData.get('redirectTo');
	return redirect(redirectTo || '/');
}

async function loginLoader() {
	if (fakeAuthProvider.isAuthenticated) {
		return redirect('/');
	}
	return null;
}

function PublicPage() {
	return <h3>Public</h3>;
}

function protectedLoader({ request }) {
	// If the user is not logged in and tries to access `/protected`, we redirect
	// them to `/login` with a `from` parameter that allows login to redirect back
	// to this page upon successful authentication
	if (!fakeAuthProvider.isAuthenticated) {
		let params = new URLSearchParams();
		params.set('from', new URL(request.url).pathname);
		return redirect('/login?' + params.toString());
	}
	return null;
}

function ProtectedPage() {
	return <h3>Protected</h3>;
}
