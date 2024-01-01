"use client";

import { useEffect, useState } from "react";

const useDisplay = (param?: number) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    function reportWindowSize() {
      if (param) {
        if (window.innerWidth < param) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
        return;
      }

      if (window.innerWidth < 1200) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    reportWindowSize();

    window.addEventListener("resize", reportWindowSize);

    return () => window.removeEventListener("resize", reportWindowSize);
  }, [param]);

  return !!isMobile;
};

export { useDisplay };
