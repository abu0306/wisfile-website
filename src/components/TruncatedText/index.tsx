import { Tooltip } from "antd";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

interface TruncatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  title: string;
}

const TruncatedText = (props: TruncatedTextProps) => {
  const { title, children } = props;
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      const element = textRef.current;
      if (element) {
        setIsTruncated(
          (element as HTMLElement).scrollWidth >
            (element as HTMLElement).clientWidth
        );
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [title]);

  return (
    <div
      {...props}
      className={classNames("overflow-hidden", props.className)}
      ref={props.ref}
    >
      <Tooltip
        title={title}
        placement="top"
        open={isTruncated ? undefined : false}
      >
        <div
          ref={textRef}
          className={classNames("w-full truncate", props.className)}
        >
          {children}
        </div>
      </Tooltip>
    </div>
  );
};

export default TruncatedText;
