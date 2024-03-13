import React from "react";

import APIErrorBoundary from "@/components/APIErrorBoundary";
import CoverLetterCreator from "@/components/CoverLetter/new/CoverLetterCreator";

const CoverLetterEditorPage = () => {
  return (
    <APIErrorBoundary>
      <CoverLetterCreator />
    </APIErrorBoundary>
  );
};

export default CoverLetterEditorPage;
