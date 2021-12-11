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
import { RankingContext } from "../../contexts/RankingContext";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { LessonContext } from "../../contexts/LessonContext";
export default function YearRanking() {
  // Logbook
  const {
    rankingState: { rankings, rankingsLoading },
    getRankingYearWeekGrade,
    getRankingYearGrade,
    setShowToast: { show, type, messagage },
    showToast,
  } = useContext(RankingContext);

  //Logbook
  const [data1, setData1] = useState({
    year: "2019",
    grade: 9,
  });
  const { year, grade } = data1;
  const onChangeSelectForm = (event) =>
    setData1({ ...data1, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    getRankingYearGrade(data1);
  };
  let body = null;
  if (rankingsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (rankings.length == 0) {
    body = (
      <>
        <div className="elementList">
          <h2 className="header">
            There is no data available, please contact your admin
          </h2>
        </div>
      </>
    );
  } else {
    const final = Object.keys(rankings[0]);
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
    body = (
      <>
        <div>
          <DataGrid
            rows={rankings}
            getRowId={(r) => r.className}
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
            defaultValue="9"
            name="grade"
            value={grade}
            onChange={onChangeSelectForm}
            style={{ width: 200 }}
          >
            <option value="6">6</option>
            <option value="6">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </Form.Control>
          <br></br>
          <input type="submit" value="Submit"></input>
        </Form>
      </div>
      {body}
    </>
  );
}
