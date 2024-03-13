import React, { useEffect, useState } from "react";

import axios, { AxiosError } from "axios";

import MockAdapter from "axios-mock-adapter";

import { API } from "@/api/client";
import { deleteTemplateAPI } from "@/api/TEMPLATE/templateAPI";

interface Data {
  message: string;
}

const AxiosErrorTestComponent: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const mock = new MockAdapter(API);
    mock.onDelete("/template/5").reply(500, {
      message: "서버 에러가 발생했습니다.",
    });

    const fetchData = async () => {
      try {
        const response = await deleteTemplateAPI(5);
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
        }
      }
    };

    fetchData();
    return () => mock.restore();
  }, []);

  if (error) {
    throw error;
  }

  if (!data) {
    return <div>로딩 중...</div>;
  }

  return <div>데이터: {data.message}</div>;
};

export default AxiosErrorTestComponent;
