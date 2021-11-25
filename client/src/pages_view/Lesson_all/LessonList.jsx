// Decoration
import "../Css/element.css"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import Spinner from 'react-bootstrap/Spinner'
import addIcon from "../../assets/plus-circle-fill.svg"
import Button from 'react-bootstrap/Button'
// import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
// import Col from 'react-bootstrap/Col'
// import ActionButtons from "./ActionButtons";

// React
import { Link } from "react-router-dom";
import { useState } from "react";
import { LessonContext } from '../../contexts/LessonContext'

// Context
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect } from 'react'
// Dummy data
import {lessons} from "../../dummyData"

export default function LessonList() {
  // // Auth context
	// const {
	// 	authState: {
	// 		user: { username }
	// 	}
	// } = useContext(AuthContext)
  // // Lesson context
	// const {
	// 	lessonState: { lesson, lessons, lessonsLoading },
	// 	getLessons,
	// 	setShowAddLessonTable,
	// 	showToast: { show, message, type },
	// 	setShowToast
	// } = useContext(LessonContext)

	// useEffect(() => getLessons(), [])
  

  const [data, setData] = useState(lessons);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID"},
    { field: "name", headerName: "Name", width: 200 },
    { field: "stt", headerName: "STT", width: 200 },
    { field: "course", headerName: "Course", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          // <>
          //   <ActionButtons id={params.row.id}/>
          // </>
          <>
            <Link to={"/lesson/" + params.row.id}>
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
    <>


    <div className="elementList">
      <DataGrid
        // getRowId={(r)=>r._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />   
    <div>
    <OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add new lesson</Tooltip>}
				>
       <Link to={"/newlesson"}>
					<Button 
						className='btn-floating' style={{"zIndex":-1}}
					>
						<img src={addIcon} alt='add-post' width='60' height='60' />
					</Button>
          </Link>
				</OverlayTrigger>
    </div>
    </div>
</>
  );
}