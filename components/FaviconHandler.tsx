"use client";

import { useEffect } from "react";

export default function FaviconHandler() {
  useEffect(() => {
    const defaultFavicon = "/blinklogored.png";
    const jaysonFavicon = "/jaysonicon.png";

    const setFavicon = (src: string) => {
      const link =
        document.querySelector("link[rel~='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = src;
      document.head.appendChild(link);
    };

    const handleVisibilityChange = () => {
      setFavicon(document.hidden ? jaysonFavicon : defaultFavicon);
    };

    const detectLightMode = () => {
      const isLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      if (isLight) {
        setFavicon(jaysonFavicon);
      }
    };

    detectLightMode();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", detectLightMode);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window
        .matchMedia("(prefers-color-scheme: light)")
        .removeEventListener("change", detectLightMode);
    };
  }, []);

  return null;
}
