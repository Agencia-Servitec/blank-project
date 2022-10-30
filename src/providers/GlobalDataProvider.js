import React, { createContext, useContext, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import { useAuthentication } from "./Authentication";
import { notification, Spinner } from "../components/admin/ui";
import { orderBy } from "lodash";

const GlobalDataContext = createContext({
  customers: [],
  providers: [],
  visitors: [],
});

export const GlobalDataProvider = ({ children }) => {
  const { authUser } = useAuthentication();

  const [customers = [], customersLoading, customersError] = useCollectionData(
    firestore.collection("customers").where("isDeleted", "==", false)
  );

  const [providers = [], providersLoading, providersError] = useCollectionData(
    firestore.collection("providers").where("isDeleted", "==", false)
  );

  const [visitors = [], visitorsLoading, visitorsError] = useCollectionData(
    firestore.collection("visitors").where("isDeleted", "==", false)
  );

  const error = customersError || providersError || visitorsError;
  const loading = customersLoading || providersLoading || visitorsLoading;

  useEffect(() => {
    error && notification({ type: "error" });
  }, [error]);

  if (loading) return <Spinner height="100vh" />;

  return (
    <GlobalDataContext.Provider
      value={{
        customers: orderBy(customers, "createAt", ["asc"]),
        providers: orderBy(providers, "createAt", ["asc"]),
        visitors: orderBy(visitors, "createAt", ["asc"]),
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);
