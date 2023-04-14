import React from "react";
import InterviewRecord from "@/components/InterView/interviewRecord";
import InterViewListView from "@/components/InterView/InterViewListView";

const interview = () => {
  return (
    <div>
      <InterviewRecord />
      <InterViewListView></InterViewListView>
    </div>
  );
};

export default interview;
