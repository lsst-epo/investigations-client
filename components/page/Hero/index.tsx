import * as Styled from "./styles";

interface HeroProps {
  heroText: string | null;
}

export default function Hero({ heroText }: HeroProps) {
  // TODO: Added to fill the lack of content that will arise during releasing the CMS to prod. Remove after the release.
  if (!heroText) {
    heroText = "Explore exciting topics in astronomy and astrophysics with our user-friendly investigation tools.";
  }
  return (
    <Styled.Hero>
      <h2>Welcome to Rubin Observatory’s Investigations!</h2>
      <p>{heroText}</p>
    </Styled.Hero>
  );
}
