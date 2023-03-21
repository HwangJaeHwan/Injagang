import Layout from "@/components/Layout";
import wrapper from "@/components/redux/store";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};
export default wrapper.withRedux(App);
