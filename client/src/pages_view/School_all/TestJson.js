/** @format */

import "./styles.css";
import React from "react";
import { CSVReader } from "react-papaparse";
import { lessons } from "../../dummyData";
import { useContext, useState } from "react";

export default function TestJson() {
  const [state, setState] = useState({ a: "a" });

  const papaparseOptions = {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  const handleOnDrop = (data) => {
    var final = [];
    var array = data; // input array
    var codes = []; // unique code for array in course name
    // Get unique course
    array.forEach(function (el) {
      codes.push({ code: el.data.code, name: el.data.name });
    });
    // unique funcction
    const uniqueByKey = (array, key) => {
      return [...new Map(array.map((x) => [x[key], x])).values()];
    };

    var unique = uniqueByKey(codes, "code");
    // Return each lesson respective to each sub json
    unique.forEach(function (uniq) {
      var lessons = [];
      array.forEach(function (el) {
        if (el.data.name == uniq.name) {
          lessons.push({ name: el.data.lessons_name, stt: el.data.lesson_stt });
        }
      });
      final.push({ code: uniq.code, name: uniq.name, lessons });
    });
    console.log(final);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  return (
    <>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        removeButtonColor="#659cef"
        onRemoveFile={handleOnRemoveFile}
        config={papaparseOptions}
      >
        <span>Drop CSV file here or click to upload</span>
      </CSVReader>
    </>
  );
}
