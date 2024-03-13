import React from "react";

import APIErrorBoundary from "@/components/APIErrorBoundary";
import AxiosErrorTestComponent from "@/components/AxiosErrorTestComponent";


const search = () => {
  return (
    <APIErrorBoundary>
      <AxiosErrorTestComponent />
    </APIErrorBoundary>
  );
};

export default search;
