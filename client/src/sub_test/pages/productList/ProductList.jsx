import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { courseRows} from "../../../dummyData"
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductList() {
  // Fix the debug of griddata


  function renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
  }
  
  courseRows.forEach( obj => renameKey( obj, 'code', 'id' ) );

  const [data, setData] = useState(courseRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field:"id", headerName: "ID", width: 90 },
    {
      field: "Course",
      headerName: "Course",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="courseListItem">
            <img className="courseListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/course/" + params.row.id}>
              <button className="courseListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="courseListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="courseList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
