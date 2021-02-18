import React, { useEffect, useState, Component, useCallback } from "react";
import styles from "./index.module.css";

export default function ({ section, index }) {
  return (
    <div>
      <h1 id={index}>{section.name}</h1>
      {section.content.length > 0 ? (
        <div>
          {section.content.map(content => {
            return <div>{content.rowId}</div>;
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
