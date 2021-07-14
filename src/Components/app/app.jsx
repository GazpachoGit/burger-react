import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
//import testData from '../../utils/data';
import { mainUrl } from '../../utils/constants';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { SHOW_INGREDIENT_MODAL, SHOW_ORDER_MODAL } from '../../services/actions';


function App() {

  const { showIngredientModal, currentIngredient, showOrderModal, currentOrder } = useSelector(state => state.ingredients);

  const dispatch = useDispatch();

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



  const closeIngredientHandler = React.useCallback(() => {
    dispatch({
      type: SHOW_INGREDIENT_MODAL,
      item: null
    })
  }, [dispatch]);

  const closeOrderHandler = React.useCallback(() => {
    dispatch({
      type: SHOW_ORDER_MODAL,
      order: null
    })
  }, [dispatch]);

  const currentIngredientDetails = React.useMemo(() => {
    return <Modal title="Детали ингредиента" children={<IngredientDetails item={currentIngredient} />} closeHandler={closeIngredientHandler} />
  }, [currentIngredient, closeIngredientHandler]);

  const currentOrderModal = React.useMemo(() => {
    return <Modal children={<OrderDetails />} closeHandler={closeOrderHandler} />
  }, [closeOrderHandler]);

  return (
    <>
      <AppHeader />
      <Main />
      {showIngredientModal && currentIngredientDetails}
      {showOrderModal && currentOrderModal}
    </>
    //<Main data={testData}/>

  );
}

export default App;