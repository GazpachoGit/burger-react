import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Data from '../../utils/data'

function App() {
  return (
    <>
      <AppHeader />
      <Main data={Data} />
    </>
  );
}

export default App;