import { useContext } from 'react';
import { AuthenticationContext } from '.';

function useAuthentication() {
  return useContext(AuthenticationContext);
}

export default useAuthentication;
