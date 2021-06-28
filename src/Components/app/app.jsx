import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import testData from '../../utils/data';
import {mainUrl} from '../../utils/constants'

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  React.useEffect(() => {
    const getData= () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch(mainUrl)
        .then(res => res.json())
        .then(({data}) => setState({ ...state, data, isLoading: false }))
        .catch(e => {
      setState({ ...state, hasError: true, isLoading: false });
      })
     }
     getData();
  },[]) 

  return (
    <>
      <AppHeader />
      {state.isLoading && 'Загрузка...'}
      {state.hasError && 'Произошла ошибка при загрузке ингридиентов'}
      {//!state.isLoading && !state.hasError && state.data.length && <Main data={state.data} />
        <Main data={testData}/>
      }
    </>
  );
}

export default App;