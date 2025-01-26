import type {MetadataRoute} from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Assignment Tracker',
    short_name: 'Assignment Tracker',
    description: 'A simple web app designed to help students keep track of their assignments.',
    start_url: '/assignments',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: "icon.svg",
        type: "image/svg+xml",
        sizes: "any"
      },
      {
        purpose: "maskable",
        sizes: "1024x1024",
        src: "maskable_icon.png",
        type: "image/png"
      }
    ],
    screenshots: [
      {
        src: "/desktop-screenshot.jpeg",
        sizes: "1788x892",
        type: "image/jpeg",
        form_factor: "wide"
      },
      {
        src: "/mobile-screenshot.png",
        sizes: "1290x2796",
        type: "image/png",
        form_factor: "narrow"
      }
    ]
  }
}