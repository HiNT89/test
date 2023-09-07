import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LayoutProps } from "@/models/common";
import { ReactElement } from "react";
import { NextPage } from "next";
import { Auth } from "@/components/common/auth";
import "../../i18n/i18n";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: (props: LayoutProps) => ReactElement;
};
interface AppPropsWithAuth extends AppProps {
  Component: NextPageWithLayout;
}
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithAuth) {
  return (
    
      <Auth>
        <Component {...pageProps} />
      </Auth>
    
  );
}
