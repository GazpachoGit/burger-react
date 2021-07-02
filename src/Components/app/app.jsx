import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
//import testData from '../../utils/data';
import { mainUrl } from '../../utils/constants';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details'

function App() {
  //data
  const [stateData, setStateData] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });
  //tabs
  const [stateTabs,] = React.useState([
    {
      id: 'bun',
      title: 'Булки'
    },
    {
      id: 'sauce',
      title: 'Соусы'
    },
    {
      id: 'main',
      title: 'Начинки'
    }
  ]);
  //constructor
  const [stateBurgerComponents, setBurgerComponents] = React.useState({
    bun: stateData.data.find(item => item.type === 'bun'),
    optional: []
  });
  //modal ingredients details
  const [stateModalDetails, setModalDetails] = React.useState(
    {
      showModal: false,
      ingredient: null
    }
  )
  //modal order details
  const [stateModalOrder, setModalOrder] = React.useState(
    {
      showModal: false,
      orderId: 1111
    }
  )

  const addBurgerComponent = React.useCallback((item) => {
    if (item.type === 'bun') {
      setBurgerComponents({
        ...stateBurgerComponents,
        bun: item
      });
    } else {
      if (!stateBurgerComponents.optional.find(comp => comp._id === item._id)) {
        setBurgerComponents({
          ...stateBurgerComponents,
          optional: [...stateBurgerComponents.optional, item]
        })
      }
    }
  }, [stateBurgerComponents]);

  const showIngredientModal = React.useCallback((item) => {
    setModalDetails({
      showModal: !stateModalDetails.showModal,
      ingredient: item
    })
  }, [stateModalDetails]);

  const showOrderModal = React.useCallback(() => {
    setModalOrder({
      ...stateModalOrder,
      showModal: !stateModalOrder.showModal
    });
  }, [stateModalOrder]);

  const currentIngredientDetails = React.useMemo(() => {
    return <Modal title="Детали ингредиента" children={<IngredientDetails item={stateModalDetails.ingredient} />} closeHandler={() => showIngredientModal(null)} />
  }, [stateModalDetails.ingredient, showIngredientModal]);

  const currentOrder = React.useMemo(() => {
    return <Modal children={<OrderDetails orderId={stateModalOrder.orderId} />} closeHandler={showOrderModal} />
  }, [stateModalOrder.orderId, showOrderModal]);


  React.useEffect(() => {
    const getData = () => {
      setStateData({ ...stateData, hasError: false, isLoading: true });
      fetch(mainUrl)
        .then(res => {
          if (res.ok)
            return res.json();
          return Promise.reject(res.status);
        })
        .then(({ data }) => setStateData({ ...stateData, data, isLoading: false }))
        .catch(e => {
          setStateData({ ...stateData, hasError: true, isLoading: false });
        })
    }
    getData();
  }, [])

  return (
    <>
      <AppHeader />
      {stateData.isLoading && 'Загрузка...'}
      {stateData.hasError && 'Произошла ошибка при загрузке ингридиентов'}
      {!stateData.isLoading && !stateData.hasError && stateData.data.length &&
        <Main tabs={stateTabs} data={stateData.data} showIngredientModal={showIngredientModal} showOrderModal={showOrderModal} />}
      {stateModalDetails.showModal && currentIngredientDetails}
      {stateModalOrder.showModal && currentOrder}
    </>
    //<Main data={testData}/>

  );
}

export default App;