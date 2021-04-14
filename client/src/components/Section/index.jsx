import React, { useEffect, useState, Component, useCallback } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
// import { Row } from "react-bootstrap";
import useSectionContent from "./useSectionContent";
import "bootstrap/dist/css/bootstrap.min.css";
import SectionContent from "../SectionContent";
export default function ({ section, index, loading }) {
  const { sectionContent } = useSectionContent();
  return (
    <div>
      {!loading ? (
        <div className={classNames(styles.sec, "col")}>
          <div>
            <h1 id={index}>{section.name}</h1>

            {sectionContent.map(content => {
              return <SectionContent content={content} section={section} />;
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
