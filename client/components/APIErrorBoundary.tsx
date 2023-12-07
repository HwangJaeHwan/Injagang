import React from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API, reRequest } from "@/api/client";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  shouldHandleError: boolean;
  shouldRethrow: boolean;
  error: AxiosError | null;
}

class APIErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    shouldHandleError: false,
    shouldRethrow: false,
    error: null,
  };

  static getDerivedStateFromError(error: AxiosError): ErrorBoundaryState {
    alert("에러발생")
    if (
      error.response?.status === 401 ||
      error.response?.status === 402 ||
      error.response?.status === 500
    ) {
      return {
        shouldHandleError: true,
        shouldRethrow: false,
        error,
      };
    }
    return {
      shouldHandleError: false,
      shouldRethrow: true,
      error,
    };
  }

  reset() {
    this.setState({ shouldHandleError: false });
    if (axios.isAxiosError(this.state.error)) {
      const { config } = this.state.error;
      if (config) reRequest(config);
    }
  }

  render() {
    if (this.state.shouldRethrow) {
      throw this.state.error;
    }
    if (!this.state.shouldHandleError) {
      return this.props.children;
    }
    if (axios.isAxiosError(this.state.error)) {
      if (
        this.state.error.response?.status === 401 ||
        this.state.error.response?.status === 402
      ) {
        return <AuthError />;
      } else {
        return <NetworkError onClickRetry={() => this.reset()}></NetworkError>;
      }
    }
    return <UnknownError onClickRetry={() => this.reset()} />;
  }
}

export default APIErrorBoundary;

const AuthError = () => <div>로그인이 필요합니다.</div>;
const NetworkError = ({ onClickRetry }: { onClickRetry: () => void }) => (
  <div>
    네트워크 오류가 발생했습니다. <button onClick={onClickRetry}>재시도</button>
  </div>
);
const UnknownError = ({ onClickRetry }: { onClickRetry: () => void }) => (
  <div>
    알 수 없는 오류가 발생했습니다.{" "}
    <button onClick={onClickRetry}>재시도</button>
  </div>
);
