# Convex

[![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat)](https://thecom.netlify.com) [![npm version](https://img.shields.io/npm/v/@the.com/convex.svg?label=@the.com/convex)](https://www.npmjs.com/package/@the.com/convex)

> Design system and React components for [The.com light app](https://app.the.com).

Very much still a work in progress. Comments and feedback welcome.

## Components

### Icon

```sh
convex
└── src
    └── components
	    └── Icon
		    ├── icons/
			├── raw/
			├── Icon.tsx
			└── [...etc]
```

New `.svg` files (exported from Figma or otherwise) should be placed in the `raw/` directory. The only attribute these SVG files should have is `viewBox`. No `height`, `width`, `fill`, `xmlns`, etc.

After that, two helper scripts are provided:

```sh
yarn generate-icon-metadata
yarn generate-icons
```

The first script (`generate-icon-metadata`) creates empty `.yml` files for each new SVG for storing icon metadata.

The next script (`generate-icons`) properly sets up JavaScript imports for these SVGs so that they can be consumed by the Icon component.
