import type { MetadataRoute } from 'next'

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
      }
    ]

  }
}