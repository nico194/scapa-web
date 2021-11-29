import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/categories";
import {
  getPictograms,
  addPictogram,
  deletePictogram,
  updatePictogram,
} from "../../redux/actions/pictograms";
import Input from "../../components/atoms/input/Input";
import Spinner from "../../components/atoms/spinner/Spinner";
import Select from "../../components/atoms/select/Select";
import Modal from "../../components/molecules/modal/Modal";
import Header from "../../components/organisms/header/Header";
import FullPaginator from "../../components/molecules/paginator/FullPaginator";
//import Table from "../../components/molecules/table/Table";
import UploadImage from "../../components/atoms/upload-image/UploadImage";

export default function Pictograms() {
  //   const initialStatePictogram = {
  //     id: -1,
  //     image: null,
  //     attributes: {
  //       description: "",
  //       image_url: "",
  //     },
  //     relationships: {
  //       classifiable: {
  //         data: {
  //           id: 1,
  //         },
  //       },
  //     },
  //   };

  //   const [modal, setModal] = useState(false);
  //   const [pictogram, setPictogram] = useState(initialStatePictogram);
  //   const [isUpdate, setIsUpdate] = useState(false);
  //   const [showAlert, setShowAlert] = useState(false);
  //   const [charged, setCharged] = useState(false);

  //   const dispatch = useDispatch();
  //   const { user } = useSelector((state) => state.users);
  //   const { categories } = useSelector((state) => state.categories);
  //   const {
  //     pictograms,
  //     changed,
  //     currentPage,
  //     totalPage,
  //     loadingPictograms,
  //   } = useSelector((state) => state.pictograms);

  //   useEffect(() => {
  //     dispatch(getCategories(user, 1, 999));
  //   }, [dispatch, user]);

  //   useEffect(() => {
  //     dispatch(getPictograms(user));
  //   }, [dispatch, user]);

  //   useEffect(() => {
  //     changed && dispatch(getPictograms(user));
  //   }, [changed]);

  //   const getImageURL = (place, imageURL) => {
  //     switch (place) {
  //       case "table":
  //       case "update":
  //         return `${process.env.REACT_APP_API_URL}${imageURL}`;
  //       case "add":
  //         return imageURL;
  //       default:
  //         return "";
  //     }
  //   };

  //   const pictogramsHeadTable = [
  //     "id",
  //     "Imagen",
  //     "Descriptión",
  //     "Categoría",
  //     "",
  //     "",
  //   ];
  //   const pictogramsRow = pictograms.map((pictogramItem) => {
  //     const category = categories.filter(
  //       (category) =>
  //         category.id === pictogramItem.relationships.classifiable.data.id
  //     );
  //     if (category.length > 0) {
  //       const src = getImageURL("table", pictogramItem.attributes.image_url);
  //       return (
  //         <tr key={pictogramItem.id}>
  //           <th scope="row" style={{ verticalAlign: "middle" }}>
  //             {pictogramItem.id}
  //           </th>
  //           <td
  //             style={{
  //               width: 150,
  //               height: 150,
  //               textAlign: "center",
  //               verticalAlign: "middle",
  //             }}
  //           >
  //             <img
  //               alt={pictogramItem.attributes.description}
  //               src={src}
  //               style={{ maxHeight: "100%", maxWidth: "100%", padding: 5 }}
  //             />
  //           </td>
  //           <td style={{ verticalAlign: "middle" }}>
  //             {pictogramItem.attributes.description}
  //           </td>
  //           <td style={{ verticalAlign: "middle" }}>
  //             {category[0].attributes.description}
  //           </td>
  //           <td style={{ verticalAlign: "middle" }}>
  //             <i
  //               onClick={() => updatePictogramButton(pictogramItem)}
  //               className="bi bi-pencil-square"
  //             ></i>
  //           </td>
  //           <td style={{ verticalAlign: "middle" }}>
  //             <i
  //               onClick={() => deletePictogramButton(pictogramItem.id)}
  //               className="bi bi-trash-fill"
  //             ></i>
  //           </td>
  //         </tr>
  //       );
  //     }
  //   });

  //   const categoryOptions = categories.map((category) => {
  //     return (
  //       <option
  //         key={category.id}
  //         value={category.id}
  //         selected={
  //           pictogram.relationships !== undefined &&
  //           category.id === pictogram.relationships.classifiable.data.id
  //         }
  //       >
  //         {category.attributes.description}
  //       </option>
  //     );
  //   });

  //   const openModal = () => {
  //     setPictogram(initialStatePictogram);
  //     setIsUpdate(false);
  //     setShowAlert(false);
  //     setModal(true);
  //   };

  //   const setDescription = (e) => {
  //     setPictogram({
  //       ...pictogram,
  //       attributes: { ...pictogram.attributes, description: e.target.value },
  //     });
  //   };

  //   const uploadImagen = (e) => {
  //     setCharged(true);
  //     setPictogram({
  //       ...pictogram,
  //       image: e.target.files[0],
  //       attributes: {
  //         ...pictogram.attributes,
  //         image_url: URL.createObjectURL(e.target.files[0]),
  //       },
  //     });
  //   };

  //   const selectCategory = (category) => {
  //     setPictogram({
  //       ...pictogram,
  //       relationships: { classifiable: { data: { id: category } } },
  //     });
  //   };

  //   const createPictogram = () => {
  //     setShowAlert(false);
  //     if (isNotValidForm()) {
  //       setShowAlert(true);
  //     } else {
  //       isUpdate
  //         ? dispatch(updatePictogram(pictogram, user))
  //         : dispatch(addPictogram(pictogram, user));
  //       setModal(false);
  //     }
  //   };

  //   const isNotValidForm = () => {
  //     let isNotValid = false;
  //     Object.keys(pictogram).forEach((key) => {
  //       if (key === "image") {
  //         if (pictogram[key] === null) return (isNotValid = true);
  //       } else {
  //         if (key === "attributes") {
  //           if (pictogram[key].description === "") return (isNotValid = true);
  //         }
  //       }
  //     });
  //     return isNotValid;
  //   };

  //   const updatePictogramButton = (pictogramToUpdate) => {
  //     setIsUpdate(true);
  //     setCharged(false);
  //     setPictogram(pictogramToUpdate);
  //     setModal(true);
  //   };

  //   const deletePictogramButton = (id) => {
  //     if (window.confirm("Desea eliminar este pictograma?")) {
  //       dispatch(deletePictogram(id, user));
  //     }
  //   };

  //   const goToPreviousPage = () => {
  //     dispatch(getPictograms(user, currentPage - 1));
  //   };

  //   const goToSpecificPage = (index) => {
  //     dispatch(getPictograms(user, index));
  //   };

  //   const goToNextPage = () => {
  //     dispatch(getPictograms(user, currentPage + 1));
  //   };

  return (
    <>
      <Header />
      {/* {
                modal && (
                    <Modal>                        
                        <h3>Ingrese un pictograma:</h3>
                        {
                            showAlert &&
                            <div className="alert alert-danger" role="alert">
                                Complete todos los campos por favor
                            </div>
                        }
                        <Input 
                            label='Descripción' 
                            type='text' 
                            placeholer='Ingrese aqui su categoría...' 
                            value={pictogram.attributes.description}
                            onChange={ e => setDescription(e) }
                            />
                        <UploadImage 
                            label='Imagen'
                            type='file'
                            placeholer='Suba una imagen aquí...'
                            src={ charged ? pictogram.attributes.image_url : getImageURL('update',pictogram.attributes.image_url) }
                            alt={pictogram.image ? pictogram.attributes.description : ''}
                            onChange={ e => uploadImagen(e) }
                        />
                        <Select
                            label='Categoría'
                            options={categoryOptions}
                            selected={pictogram.relationships.classifiable.data.id}
                            onChange={ e => selectCategory(e.target.value)}
                            />
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                            <button onClick={ () => setModal(false) } className='btn btn-danger mb-4'>Cancelar</button>
                            <button onClick={createPictogram} className='btn btn-primary mb-4'>
                                { 
                                    loadingPictograms ?
                                        <Spinner type='light' />
                                        :
                                        <span>{ isUpdate ? 'Actualizar' : 'Agregar'}</span>
                                }
                            </button>
                        </div>
                    </Modal>    
                )
            }                
            <div className='container'>
                <h1 className= 'mb-4'>Pictogramas</h1>
                <div className='w-100 d-flex flex-row justify-content-between mb-4'>
                    <input type='text' style={{ height: 38 }} className='form-control p-1 w-50' placeholder='Buscar...' onChange={e => console.log('change', e.target.value)} />
                    <button onClick={openModal} className='btn btn-primary mb-4'>Agregar Pictograma</button>
                </div>
                {
                    loadingPictograms ?
                        <div className='d-flex flex-row'>
                            <Spinner />
                            <h3 className='px-3'>Cargando...</h3>
                        </div>
                        :
                        pictograms.length > 0 ?
                            <Table thead={pictogramsHeadTable} tbody={pictogramsRow} />
                            :
                            <h3>No hay pictogramas registrados</h3>
                }
                {
                    pictograms.length !== 0 &&
                        <FullPaginator 
                            currentPage={currentPage}
                            totalPage={totalPage}
                            goToPreviousPage={goToPreviousPage}
                            goToNextPage={goToNextPage}
                            goToSpecificPage={goToSpecificPage}
                        />
                }
            </div> */}
    </>
  );
}
