import { useRouter } from 'next/router';
import React, { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';

import {
  getVersionFromUrl,
  getUserFacingVersionString,
  replaceVersionInUrl,
} from '~/common/utilities';
import { BETA_VERSION, LATEST_VERSION, VERSIONS } from '~/constants/versions';

type Context = {
  versions: Record<string, string>;
  currentVersion: string;
  setCurrentVersion: (version: string) => void;
};

/** Create an object with { [version]: userFacingVersion } */
const versions = Object.fromEntries(
  (VERSIONS as string[]).map(version => [
    version,
    getUserFacingVersionString(version, LATEST_VERSION, BETA_VERSION),
  ])
);

/**
 * The version context keeps track of the current selected version of the API pages.
 */
export const VersionContext = createContext<Context>({
  versions,
  currentVersion: LATEST_VERSION,
  setCurrentVersion: () => {},
});

/**
 * The version provider keeps track of the current selected version.
 * It hooks into the next/router and listens to versioned route changes.
 *
 * You can update the current version by:
 *   - Sending the user to a different versioned url
 *   - Invoking `setCurrentVersion` with a different version
 */
export const VersionProvider = ({ children }: PropsWithChildren<object>) => {
  const router = useRouter();
  const [version, setVersion] = useState('');

  const setCurrentVersion = useCallback<Context['setCurrentVersion']>(
    version => {
      setVersion(version);
      router.push(replaceVersionInUrl(router.pathname, version));
    },
    [router.pathname]
  );

  useEffect(function didMount() {
    // Load the right version when mounted, fallback to latest if not found
    setVersion(getVersionFromUrl(router.pathname) || LATEST_VERSION);

    // Whenever the URL changes and contains a version, update the context
    const onRouteChange = (url: string) => {
      const newVersion = getVersionFromUrl(url);
      if (newVersion) {
        setVersion(newVersion);
      }
    };

    router.events.on('routeChangeStart', onRouteChange);

    return function didUnmount() {
      router.events.off('routeChangeStart', onRouteChange);
    };
  }, []);

  return (
    <VersionContext.Provider value={{ versions, setCurrentVersion, currentVersion: version }}>
      {children}
    </VersionContext.Provider>
  );
};
