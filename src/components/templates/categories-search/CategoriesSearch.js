import React from "react";
import SearchComponent from "../../organisms/search-component/SearchComponent";

export default function CategoriesSearch() {
  const onHandleChange = () => {};
  const onHandleClick = () => {};

  return (
    <SearchComponent
      inputPlaceholder="Buscar categoria..."
      buttonText="Buscar"
      onHandleChange={onHandleChange}
      onHandleClick={onHandleClick}
    />
  );
}
