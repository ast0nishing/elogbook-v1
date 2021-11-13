import "./newcourse.css";

export default function Newcourse() {
  return (
    <div className="newcourse">
      <h1 className="addcourseTitle">New course</h1>
      <form className="addcourseForm">
        {/* <div className="addcourseItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div> */}
        <div className="addcourseItem">
          <label>Code</label>
          <input type="text" placeholder="Math101" />
        </div>
        <div className="addcourseItem">
          <label>Name</label>
          <input type="text" placeholder="123" />
        </div>
        {/* <div className="addcourseItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button className="addcourseButton">Create</button>
      </form>
    </div>
  );
}
