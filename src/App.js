import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Categories from './pages/categories/Categories';
import Pictograms from './pages/pictograms/Pictograms';
import Routines from './pages/routines/Routines';
import Login from './pages/login/Login';
import NewRoutine from './pages/new-routine/NewRoutine'


function App() {
	const url = window.location.href.replace(/^(?:\/\/|[^/]+)*\//, '')
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					{ url === '' ? <Redirect to="/admin" /> : ''}
				</Route>
				<Route
					exact
					path='/admin'
					component={Login} />
				<Route
					path='/categories'
					component={Categories} />
				<Route
					path='/pictograms'
					component={Pictograms} />
				<Route
					path='/routines'
					component={Routines} />
				<Route
					path='/new-routine'
					component={NewRoutine} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
