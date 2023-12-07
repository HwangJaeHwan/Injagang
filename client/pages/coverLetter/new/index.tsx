import APIErrorBoundary from "@/components/APIErrorBoundary";
import CoverLetterCreator from "@/components/CoverLetter/new/CoverLetterCreator";
import React from "react";

const CoverLetterEditorPage = () => {
  return (
    <APIErrorBoundary>
      <CoverLetterCreator />
    </APIErrorBoundary>
  );
};

export default CoverLetterEditorPage;
