import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "mindX Institute",
    short_name: "mindX",
    description: "Learn, Build, Grow. Coaching classes & skill courses in Rajkot, Gujarat.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      {
        src: "/mindx-logo.png",
        sizes: "866x288",
        type: "image/png",
      },
    ],
  };
}