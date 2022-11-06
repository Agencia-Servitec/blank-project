import React, { useCallback } from "react";
import { useApiJsonPlaceHolder } from "./useApiJsonPlaceHolder";

export const UseApiPostsGet = () => {
  const { get, loading, error } = useApiJsonPlaceHolder("/posts?&_limit=10");

  const getPosts = useCallback(async () => {
    return get();
  }, [get]);

  return {
    getPosts,
    getPostsLoading: loading,
    getPostsError: error,
  };
};
