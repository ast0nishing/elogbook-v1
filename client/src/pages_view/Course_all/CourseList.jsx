import "../Css/elementList.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import {courses} from "../../dummyData"
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CourseList() {
  // Contexts
	// const {
	// 	authState: {
	// 		user: { username }
	// 	}
	// } = useContext(AuthContext)

	// const {
	// 	coureState: { course, courses, coursesLoading },
	// 	getCourses,
	// 	setShowAddCourseTable,
	// 	showToast: { show, message, type },
	// 	setShowToast
	// } = useContext(CourseContext)

	// useEffect(() => getCourses(), [])

  const [data, setData] = useState(courses);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "code", headerName: "Course Code",width:200},
    {
      field: "name",
      headerName: "Course name",
      width:200
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/course/" + params.row.id}>
              <button className="elementListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="elementListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="elementList">
      <DataGrid
        rows={data}
        getRowId={(r) => r.code}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
