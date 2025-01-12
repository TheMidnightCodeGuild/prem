import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Welcome to Vakratunda Homestay in Ujjain - Your perfect accommodation near Mahakaleshwar Temple. Comfortable and affordable homestay experience during Kumbh Mela. Best guesthouse option in Ujjain."
        />
        <meta
          name="keywords"
          content="vakratundahomestay, homestayinujjain, Ujjain homestay, Mahakaleshwar temple accommodation, Kumbh Mela stay, Ujjain guesthouse, budget friendly homestay Ujjain"
        />
        <meta
          property="og:title"
          content="Vakratunda Homestay - Your Home Away from Home in Ujjain"
        />
        <meta
          property="og:description"
          content="Comfortable and affordable homestay near Mahakaleshwar Temple, Ujjain. Perfect for Kumbh Mela visitors."
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
