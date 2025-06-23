import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/nutrimate-icons.css"; // Import icon styles
import Layout from "./components/Layout"; // Import the new Layout component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nutrimate // Calorie Counter", // Updated title
  description: "Find healthiest foods for you while Nutrimate tracks your calories.", // Added description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon links - TODO: copy favicon files from client/docs */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Stylesheets - TODO: migrate styles from client/docs/css */}
        {/* <link rel="stylesheet" href="css/nutrimate-icons.css" /> */}
      </head>
      <body className={inter.className}>
        <Layout> {/* Use the Layout component */}
          {children}
        </Layout>
        <noscript style={{ height: '70vh', display: 'flex', alignItems: 'center', color: '#232528' }}>
          <p style={{ margin: 0, textAlign: 'center', fontSize: '1.5rem' }}>
            You need <strong>Javascript</strong> to run this app :(
          </p>
        </noscript>
      </body>
    </html>
  );
}
