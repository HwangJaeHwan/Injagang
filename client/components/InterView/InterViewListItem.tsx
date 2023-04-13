import React from "react";

type InterViewListItemProps = {
  questions: string;
};

const InterViewListItem = ({ questions }: InterViewListItemProps) => {
  return <div>{questions}</div>;
};

export default InterViewListItem;
