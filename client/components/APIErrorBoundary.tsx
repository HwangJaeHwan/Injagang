import React, { Component } from "react";
import { connect } from "react-redux";
import { RootReducerType } from "./redux/store";
import { clearErrorAction } from "./redux/Error/action";
import { AxiosError } from "axios";
import { handleStatusError } from "@/util/handleStatusError";

type APIErrorBoundaryProps = {
  children: React.ReactNode;
  error: AxiosError | null;
  clearErrorAction: () => void;
};

type APIErrorBoundaryState = {
  hasError: boolean;
};

class APIErrorBoundary extends Component<
  APIErrorBoundaryProps,
  APIErrorBoundaryState
> {
  constructor(props: APIErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: APIErrorBoundaryProps) {
    if (!prevProps.error && this.props.error) {
      this.setState({ hasError: true });
    }
  }

  componentWillUnmount() {
    this.props.clearErrorAction();
  }

  render() {
    const errorStatus = this.props.error?.response?.status;
    const ErrorPage = handleStatusError(errorStatus);
    if (this.props.error || this.state.hasError) {
      return this.props.error ? ErrorPage : <p>에러발생</p>;
    }

    return this.props.children;
  }
}

const mapStateToProps = (state: RootReducerType) => ({
  error: state.error.error,
});

const mapDispatchToProps = {
  clearErrorAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(APIErrorBoundary);
