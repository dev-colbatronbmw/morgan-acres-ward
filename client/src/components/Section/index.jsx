import React, { useEffect, useState, Component, useCallback } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
// import { Row } from "react-bootstrap";
import useSectionContent from "./useSectionContent";
import "bootstrap/dist/css/bootstrap.min.css";
export default function ({ section, index, loading }) {
  const { sectionContent } = useSectionContent();

  return (
    <div>
      {!loading ? (
        <div
          className={classNames(
            styles.sec,
            "col"
            // "border",
            // "border-danger",
            // "align-self-center"
          )}
        >
          <div
          // className={classNames(
          //   "row",
          //   "border",
          //   "border-secondary",
          //   "rounded",
          //   "m-3"
          // )}
          >
            {/* <div className={classNames("col")}> */}
            <h1 id={index}>{section.name}</h1>

            {sectionContent.map(content => {
              return (
                <div className={classNames("row")}>
                  {content.sectionId === section.id ? (
                    <div className={classNames("col")}>
                      {content.link !== null ? (
                        <h2>
                          <a href={content.link}>{content.linkContent}</a>
                        </h2>
                      ) : (
                        ""
                      )}
                      {content.bold !== null ? (
                        <div>
                          <h2>{content.bold}</h2>
                        </div>
                      ) : (
                        ""
                      )}
                      {content.p !== null ? (
                        <div>
                          <p>{content.p}</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // </div>
        ""
      )}
    </div>
  );
}
