/// <reference types="vite/client" />

// Vite resolves a .pdf import to its served URL; declare it so TypeScript agrees.
declare module '*.pdf' {
  const src: string
  export default src
}
