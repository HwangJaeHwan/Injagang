import Layout from "@/components/Layout";
import store from "@/components/redux/store";
import type { AppProps } from "next/app";
// import { Provider } from "react-redux";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    // <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    // </Provider>
  );
};
export default App;
