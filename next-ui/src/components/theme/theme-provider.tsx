"use client";

import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { useMemo, PropsWithChildren } from "react";


function ThemeProvider(props: PropsWithChildren<{}>) {
  const theme = useMemo(() => extendTheme(
    {
      colorSchemes: {
        light: {
          palette: {
            primary: {
              main: '#000000',
            },
            secondary: {
              main: 'rgba(93,93,94,0.78)',
            },
          },
        },
        dark: {
          palette: {
            primary: {
              main: 'rgba(93,93,94,0.78)',
            }
          },
        },

      },
    }
  ), []);

  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      {props.children}
    </CssVarsProvider>
  );
}

export default ThemeProvider;
