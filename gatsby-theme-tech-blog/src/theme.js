import prismTheme from '@theme-ui/prism/presets/shades-of-purple.json';

export const theme = {
  space: [0, 4, 8, 16, 32],
  fonts: {
    body: "Content-font, Roboto, sans-serif;",
  },
  fontSizes: {
    "normal": "1.2rem",
    "xl": "1.5rem",
    "2xl": "2rem",
    "3xl": "2.5rem",
    "4xl": "3rem"
  },
  lineHeights: {
    body: 1.7,
    heading: 1.1,
  },
  colors: {
    gray: ["#edf2f7", "#e2e8f0", "#cbd5e0", "#a0aec0", "#718096", "#4a5568", "#2d3748","#1a202c"],
    background: "#edf2f7",
    primary: prismTheme[".number,.boolean"].color,
    dark: "#262B34",
    primaryDark: prismTheme.color,
  },
  sizes: {
    default: "90vw",
    max: "56rem",
    main: "66.6667%",
    aside: "33.3333%",
    full: "100%"
  },
  margins: {
    titles: "margin: 20px 0 10px"
  },
  shadows:{
    materialDesign: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);'
  },
  fontWeights:{
    "bold": 700,
    "semibold": 600,
    "regular": 500,
    "body": 400
  },
  text: {
    secondary: {
      color: 'gray.4',
      display: 'inline-block'
    },
    heading: {
      color: 'gray.7'
    }
  },
  blocks:{
    dark:{
      px: 12,
      py:6,
      backgroundColor: prismTheme.backgroundColor,
      color: prismTheme.color
    },
    card: {
      maxWidth: '100%',
      boxShadow:'materialDesign',
      borderRadius: 8,
      overflow:'hidden'
    },
    flexContainer:{
      display: 'flex',
      flexWrap: 'wrap'
    },
    circleBadge:{
      borderRadius: "100%",
      width: "1.5rem",
      height: "1.5rem",
      display: "flex",
      aligItems: "center",
      justifyContent: "center",
      fontSize: "0.8rem",
      lineHeight:"1.3rem"
    }
  },
  lists:{
    noList:{
      listStyleType:"none",
      p:0
    }
  },
  buttons: {
    flat: {
      textTransform: 'uppercase',
      color: 'primary',
      p: 1,
      textDecoration:"none",
      fontWeight:"semibold"
    }
  },
  styles: {
    Layout: {
      color: "gray.6",
      fontFamily: "body",
      fontWeight: "body",
      fontSize: "normal",
      lineHeight: "body",
    },
    Header: {
      fontWeight: "bold",
      padding: 3,
      a: {
        color: "inherit",
      },
    },
    Main: {
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: "max",
      width: "default",
    },
    h1:{
      fontSize: "4xl",
      fontWeight: "semibold",
      lineHeight: "heading",
      margin: "titles",
      color: prismTheme.backgroundColor
    },
    h2: {
      fontSize: "3xl",
      fontWeight: "normal",
      lineHeight: "heading",
      margin: "titles",
      color: 'gray.7'
    },
    h3:{
      margin: "titles",
      fontSize: "2xl",
      fontWeight: "normal",
      color: 'gray.7'
    },
    h4: {
      margin: "titles",
      fontSize: "xl",
      fontWeight: "normal",
      color: 'gray.7'
    },
    h5: {
      margin: "titles",
      fontWeight: "normal",
      color: 'gray.7'
    },
    img:{
      maxWidth: '100%'
    },
    p:{
      margin: "0 0 22px"
    },
    pre: {
      ...prismTheme,
      padding: 18,
      borderRadius: 4,
      overflowX: 'scroll'
    },
    code:{
      background: prismTheme.backgroundColor,
      color: prismTheme.color,
      padding: 1,
      borderRadius: 4
    }    
  },
}
export default theme