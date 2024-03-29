import axios from 'axios';
import { createContext } from 'react';
import { serviceDefaultConfig } from './constants';

export const ServiceContext = createContext({});

function ServiceProvider(props) {
    const service = axios.create({ ...serviceDefaultConfig, ...props?.config });

    if (props.interceptors) {
        service.interceptors.request.use(...props.interceptors(service).request);
        service.interceptors.response.use(...props.interceptors(service).response);
    }

    function renderChildren() {
        if (typeof props.children === 'function') {
            return props.children(service);
        }

        return props.children;
    }

    return (
        <ServiceContext.Provider value={service}>
            {renderChildren()}
        </ServiceContext.Provider>
    );
}

export { default as useService } from './hook';

export default ServiceProvider;
