"use client";

import Link from "next/link";
import { Container } from "@rubin-epo/epo-react-lib";

const PageNotFound = () => {
  return (
    <Container>
      <h1>Page not found</h1>
      <Link href="/">Return home</Link>
    </Container>
  );
};

export default PageNotFound;
