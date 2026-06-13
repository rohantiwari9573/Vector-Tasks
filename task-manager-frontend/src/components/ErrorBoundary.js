import React from "react";

class ErrorBoundary extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {

    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {

    console.error("Error Boundary Caught:", error, errorInfo);
  }

  render() {

    if (this.state.hasError) {

      return (

        <div className="min-h-screen flex items-center justify-center bg-black text-white">

          <div className="text-center">

            <h1 className="text-4xl font-bold mb-4">
              Something went wrong
            </h1>

            <p className="text-gray-400">
              Please refresh the page.
            </p>

          </div>

        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;