import Link from "next/link";

const TestPage = () => {
  return (
    <section>
      <h2>I am just a regular page</h2>
      <p>
        My name is test/page.tsx which puts me at the /test URL. You can see my
        twin page <Link href="/taste">here</Link>
      </p>
    </section>
  );
};

export default TestPage;
