import dayjs from "dayjs";
import ptBR from "antd/locale/pt_BR";
import RouterNavigation from "./route";
import serviceInterceptors from "./contexts/service/utils/interceptors";
import { ConfigProvider } from "antd";
import { LoadingPage } from "./components";
import {
  ServiceProvider,
  AuthenticationProvider,
  SocketProvider,
} from "./contexts";
import ANTD_THEME_SETTINGS from "./utils/constants/theme";

//Global Styles
import "./assets/styles/global.css";

//DayJS
import "dayjs/locale/pt-br";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

dayjs.locale("pt-br");

function App() {
  return (
    <AuthenticationProvider storageManager={localStorage}>
      {({ isMounted, accessToken, ...restAuth }) =>
        isMounted ? (
          <ServiceProvider
            config={{ headers: { Authorization: accessToken } }}
            interceptors={serviceInterceptors({
              accessToken,
              ...restAuth,
            })}
          >
            <SocketProvider>
              <ConfigProvider theme={ANTD_THEME_SETTINGS} locale={ptBR}>
                <RouterNavigation />
              </ConfigProvider>
            </SocketProvider>
          </ServiceProvider>
        ) : (
          <LoadingPage />
        )
      }
    </AuthenticationProvider>
  );
}

export default App;
