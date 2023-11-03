import React, { Component } from "react";

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}
interface GlobalErrorBoundaryState {
  hasError: boolean;
}

class GlobalErrorBoundary extends Component<
  GlobalErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {}

  render() {
    if (this.state.hasError) {
      return;
    }
    return this.props.children;
  }
}

export default GlobalErrorBoundary;
