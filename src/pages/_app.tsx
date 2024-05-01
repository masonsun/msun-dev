import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from 'next/router';
import type { AppProps } from "next/app";
import React, { useEffect, ReactElement, ReactNode } from "react";

// CSS
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";
import "../theme/styles.css";

// Configs
import Metadata from "../config/metadata.json";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Load web content from config
  const { meta, title, icons, analytics } = Metadata;

  // Tracking code for Google Analytics
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = url => {
      window.gtag('config', analytics.googleMeasurementId as string, {
        page_path: url,
      });
    }
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);

  // Animate on scroll functionality
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      // Remove server-side injected CSS if it exists
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  // Set-up for page-specific layouts
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  

  return (
    <>
      <Head>
        {/* Metadata */}
        <meta charSet={meta.charset} />
        <meta name="description" content={meta.description} />
        <meta name="viewport" content={meta.viewport_options} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="theme-color" content={meta.theme_color} />
        <meta name="msapplication-TileColor" content={meta.theme_color} />
        <meta name="msapplication-config" content={meta.msapplication_config} />

        {/* Links */}
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

        {/* Favicons */}
        {icons.map((item) => (
          <link
            rel={item.rel}
            type={item.type}
            sizes={item.sizes}
            href={item.href}
          />
        ))}
        <link rel="manifest" href={meta.manifest}></link>

        {/* Title */}
        <title>{title}</title>
      </Head>

      {/* Page-specific layouts */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout}
      </ThemeProvider>
    </>
  );
};

export default App;
