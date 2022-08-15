import { Select, OutlinedInput, MenuItem } from '@mui/material';
import { Spinner } from '../../../atoms/spinner/Spinner';
import { useCategories } from '../../../../hooks/useCategories';


export const CategoriesSelect = ({user, categorySelected, selectCategory}) => {
	const {categories, loadingCat} = useCategories(user);
	
	if(loadingCat) {
		return <Spinner type='primary'/>
	}

  return (
    <Select
			displayEmpty
			value={categorySelected}
			onChange={e => selectCategory(e.target.value)}
			input={<OutlinedInput />}
			sx={{ marginBottom: 4 }}
			fullWidth
		>
			{categories && categories.map((category) => (
				<MenuItem
					key={category.id}
					value={category.id}
				>
					{category.attributes.description}
				</MenuItem>
			))}
		</Select>
  )
}
