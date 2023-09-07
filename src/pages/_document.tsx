import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/logo.png" />

        <title>HelloJob</title>
        <meta name="title" content="HelloJob" />
        <meta name="description" content="HelloJob" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://hellojob.ikisoft.vn/" />
        <meta property="og:title" content="HelloJob" />
        <meta property="og:description" content="HelloJob" />
        <meta property="og:image" content="/logo.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://hellojob.ikisoft.vn/" />
        <meta property="twitter:title" content="HelloJob" />
        <meta property="twitter:description" content="HelloJob" />
        <meta property="twitter:image" content="/logo.png" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
