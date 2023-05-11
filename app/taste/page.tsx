import Link from "next/link";

const TastePage = () => {
  return (
    <section>
      <h2>I am a tasty page</h2>
      <p>
        I am like the <Link href="/test">test page</Link> except my name is
        taste, I live in taste/page.tsx and my url is /taste.
      </p>
    </section>
  );
};

export default TastePage;
