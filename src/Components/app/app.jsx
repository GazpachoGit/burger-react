import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
//import testData from '../../utils/data';
import { mainUrl } from '../../utils/constants';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

function App() {

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
    bun: {},
    optional: [],
    total: 0
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

  const updateOrderTotal = () => {
    let total = 0;
    stateBurgerComponents.optional.forEach(item => {
      total += item.price;
    })
    if (stateBurgerComponents.bun)
      total += stateBurgerComponents.bun.price * 2;
    setBurgerComponents({
      ...stateBurgerComponents,
      total
    });
  }

  React.useEffect(updateOrderTotal, [stateBurgerComponents.optional, stateBurgerComponents.bun])

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
    //updateOrderTotal();
  }, [stateBurgerComponents]);

  const removeBurgerComponent = React.useCallback((item) => {
    if (item.type === 'bun') {
      setBurgerComponents({
        ...stateBurgerComponents,
        bun: null
      });
    } else {
      const newList = stateBurgerComponents.optional.filter(comp => comp._id !== item._id);
      setBurgerComponents({
        ...stateBurgerComponents,
        optional: newList
      })

    }
  }, [stateBurgerComponents])

  const showIngredientModal = React.useCallback((item) => {
    setModalDetails({
      showModal: !stateModalDetails.showModal,
      ingredient: item
    })
  }, [stateModalDetails]);

  const ingredientClickHandler = React.useCallback((item) => {
    addBurgerComponent(item);
    showIngredientModal(item);
  }, [addBurgerComponent, showIngredientModal]);

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

  return (
    <>
      <AppHeader />
        <Main
          tabs={stateTabs} />
      {stateModalDetails.showModal && currentIngredientDetails}
      {stateModalOrder.showModal && currentOrder}
    </>
    //<Main data={testData}/>

  );
}

export default App;