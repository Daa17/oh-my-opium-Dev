import React, { FC } from "react";
import "./style.scss";

interface IEmptyPage {
  description: string;
}

const EmptyPage: FC<IEmptyPage> = ({ description }) => {
  return <div className="emptyPage-wrapper">{description}</div>;
};

export default EmptyPage;
