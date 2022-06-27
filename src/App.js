import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categories from './pages/categories/Categories';
import Pictograms from './pages/pictograms/Pictograms';
import Routines from './pages/routines/Routines';
import Login from './pages/login/Login';
import NewRoutine from './pages/routine/Routine'
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes'


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/admin'
					element={<Login />} />
				<Route
					path='/categories'
					element={<Categories />} />
				<Route
					path='/pictograms'
					element={<Pictograms/>} />
				<Route
					path='/routines'
					element={<Routines />} />
				<Route
					path='/routine'
					element={<NewRoutine />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
