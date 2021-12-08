/** @format */

import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
// Get all context data
import { UserContext } from "../../contexts/UserContext";
import { CourseContext } from "../../contexts/CourseContext";
import { TeacherContext } from "../../contexts/TeacherContext";
import { StudentContext } from "../../contexts/StudentContext";
import { TimetableContext } from "../../contexts/TimetableContext";
import { useEffect, useContext } from "react";
export default function Home() {
  const { getTeachers } = useContext(TeacherContext);
  const { getUser } = useContext(UserContext);
  const { getCourses } = useContext(CourseContext);
  const { getStudents } = useContext(StudentContext);

  useEffect(() => getUser(), []);
  useEffect(() => getCourses(), []);
  useEffect(() => getTeachers(), []);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
