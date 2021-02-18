import styles from "./index.module.css";
import React, { useState } from "react";
import Section from "../Section";
import useSection from "./useSection";
export default function () {
  const { sections } = useSection();

  return (
    <div>
      <h1>Morgan Acres Ward Bulletin</h1>

      <div>
        {sections.length > 0 ? (
          <div>
            {sections.map((section, index) => {
              return <Section section={section} index={index} />;
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
