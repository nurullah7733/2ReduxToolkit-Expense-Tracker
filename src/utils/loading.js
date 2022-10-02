import React from "react";
import loadingImg from "../assets/img/Spinner-1s-200px.svg";

const Loading = () => {
  return (
    <div>
      <img src={loadingImg} alt="loading..." width={30} height={30} />
    </div>
  );
};

export default Loading;
