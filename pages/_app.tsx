import * as Fathom from 'fathom-client';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { Layout } from '../components/Layout';
import { AppStateProvider } from '../contexts/AppStateContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { storageKey } from '../hooks/useStorage';
import '../styles/global.css';

// TODO: Remove, React 18 doesn't warn anymore.
// https://twitter.com/estejs/status/1428470008997421066
{
  // eslint-disable-next-line no-console
  const error = console.error;
  // eslint-disable-next-line no-console
  console.error = (...args) => {
    const isUselessReactWarning =
      typeof args[0] === 'string' &&
      args[0].startsWith("Warning: Can't perform a React state");
    if (!isUselessReactWarning) error(...args);
  };
}

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    Fathom.load('KMFMXCNL', { includedDomains: ['www.bodyweight.fun'] });
  }, []);

  return (
    <AppStateProvider>
      <ThemeProvider>
        <IntlProvider locale="en">
          <Head>
            <script
              // We can't use Next.js Script. Better approach is planned.
              // https://github.com/vercel/next.js/issues/26343
              dangerouslySetInnerHTML={{
                __html: `localStorage.getItem('${storageKey}')&&document.documentElement.classList.add('loading')`,
              }}
            />
            ;``
            <meta
              name="description"
              content="A simple app to manage your calisthenics workouts."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            {/* <link rel="stylesheet" href="//basehold.it/27"></link> */}
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest"></link>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </IntlProvider>
      </ThemeProvider>
    </AppStateProvider>
  );
};

export default MyApp;
