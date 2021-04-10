import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { useColorMode } from "react-use-color-mode";
import { useEffect } from 'react';


function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider themeType={"dark"}>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}
export default MyApp;
