import React, { Component } from "react";
interface GlobalErrorBoundaryState {
  children: React.ReactNode;
  hasError: boolean;
}

class GlobalErrorBoundary extends Component<GlobalErrorBoundaryState> {
  constructor(props: GlobalErrorBoundaryState) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {}

  render() {}
}

export default GlobalErrorBoundary;
