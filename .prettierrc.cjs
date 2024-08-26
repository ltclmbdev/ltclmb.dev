module.exports = {
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '^react$',
    '^next(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]',
  ],
}
