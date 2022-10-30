import { Router } from "./router";
import {
  AuthenticationProvider,
  GlobalDataProvider,
  VersionProvider,
} from "./providers";

const App = () => (
  <VersionProvider>
    <AuthenticationProvider>
      <GlobalDataProvider>
        <Router />
      </GlobalDataProvider>
    </AuthenticationProvider>
  </VersionProvider>
);

export default App;
