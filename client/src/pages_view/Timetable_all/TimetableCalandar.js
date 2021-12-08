/** @format */

import React, { Component } from "react";
import moment from "moment";
import TimeTable from "react-timetable-events";
import { timetables } from "../../dummyData";
export default function TimetableCalandar() {
  //   const events =

  //   const renderHour = (hour, defaultAttributes, styles) => {
  //     <>
  //       <div {...defaultAttributes} key={hour}>
  //         {hour}h
  //       </div>
  //     </>;
  //   };
  //   const renderEvent = (event, defaultAttributes, styles) => {
  //     <>
  //       <div {...defaultAttributes} title={event.name} key={event.id}>
  //         <span>[ {event.name} ]</span>
  //         <span>
  //           {event.startTime.format("HH:mm")} - {event.endTime.format("HH:mm")}
  //         </span>
  //       </div>
  //     </>;
  //   };

  return (
    <div>
      <TimeTable
        events={{
          "8A1": [
            {
              id: 2,
              name: "Custom Event 1",
              type: "custom",
              startTime: new Date("2018-02-23T11:30:00"),
              endTime: new Date("2018-02-23T13:30:00"),
            },
          ],
          "8A2": [],
          "8A3": [],
          "8A4": [],
        }}
        hoursInterval={{ from: 7, to: 15 }}
        timeLabel={"Times"}
      />
    </div>
  );
}
