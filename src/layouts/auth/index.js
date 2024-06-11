import React, { useState } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { SidebarContext } from "contexts/SidebarContext";


export default function Auth({ children }) {

  const [toggleSidebar, setToggleSidebar] = useState(false);
 
  const authBg = useColorModeValue("white", "navy.900");
  document.documentElement.dir = "ltr";
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}>
        <Box
          bg={authBg}
          float='right'
          minHeight='100vh'
          height='100%'
          position='relative'
          w='100%'
          transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          transitionDuration='.2s, .2s, .35s'
          transitionProperty='top, bottom, width'
          transitionTimingFunction='linear, linear, ease'>
          {children}
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
