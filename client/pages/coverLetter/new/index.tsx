import React, { useEffect } from "react";

import APIErrorBoundary from "@/components/APIErrorBoundary";
import CoverLetterCreator from "@/components/CoverLetter/new/CoverLetterCreator";
import { useDispatch } from "react-redux";

import { clearCurTemplateList } from "@/components/redux/Template/user/actions";

const CoverLetterEditorPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearCurTemplateList())
    }
  },[])
  return (
    <APIErrorBoundary>
      <CoverLetterCreator />
    </APIErrorBoundary>
  );
};

export default CoverLetterEditorPage;
