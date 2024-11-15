import React from "react";
import { Page } from "./Page";

export const PagesList = ({ pages, changeView }) => {
  return (
    <>
      {pages.map((page, idx) => {
        return <Page changeView={changeView} page={page} key={idx} />;
      })}
    </>
  );
};
