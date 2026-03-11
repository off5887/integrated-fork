import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    gom: {
      imageBorder: string
      imageShadow: string
      glowStart: string
      levelTextStart: string
      levelTextEnd: string
      progressBg: string
      progressStart: string
      progressEnd: string
    }
    toggle: {
      bg: string
      hoverBg: string
      border: string
      shadow: string
      hoverShadow: string
    }
    card: {
      bg: string
      border: string
      itemBg: string
      itemHoverBg: string
    }
    shadow: {
      soft: string
      primary: string
      color: string
    }
    holographicGlow: string
  }

  interface PaletteOptions {
    gom?: {
      imageBorder: string
      imageShadow: string
      glowStart: string
      levelTextStart: string
      levelTextEnd: string
      progressBg: string
      progressStart: string
      progressEnd: string
    }
    toggle?: {
      bg: string
      hoverBg: string
      border: string
      shadow: string
      hoverShadow: string
    }
    card?: {
      bg: string
      border: string
      itemBg: string
      itemHoverBg: string
    }
    shadow?: {
      soft: string
      primary: string
      color: string
    }
    holographicGlow?: string
  }
}
