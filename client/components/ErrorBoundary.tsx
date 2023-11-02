import React, { Component } from "react";
import { connect } from "react-redux";
import { RootReducerType } from "./redux/store";
import { clearErrorAction } from "./redux/Error/action";
import { AxiosError } from "axios";
import { errorHandle } from "@/util/errorHandle";
import ErrorMessage from "./ErrorMessage";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  error: AxiosError | null;
  clearErrorAction: () => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (!prevProps.error && this.props.error) {
      this.setState({ hasError: true });
    }
  }

  componentWillUnmount() {
    this.props.clearErrorAction();
  }

  render() {
    errorHandle(this.props.error?.response?.status);
    if (this.props.error || this.state.hasError) {
      return <ErrorMessage message={this.props.error?.message}></ErrorMessage>;
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

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
