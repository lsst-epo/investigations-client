import classNames from "classnames";
import imageShape from "@/shapes/image";

const position = (x, y) => {
  if (!x && !y) return null;
  return `${x || 50}% ${y || 50}%`;
};

export default function Image({ image, className, title }) {
  const {
    url,
    url2x,
    url3x,
    width,
    height,
    altText,
    focalPointX,
    focalPointY,
  } = image;
  const style = {
    objectPosition: position(focalPointX, focalPointY),
  };

  return (
    <img
      alt={altText || title}
      className={classNames({
        [`${className}`]: !!className,
      })}
      height={height}
      src={url}
      srcSet={`${url3x} 3x, ${url2x} 2x, ${url} 1x`}
      style={style}
      width={width}
    />
  );
}

Image.displayName = "Atomic.Image";

Image.propTypes = imageShape;
