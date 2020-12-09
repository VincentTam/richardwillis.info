# Creating a skeleton Nextjs app with TypeScript & Prettier

This post outlines the steps I take to set up a new NextJS project, and covers the following features:

- TypeScript support
- Prettier for formatting
- Eslint for linting
- VS Code settings

## Getting Started

Bootstrap a nextjs project with TypeScript support:

```sh
npx create-next-app
cd app-name
touch tsconfig.json
npm install --save-dev typescript @types/react @types/node
npm run dev
```

Setup eslint and prettier:

```sh
npm i --save-dev @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint \
  eslint-config-prettier \
  eslint-plugin-jsx-a11y \
  eslint-plugin-prettier \
  eslint-plugin-react-hooks \
  prettier
```

Configure `eslint` and `prettier` by adding the following to your `package.json`:

```json
"eslintConfig": {
  "ignorePatterns": [
    "**/*.js"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6
  },
  "overrides": [
    {
      "files": [
        "*.{ts,tsx}"
      ],
      "parser": "@typescript-eslint/parser",
      "plugins": [
        "@typescript-eslint"
      ],
      "extends": [
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint"
      ],
      "parserOptions": {
        "project": "./tsconfig.json"
      }
    }
  ]
},
"prettier": {
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.svg",
      "options": {
        "parser": "html"
      }
    }
  ]
}
```

Update vscode settings within `.vscode/setting.json`:

```json
{
  "files.exclude": {
    ".next": false,
    "package-lock.json": false
  },
  "typescript.tsc.autoDetect": "off",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.tsserver.experimental.enableProjectDiagnostics": false,
  "eslint.validate": ["javascript", "typescript"],
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "cSpell.language": "en-GB"
}
```

## Runtime helpers

### Classnames

If you're using css modules then using a utility library like `classnames` can be handy.

```sh
npm i classnames --save
```

Usage:

```jsx
import classNames from 'classnames/bind';
import STYLES from './MyComponent.module.css';
const classes = classNames.bind(STYLES);

const MyComponent = ({ className }) => {
  return <div className={classes('root', className)}></div>;
};
```

## Link Helper

The next.js link component requires you to omit the href property on the anchor tag and this conflicts with ally linting as well as just being a little weird. To workaround this it can be helpful to compose a new Link component to ignore the linting error in one place, as well as make the component easier to use by accepting HTML props.

```tsx
// Default next.js Link usage, a little weird, and shows an ally linting error as href is missing
<Link href="/blog">
  <a className={styles.card}>
    Blog
  </a>
</Link>

// New and improved composed Link component, nice and neat
<Link href="/blog" className={styles.card}>
  Blog
</Link>
```

`Link.tsx`:

```tsx
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';

export type LinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  NextLinkProps;

export const Link: React.FunctionComponent<LinkProps> = ({
  href,
  ...props
}) => {
  /* eslint-disable jsx-a11y/anchor-has-content */
  return (
    <NextLink href={href}>
      <a {...props} />
    </NextLink>
  );
};
```

## Project Organisation

I like to have my styles sitting next to my components, and organize my components into features. I use the next.js `pages` directory simply for defining my routes, but page components are stored within a `features` directory, along with all the other app features.

Here's a typical layout for a multi-page next.js app:

```sh
├── features
│   ├── layout
│   │   ├── Header
│   │   │   ├── Header.module.css
│   │   │   └── Header.tsx
│   │   ├── Link
│   │   │   └── Link.tsx
│   │   └── PageShell
│   │       ├── PageShell.module.css
│   │       └── PageShell.tsx
│   └── pages
│       ├── BlogPage
│       │   └── BlogPage.tsx
│       └── HomePage
│           ├── HomePage.module.css
│           └── HomePage.tsx
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── blog.tsx
│   └── index.tsx
├── public
│   ├── favicon.ico
├── styles
│   ├── globals.css
│   └── tokens.css
└── tsconfig.json
```

This is the contents of a route (eg `pages/index.tsx`):

```tsx
export { HomePage as default } from '../features/pages/HomePage/HomePage';
```
