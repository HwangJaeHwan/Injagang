import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";
import { API } from "@/api/client";
import { getTemplateAPI } from "@/api/TEMPLATE/templateAPI";
import { TEMPLATE_APIS } from "@/api/config";
interface Data {
  message: string;
}

const AxiosErrorTestComponent: React.FC = () => {
    const [data, setData] = useState<Data | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);
  
    useEffect(() => {
      const mock = new MockAdapter(API);
      mock.onGet(TEMPLATE_APIS.GET_API).reply(500, {
        message: '서버 에러가 발생했습니다.'
      });
  
      const fetchData = async () => {
        try {
          const response = await getTemplateAPI();
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
      return <div>에러가 발생했습니다: {error.message}</div>;
    }
  
    if (!data) {
      return <div>로딩 중...</div>;
    }
  
    return <div>데이터: {data.message}</div>;
  };
  
  export default AxiosErrorTestComponent;