import React from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Data from '../../utils/data'

function App() {
  const data = Data.data
  return (
    <>
      <AppHeader />
      <Main data={data} />
    </>
  );
}

export default App;
