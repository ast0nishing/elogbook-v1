import { Link } from "react-router-dom";
import "./course.css";
import Chart from "../../components/chart/Chart"
import {courseData} from "../../dummyData"
import { Publish } from "@material-ui/icons";

export default function Course() {
  return (
    <div className="course">
      <div className="courseTitleContainer">
        <h1 className="courseTitle">Course</h1>
        <Link to="/newcourse">
          <button className="courseAddButton">Create</button>
        </Link>
      </div>
      <div className="courseTop">
          {/* <div className="courseTopLeft">
              <Chart data={courseData} dataKey="Sales" title="Sales Performance"/>
          </div> */}
          <div className="courseTopRight">
              <div className="courseInfoTop">
                  <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="courseInfoImg" />
                  <span className="courseName">Math101</span>
              </div>
              <div className="courseInfoBottom">
                  <div className="courseInfoItem">
                      <span className="courseInfoKey">Code:</span>
                      <span className="courseInfoValue">101</span>
                  </div>
                  <div className="courseInfoItem">
                      <span className="courseInfoKey">Name:</span>
                      <span className="courseInfoValue">Math101</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="courseBottom">
          <form className="courseForm">
              <div className="courseFormLeft">
                  <label>Course Code</label>
                  <input type="text" placeholder="Apple AirPod" />
                  <label>Course Name</label>
                  <input type="text" placeholder="Apple AirPod" />
                  {/* <select name="inStock" id="idStock">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
                  <label>Active</label>
                  <select name="active" id="active">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select> */}
              </div>
              <div className="courseFormRight">
                  {/* <div className="courseUpload">
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="courseUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div> */}
                  <button className="courseButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
