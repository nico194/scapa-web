import React from 'react'
import { useCategories } from '../../../../hooks/useCategories';
import Select from '../../../atoms/select/Select';
import Spinner from '../../../atoms/spinner/Spinner';

export default function CategoriesSelect({user, categorySelected, selectCategory}) {
	const { categories, loadingCat } = useCategories(user);

  const categoryOptions = categories.map(categoryItem => {
		return (
			<option
				key={categoryItem.id}
				value={categoryItem.id}
			>
				{categoryItem.attributes.description}
			</option>
		)
	})

	if(loadingCat) {
		return <Spinner />
	}

  return (
    <Select
			label='Categoría'
			options={categoryOptions}
			onChange={e => selectCategory(e.target.value)}
			value={categorySelected ? categorySelected : categories?.id}
		/>
  )
}
