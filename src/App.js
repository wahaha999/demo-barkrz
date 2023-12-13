import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import AppRoutes from './router';
import { BrowserRouter } from 'react-router-dom';
import AppContext from './AppContext';
import {LayoutProvider} from './LayoutProvider'
import theme from './styles/theme';

function App() {
  const [context, setContext] = useState();

  return (
    <AppContext.Provider value={[context, setContext]}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <LayoutProvider>
            <AppRoutes />
          </LayoutProvider>
        </BrowserRouter>
      </ThemeProvider>      
    </AppContext.Provider>
  );
}

export default App;
