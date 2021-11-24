/** @format */

import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import "./Toast.css";

export default function CustomToast() {
  return (
    <>
      <Toast
        show="true"
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className="bg-danger text-white"
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>Server error</strong>
        </Toast.Body>
      </Toast>
    </>
  );
}
