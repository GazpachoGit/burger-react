import React from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Data from '../../utils/data'

function App() {
  const data = Data.data
  return (
    <div>
      <AppHeader />
      <Main data={data} />
    </div>
  );
}

export default App;
