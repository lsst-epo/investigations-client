import { useRouter } from "next/router";

const usePathData = () => {
  // this returns the post-domain url goodies from the router

  const router = useRouter();
  const { asPath, pathname, query } = router;
  return { asPath, pathname, query };
};

export default usePathData;
