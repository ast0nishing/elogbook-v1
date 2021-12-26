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
import { LogbookContext } from "../../contexts/LogbookContext";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { LessonContext } from "../../contexts/LessonContext";
export default function LogbookWeekClass() {
  // Logbook
  const {
    logbookState: { matrix, logbook, logbooks, logbooksLoading },
    getLogbookYearWeekClass,
    findLogbook,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(LogbookContext);

  //Logbook
  const [data1, setData1] = useState({
    year: "2019",
    week: "2",
    className: "LA0102-C19005",
  });
  const { week, year, className } = data1;
  const onChangeSelectForm = (event) =>
    setData1({ ...data1, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    getLogbookYearWeekClass(data1);
  };
  const weektime = Array.from({ length: 35 }, (_, i) => i + 1);
  const history = useHistory();
  const handleChoose = (courseId) => {
    if (typeof courseId === "undefined") {
      toast("Invalid Course For This Class");
    } else {
      const input = { week: data1.week, year: data1, year, id: courseId };
      const courseCode = findLogbook(input);
      //   setTimeout(function () {
      //     history.push("/new-logbook");
      //     console.log("Ready");
      //   }, 1000);
    }
  };

  let body = null;
  if (logbooksLoading) {
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
            There is no logbook available, please create your logbook first
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
    const final = Object.keys(matrix[0]);
    const outlier = ["id", "week", "year", "fromWeek", "toWeek", "key"];
    const labels = final.filter((item) => !outlier.includes(item));
    const columns = [];
    labels.forEach(function (el) {
      columns.push({
        field: el,
        headerName: el,
        width: 250,
      });
    });
    // columns.push({
    //   field: "Logbook",
    //   headerName: "Logbook Action",
    //   width: 200,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <button
    //           className="elementListEdit"
    //           onClick={() => handleChoose(params.row.id)}
    //         >
    //           Edit
    //         </button>
    //       </>
    //     );
    //   },
    // });
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
          <Form.Control
            as="select"
            defaultValue="2019"
            name="className"
            value={className}
            onChange={onChangeSelectForm}
            style={{ width: 200 }}
          >
            <option value="LA0102-C19005">9A2</option>
            <option value="LA0102-C19001">9A9</option>
          </Form.Control>
          <br></br>
          <input type="submit" value="Submit"></input>
        </Form>
      </div>
      {body}
    </>
  );
}
