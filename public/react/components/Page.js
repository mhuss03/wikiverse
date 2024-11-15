import React from "react";

export const Page = (props) => {
  return (
    <>
      <h3 onClick={() => props.changeView(props.page.slug)}>
        {props.page.title}
      </h3>
    </>
  );
};
