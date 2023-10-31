// ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { setErrorAction } from './redux/Error/action'; 

interface ErrorBoundaryState {
  hasError: boolean;
}

interface RootState {
  error: {
    error: Error | null;
  };
}

const mapState = (state: RootState) => ({
  error: state.error.error,
});

const mapDispatch = {
  setError: setErrorAction,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ErrorBoundaryProps = PropsFromRedux & {
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.props.setError(error);
  }

  render() {
    if (this.state.hasError && this.props.error) {
      return <div>An error occurred: {this.props.error.message}</div>;
    }
    return this.props.children;
  }
}

export default connector(ErrorBoundary);
