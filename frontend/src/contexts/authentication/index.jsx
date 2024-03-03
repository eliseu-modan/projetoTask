import { createContext, useEffect, useState } from "react";
import AuthStorageManager from "./AuthStorageManager";

export const AuthenticationContext = createContext({});

function AuthenticationProvider(props) {
  const [authManager] = useState(new AuthStorageManager(props.storageManager));
  const [authData, setAuthData] = useState();
  const [accessToken, setAccessToken] = useState();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await getAuthenticationAsync();
      } catch (error) {
        console.error("Erro ao obter autenticação:", error);
      } finally {
        setIsMounted(true);
      }
    }

    fetchData();
  }, []);

  async function setAuthenticationAsync(authProps) {
    await authManager.setAuthentication(authProps).then(() => {
      setAccessToken(authProps.accessToken);
      setAuthData(authProps.authData);
    });

    return authProps;
  }

  async function getAuthenticationAsync() {
    await authManager
      .getAuthentication()
      .then((authProps) => {
        setAuthData(authProps.authData);
        setAccessToken(authProps.accessToken);
      })
      .finally(() => setIsMounted(true));
  }

  async function clearAuthenticationAsync() {
    await authManager
      .clearAuthentication()
      .then(() => {
        setAuthData(undefined);
        setAccessToken(undefined);
      })
      .finally(() => setIsMounted(true));
  }

  function renderChildren() {
    if (typeof props.children === "function") {
      return props.children({
        isMounted,
        authData,
        accessToken,
        setAuthenticationAsync,
        clearAuthenticationAsync,
      });
    }

    return isMounted && props.children;
  }

  return (
    <AuthenticationContext.Provider
      value={{
        authData,
        accessToken,
        setAuthenticationAsync,
        clearAuthenticationAsync,
      }}
    >
      {renderChildren()}
    </AuthenticationContext.Provider>
  );
}

export { default as useAuthentication } from "./hook";

export default AuthenticationProvider;
