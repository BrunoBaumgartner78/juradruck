// Statische Asset-Module (Importe wie `import model from './truck.glb'`)
declare module '*.glb' {
  const src: string
  export default src
}
declare module '*.gltf' {
  const src: string
  export default src
}
declare module '*.pdf' {
  const src: string
  export default src
}

// Drei/GLTF Typsupport (optional, wenn du useGLTF typisieren willst)
declare namespace JSX {
  interface IntrinsicElements {
    primitive: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { object: any }
  }
}

export {}
