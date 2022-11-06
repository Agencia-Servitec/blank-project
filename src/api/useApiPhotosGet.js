import React, { useCallback } from "react";
import { useApiJsonPlaceHolder } from "./useApiJsonPlaceHolder";

export const useApiPhotosGet = () => {
  const { get, loading, error } = useApiJsonPlaceHolder("/photos?&_limit=10");

  const getPhotos = useCallback(async () => {
    return get();
  }, [get]);

  return {
    getPhotos,
    getPhotosLoading: loading,
    getPhotosError: error,
  };
};
