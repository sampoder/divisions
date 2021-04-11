import { GeistProvider, CssBaseline } from "@geist-ui/react";
import NProgress from '../template/progress'


function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider themeType={"dark"}>
      <NProgress />
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}
export default MyApp;
