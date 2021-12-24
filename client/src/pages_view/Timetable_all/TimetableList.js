/** @format */
import Form from "react-bootstrap/Form";
import "../Css/elementList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import addIcon from "../../assets/plus-circle-fill.svg";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";

import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { TimetableContext } from "../../contexts/TimetableContext";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
export default function TimetableList() {
  // Contexts
  const {
    timetableState: { matrix, timetables, timetablesLoading },
    getTimetables,
    showToast: { show, message, type },
    setShowToast,
    deleteTimetable,
    findTimetable,
    getTimetablesYearWeek,
  } = useContext(TimetableContext);

  // Get all course
  // const [data, setData] = useState(timetables);
  const [data1, setData1] = useState({ year: "2019", week: "2" });
  const { week, year } = data1;
  useEffect(() => setData1({ year: "2019", week: "2" }), []);
  const onChangeSelectForm = (event) =>
    setData1({ ...data1, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    getTimetablesYearWeek(data1);
  };

  const history = useHistory();
  // Select course for editing
  const handleChoose = (courseId) => {
    if (typeof courseId === "undefined") {
      toast("Invalid Course For This Class");
    } else {
      const input = { week: data1.week, year: data1, year, id: courseId };
      findTimetable(input);
      history.push("/timetable-detail");
    }
  };
  const handleDelete = async (timetableId) => {
    try {
      setData1(data1.filter((item) => item.timetableId !== timetableId));
      const { message } = await deleteTimetable(timetableId);
      if (message) {
        setShowToast({ show: true, message, type: null });
        toast(message);
      }
    } catch (error) {}
  };

  let body = null;
  if (timetablesLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (matrix.length == 0) {
    body = (
      <>
        <div className="elementList">
          <h2 className="header">
            There is no timetable available, please create your timetable first
          </h2>
          <Link to={"/new-timetable"}>
            <Button className="btn-floating" style={{ "z-index": -1 }}>
              <img src={addIcon} alt="add-post" width="60" height="60" />
            </Button>
          </Link>
        </div>
      </>
    );
  } else {
    const test = Object.keys(matrix[0]);
    const rm = (test.length - 4) / 2;
    const rm_id = test.splice(8, test.length - rm - 1);
    const non_key = ["id", "Date", "Time", "key"];
    rm_id.forEach(function (el) {
      non_key.push(el);
    });
    const final = test.filter((item) => !non_key.includes(item));

    const columns = [
      { field: "Date", headerName: "Date", width: 200 },
      { field: "Time", headerName: "Time", width: 200 },
    ];

    final.forEach(function (el) {
      columns.push({
        field: el,
        headerName: el,
        width: 250,
        renderCell: (params) => {
          return (
            <>
              <div style={{ width: "75%" }}>
                <p>{params.row[el]}</p>
              </div>

              <button
                className="elementListEdit"
                onClick={() => handleChoose(params.row[el + "_id"])}
                // onClick={() => console.log(params.row[el + "_id"])}
              >
                Edit
              </button>
              <DeleteOutline
                className="ListDelete"
                onClick={() => handleDelete(params.row.id)}
              />
            </>
          );
        },
      });
    });
    body = (
      <>
        <div>
          <ToastContainer
            show={show}
            style={{ position: "top-left", top: "10%", right: "5%" }}
            className={`bg-danger text-white`}
            onClose={setShowToast.bind(this, {
              show: false,
              message: "",
              type: null,
            })}
            delay={3000}
            autohide
          />
          <DataGrid
            rows={matrix}
            getRowId={(r) => r.key}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            style={{ height: 500 }}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        <h2>Select Options</h2>
        <Form
          onSubmit={onSubmit}
          className="my-4"
          style={{
            display: "flex",
            "flex-flow": "row wrap",
            "align-items": "center",
          }}
        >
          <Form.Control
            as="select"
            defaultValue="1"
            name="week"
            value={week}
            onChange={onChangeSelectForm}
            style={{ width: 200 }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </Form.Control>
          <Form.Control
            as="select"
            defaultValue="2019"
            name="year"
            value={year}
            onChange={onChangeSelectForm}
            style={{ width: 200 }}
          >
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </Form.Control>
          <br></br>
          <input type="submit" value="Submit"></input>
        </Form>
      </div>
      {body}
    </>
  );
}
