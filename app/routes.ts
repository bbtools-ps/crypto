import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  layout('./routes/layout.tsx', [
    index('./routes/home.tsx'),
    route('caesar-cipher', './routes/caesar-cipher.tsx'),
    route('emoji-cipher', './routes/emoji-cipher.tsx'),
    route('vigenere-cipher', './routes/vigenere-cipher.tsx'),
    route('about', './routes/about.tsx'),
  ]),
] satisfies RouteConfig;
