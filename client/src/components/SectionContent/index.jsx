import React, { useEffect, useState, Component, useCallback } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SectionContent({ content, section }) {
  return (
    <div className={classNames("row")}>
      {content.sectionId === section.id ? (
        <div className={classNames("col")}>
          {/* this will only print if there is a link */}
          {content.link !== null ? (
            <h2>
              <a href={content.link}>{content.linkContent}</a>
            </h2>
          ) : (
            ""
          )}
          {/* end link */}
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
}
