import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { analytics } from "../config/metadata.json";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${analytics.googleMeasurementId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${analytics.googleMeasurementId}', {
                  page_path: window.location.pathname
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` for server-side rendering and initial data population
CustomDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles)],
  };
};
