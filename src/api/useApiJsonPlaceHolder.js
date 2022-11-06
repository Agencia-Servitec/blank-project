import { apiJsonPlaceHolder } from "../firebase";
import useFetch from "use-http";

export const useApiJsonPlaceHolder = (pathname, deps = []) => {
  // correct parameters of cache policy
  const options = {
    cachePolicy: "no-cache",
  };

  return useFetch(apiJsonPlaceHolder + pathname, options, deps);
};
