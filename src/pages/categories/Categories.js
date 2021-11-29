import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../redux/actions/categories";
import Input from "../../components/atoms/input/Input";
import Spinner from "../../components/atoms/spinner/Spinner";
import Modal from "../../components/molecules/modal/Modal";
import Header from "../../components/organisms/header/Header";
import CategoriesTable from "../../components/templates/categories-table/CategoriesTable";
import CategoriesSearch from "../../components/templates/categories-search/CategoriesSearch";
import Button from "../../components/atoms/button/Button";

export default function Categories() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories(user));
  }, [user, dispatch]);

  // const initialStateCategory = {
  //   id: -1,
  //   attributes: {
  //     description: "",
  //   },
  // };

  // const [modal, setModal] = useState(false);
  // const [category, setCategory] = useState(initialStateCategory);
  // const [isUpdate, setIsUpdate] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);

  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.users);
  // const {
  //   categories,
  //   changed,
  //   previousPage,
  //   currentPage,
  //   totalPage,
  //   nextPage,
  //   loadingCategories,
  // } = useSelector((state) => state.categories);

  // useEffect(() => {
  //   changed && dispatch(getCategories(user));
  // }, [changed]);

  // const openModal = () => {
  //   setCategory(initialStateCategory);
  //   setShowAlert(false);
  //   setIsUpdate(false);
  //   setModal(true);
  // };

  // const createCategory = () => {
  //   if (category.attributes.description !== "") {
  //     isUpdate
  //       ? dispatch(updateCategory(category, user))
  //       : dispatch(addCategory(category, user));
  //     setModal(false);
  //   } else {
  //     setShowAlert(true);
  //   }
  // };

  // const updateCategoryButton = (categoryToUpdate) => {
  //   setIsUpdate(true);
  //   setCategory(categoryToUpdate);
  //   setModal(true);
  // };

  // const deleteCategoryButton = (id) => {
  //   if (window.confirm("Desea eliminar esta categoría?")) {
  //     dispatch(deleteCategory(id, user));
  //   }
  // };

  return (
    <>
      <Header />

      <div className="container">
        <h1 className="mb-4">Categorias</h1>
        <div className="row">
          <div className="col-12 col-md-6">
            <CategoriesSearch />
          </div>
          <div className="col-12 col-md-6">
            <Button
              text="Agregar Categoria"
              type="primary"
              position="center"
              extraClassName="justify-content-md-end"
              onClick={() => {}}
            />
          </div>
        </div>
        <CategoriesTable categories={categories} />
      </div>

      {/* {modal && (
        <Modal>
          <h3>Ingrese el nombre de la categoría:</h3>
          {showAlert && (
            <div className="alert alert-danger" role="alert">
              Complete el campos por favor
            </div>
          )}
          <Input
            label="Categoría"
            type="text"
            placeholer="Ingrese aqui su categoría..."
            value={
              category.attributes !== undefined
                ? category.attributes.description
                : ""
            }
            onChange={(e) =>
              setCategory({
                ...category,
                attributes: { description: e.target.value },
              })
            }
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <button onClick={() => setModal(false)} className="btn btn-danger">
              Cancelar
            </button>
            <button onClick={createCategory} className="btn btn-primary">
              {loadingCategories ? (
                <Spinner type="light" />
              ) : (
                <span>{isUpdate ? "Actualizar" : "Agregar"}</span>
              )}
            </button>
          </div>
        </Modal>
      )}
      <div className="container">
        <h1 className="mb-4">Categorias</h1>
        <div className="w-100 d-flex flex-row justify-content-between mb-4">
          <input
            type="text"
            style={{ height: 38 }}
            className="form-control p-1 w-50"
            placeholder="Buscar..."
            onChange={(e) => console.log("change", e.target.value)}
          />
          <button onClick={openModal} className="btn btn-primary mb-4">
            Agregar Categoría
          </button>
        </div>
        {loadingCategories ? (
          <div className="d-flex flex-row">
            <Spinner />
            <h3 className="px-3">Cargando...</h3>
          </div>
        ) : categories.length > 0 ? (
          <>
            <Table thead={categoriesHeadTable} tbody={categoriesRow} />
            <Paginator
              previousPage={previousPage}
              currentPage={currentPage}
              totalPage={totalPage}
              nextPage={nextPage}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
              goToSpecificPage={goToSpecificPage}
            />
          </>
        ) : (
          <h3>No hay categorias registradas</h3>
        )}
      </div> */}
    </>
  );
}
