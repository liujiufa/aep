import React, { useRef } from "react";

// 自定义 Hook
export const useScrollPosition = (ref: any) => {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        setScrollPosition(ref.current.scrollTop);
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref]);

  return scrollPosition;
};
