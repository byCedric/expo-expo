import { Global } from '@emotion/react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import React, { PropsWithChildren, useEffect } from 'react';

import { nprogressStyle } from './styles';

export const ProgressProvider = ({ children }: PropsWithChildren<object>) => {
  const router = useRouter();

  useEffect(function didMount() {
    const onStart = () => NProgress.start();
    const onFinish = () => NProgress.done();

    router.events.on('routeChangeStart', onStart);
    router.events.on('routeChangeComplete', onFinish);
    router.events.on('routeChangeError', onFinish);

    return function didUnmount() {
      router.events.off('routeChangeStart', onStart);
      router.events.off('routeChangeComplete', onFinish);
      router.events.off('routeChangeError', onFinish);
    };
  }, []);

  return (
    <>
      <Global styles={nprogressStyle} />
      {children}
    </>
  );
};
