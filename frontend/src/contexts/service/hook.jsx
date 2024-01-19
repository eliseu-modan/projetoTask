import { useContext } from 'react';
import { ServiceContext } from '.';

function useService() {
    return useContext(ServiceContext);
}

export default useService;
