import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPictograms } from '../../../../redux/actions/pictograms';
import SearchComponent from '../../../organisms/search-component/SearchComponent';

export default function PictogramsSearch({ user }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState()


  const onHandleChange = (e) => {
    e.target.value === '' ? dispatch(getPictograms(user)) : setDescription(e.target.value)
  };
  const onHandleClick = () => {
    dispatch(getPictograms(user, 1, 15, description))
  };

  return (
    <SearchComponent
      inputPlaceholder='Buscar pictograma...'
      buttonText='Buscar'
      onHandleChange={onHandleChange}
      onHandleClick={onHandleClick}
    />
  );
}
