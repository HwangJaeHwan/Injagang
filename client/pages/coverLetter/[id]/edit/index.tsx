import React from "react";
import { useRouter } from "next/router";

const CoverLetterEditorPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>Editing cover letter with ID: {id}</div>;
};

export default CoverLetterEditorPage;
