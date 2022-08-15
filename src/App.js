import { AppRouter } from './router';
import { ThemeConfig } from './themes/theme.config'


export const App = () => {
	return (
		<ThemeConfig>
			<AppRouter />
		</ThemeConfig>
	);
}

export default App;
