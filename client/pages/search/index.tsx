import APIErrorBoundary from "@/components/APIErrorBoundary";
import AxiosErrorTestComponent from "@/components/AxiosErrorTestComponent";
import React from "react";

const search = () => {
  return (
    <APIErrorBoundary>
      <AxiosErrorTestComponent />
    </APIErrorBoundary>
  );
};

export default search;
