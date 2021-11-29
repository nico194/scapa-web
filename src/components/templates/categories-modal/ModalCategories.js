import React from "react";
import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import Modal from "../../molecules/modal/Modal";

export default function ModalCategories() {
  return (
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
        <Button text="Cancelar" type="danger" onClick={() => setModal(false)} />
        <Button
          text={
            loadingCategories ? (
              <Spinner type="light" />
            ) : (
              <span>{isUpdate ? "Actualizar" : "Agregar"}</span>
            )
          }
          type="primary"
          onClick={() => setModal(false)}
        />
        <button onClick={createCategory} className="btn btn-primary">
          {}
        </button>
      </div>
    </Modal>
  );
}
