interface Theme {
  colors: {
    primary: string;
    secondary: string;
    bodyColor: string;
    button: string;
    logo: string;
    text: string;
    highlight: string;
    black: string;
    white: string;
  };
}

const lightTheme:Theme = {
  colors: {
    primary: "white",
    secondary: "#3399FF",
    bodyColor: "#fff",
    button: "#f39214f2",
    logo: "#000000",
    text: "#000000",
    highlight: "#fff",
    black: "#000000",
    white: "#ffffff",
  },
};

const darkTheme:Theme = {
  colors: {
    primary: "#202123",
    secondary: "#202123",
    bodyColor: "#222529",
    button: "#f39214f2",
    logo: "#ffffff",
    text: "#ffffff",
    highlight: "#b32eb3",
    black: "#000000",
    white: "#ffffff",
  },
};

export { lightTheme, darkTheme };
