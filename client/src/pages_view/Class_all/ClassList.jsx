import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ClassContext } from '../../contexts/ClassContext'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect } from 'react'
// import Spinner from 'react-bootstrap/Spinner'
import addIcon from "../../assets/plus-circle-fill.svg"
import Button from 'react-bootstrap/Button'
// import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
// import Col from 'react-bootstrap/Col'
import ActionButtons from "./ActionButtons";

export default function ClassList() {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		classState: { class, classes, classesLoading },
		getClasses,
		setShowAddClassTable,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ClassContext)

	useEffect(() => getClasses(), [])
  
  const [data, setData] = useState(classes);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };



  const columns = [
    { field: "_id", headerName: "ID"},
    { field: "school", headerName: "School", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "academicyear", headerName: "Academicyear", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <ActionButtons _id={params.row._id}/>
          </>
        );
      },
    },
  ];
  return (
    <>


    <div className="userList">
      <DataGrid
        getRowId={(r)=>r._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />   
    <div>
    <OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add new class</Tooltip>}
				>
       <Link to={"/newuser"}>
					<Button 
						className='btn-floating' style={{"z-index":-1}}
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
