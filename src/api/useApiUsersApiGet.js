import React, { useCallback } from "react";
import { useApiJsonPlaceHolder } from "./useApiJsonPlaceHolder";

export const useApiUsersApiGet = () => {
  const { get, loading, error } = useApiJsonPlaceHolder("/users");

  const getUsersApi = useCallback(() => {
    return get();
  }, [get]);

  return {
    getUsersApi,
    getUsersApiLoading: loading,
    getUsersApiError: error,
  };
};
