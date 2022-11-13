import { Router } from "./router";
import {
  AuthenticationProvider,
  GlobalDataProvider,
  VersionProvider,
} from "./providers";

const App = () => {
  /* const [isLoading, setIsLoading] = useState(false);
  const { assignCreateProps } = useDefaultFirestoreProps();

  const runScript = async () => {
    try {
      setIsLoading(true);

      const providerId = firestore.collection("providers").doc().id;
      const visitorId = firestore.collection("visitors").doc().id;

      const providersFetch = firestore
        .collection("providers")
        .doc(providerId)
        .set(assignCreateProps(mapProvider(providerId)));

      const visitorsFetch = firestore
        .collection("visitors")
        .doc(visitorId)
        .set(assignCreateProps(mapProvider(visitorId)));

      await Promise.all([providersFetch, visitorsFetch]);

      notification({ type: "success" });
    } catch (e) {
      console.log("ErrorSavingProviders:", e);
      notification({ type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const mapProvider = (id) => ({
    firstName: "GOKU",
    id: id,
  });
*/
  return (
    <VersionProvider>
      <AuthenticationProvider>
        <GlobalDataProvider>
          {/*        <Row gutter={[16, 16]}>
            <Col span={24} />
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => runScript()}
                loading={isLoading}
              >
                Ejecutar script
              </Button>
            </Col>
            <Col span={24} />
          </Row>*/}
          <Router />
        </GlobalDataProvider>
      </AuthenticationProvider>
    </VersionProvider>
  );
};

export default App;
