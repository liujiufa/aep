import { createContext, useState, useEffect } from "react";

// 定义主题颜色枚举
export enum Themes {
  dark = "dark",
  light = "light",
}

interface ThemeContextOptions {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

interface IProps {
  children: JSX.Element;
}

const ThemeContext = createContext({} as ThemeContextOptions);

export const ThemeContextProvider = ({ children }: IProps): JSX.Element => {
  const [theme, setTheme] = useState<Themes>(Themes.light);

  // 使用 useEffect 来设置 data-theme 属性
  useEffect(() => {
    const currentTheme =
      (localStorage.getItem("theme") as Themes) || Themes.light;
    setTheme(currentTheme);
    document.getElementsByTagName("html")[0].dataset.theme = currentTheme;
  }, []);

  // 更新主题并保存到 localStorage
  const updateTheme = (currentTheme: Themes) => {
    setTheme(currentTheme);
    localStorage.setItem("theme", currentTheme);
    document.getElementsByTagName("html")[0].dataset.theme = currentTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
