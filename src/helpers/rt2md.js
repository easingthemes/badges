export function rt2md(source) {
  return source
    .replace(/h1./g, '#')
    .replace(/h2./g, '##')
    .replace(/h3./g, '###')
    .replace(/h4./g, '####')
    .replace(/h5./g, '#####');
}
