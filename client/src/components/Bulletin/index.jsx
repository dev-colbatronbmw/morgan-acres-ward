import styles from "./index.module.css";
import React, { useState } from "react";
import Section from "../Section";
import useSection from "./useSection";
import classNames from "classnames";
import useSectionContent from "../Section/useSectionContent";
export default function () {
  const { loading } = useSectionContent();
  return (
    <div>
      <header>
        <h1>Morgan Acres Ward Bulletin</h1>
      </header>

      {!loading ? (
        <Sections loading={loading} />
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}

function Sections({ loading }) {
  const { sections } = useSection();
  return (
    <div className={classNames("container")}>
      {sections.length > 0 ? (
        <div>
          <div>
            {sections.map((section, index) => {
              return (
                <div
                  className={classNames(
                    "sec",
                    "col",
                    "border",
                    "border-danger",
                    "align-self-center",
                    "justify-content-center"
                  )}
                >
                  <div
                    className={classNames(
                      "row",
                      "border",
                      "border-secondary",
                      "rounded",
                      "m-3",
                      "align-self-center",
                      "justify-content-center"
                    )}
                  >
                    <Section
                      section={section}
                      index={index}
                      loading={loading}
                    />{" "}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
