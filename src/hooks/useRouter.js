import { useMemo } from "react";
import {
  useParams,
  useLocation,
} from "react-router-dom";
import queryString from "query-string";

export const useRouter = () => {
  const params = useParams();
  const location = useLocation();


  return useMemo(() => {
    return {
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params,
      },
      location,
    };
  }, [params, location,]);
}

export default useRouter;