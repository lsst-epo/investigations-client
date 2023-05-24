import { FunctionComponent } from "react";

interface PageProps {
  params: { lang: string; uriSegments: string[] };
}

const Page: FunctionComponent<PageProps> = ({
  params: { lang, uriSegments },
}) => {
  return (
    <section>
      Language: {lang}
      <ul>
        {uriSegments.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>
    </section>
  );
};

export default Page;
