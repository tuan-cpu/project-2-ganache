import React, { useState, useContext, createContext } from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeCart, setActiveCart] = useState(true);
  const [activeChat, setActiveChat] = useState(false);
  const [activeNotification, setActiveNotification] = useState(false);
  const [activeUserProfile, setActiveUserProfile] = useState(false);
  const [isClicked, setIsClicked] = useState(initialState);
  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
  };
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        setCurrentColor,
        currentMode,
        currentColor,
        setMode,
        setColor,themeSettings, 
        setThemeSettings,
        activeCart,
        setActiveCart,
        activeChat, activeNotification,setActiveChat,setActiveNotification,activeUserProfile, setActiveUserProfile
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
