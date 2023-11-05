import React, { useEffect } from "react";
import useTemplateManager from "../hooks/useTemplateManager";
import Spinner from "@/components/Spinner";

interface TemplateListFetcherProps {
  children: React.ReactNode;
}
const TemplateListFetcher = ({ children }: TemplateListFetcherProps) => {
  const { loading, error, templateList, getTemplateList } =
    useTemplateManager();

  useEffect(() => {
    getTemplateList();
  }, []);

  if (loading) return <Spinner />;

  if (error) return <p>문제가 발생했습니다.</p>;

  return <>{children}</>;
};

export default TemplateListFetcher;
