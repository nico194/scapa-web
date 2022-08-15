import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../../../redux/actions/categories';
import { SearchComponent } from '../../../organisms/search-component/SearchComponent';

export const CategoriesSearch = ({ user }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState()


  const onHandleChange = (e) => {
    e.target.value === '' ? dispatch(getCategories(user)) : setDescription(e.target.value)
  };
  const onHandleClick = () => {
    dispatch(getCategories(user, 1, 15, description))
  };

  return (
    <SearchComponent
      inputPlaceholder='Buscar categoria...'
      buttonText='Buscar'
      onHandleChange={onHandleChange}
      onHandleClick={onHandleClick}
    />
  );
}
