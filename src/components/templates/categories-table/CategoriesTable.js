import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions/categories";
import Table from "../../organisms/table/Table";

export default function CategoriesTable({ categories }) {
  const categoriesHeadTable = ["id", "Descriptión", "", ""];

  const categoriesRow = categories.map((categoryItem) => {
    return (
      <tr key={categoryItem.id}>
        <th scope="row">{categoryItem.id}</th>
        <td>{categoryItem.attributes.description}</td>
        <td>
          {/* <i
            onClick={() => updateCategoryButton(categoryItem)}
            className="bi bi-pencil-square"
          ></i> */}
        </td>
        <td>
          {/* <i
            onClick={() => deleteCategoryButton(categoryItem.id)}
            className="bi bi-trash-fill"
          ></i> */}
        </td>
      </tr>
    );
  });

  return <Table thead={categoriesHeadTable} tbody={categoriesRow} />;
}
