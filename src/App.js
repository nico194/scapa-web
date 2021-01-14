import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Categories from './pages/categories/Categories';
import Pictograms from './pages/pictograms/Pictograms';
import Routines from './pages/routines/Routines';
import Login from './pages/login/Login'


function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route
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
			</Switch>
		</BrowserRouter>
	);
}

export default App;
