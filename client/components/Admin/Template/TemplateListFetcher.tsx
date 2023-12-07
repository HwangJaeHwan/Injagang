import React, { useEffect } from "react";
import useTemplateManager from "../hooks/useTemplateManager";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getTemplate } from "@/components/redux/Template/server/actions";

interface TemplateListFetcherProps {
  children: React.ReactNode;
}
const TemplateListFetcher = ({ children }: TemplateListFetcherProps) => {
  const { error, loading, getTemplateList } = useTemplateManager();

  useEffect(() => {
    getTemplateList();
  }, []);

  if (loading) return <Spinner />;

  if (error) {
     throw <p>데이터를 불러오지 못했습니다.</p>;
  }

  return <>{children}</>;
};

export default TemplateListFetcher;
