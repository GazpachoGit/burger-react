import styles from './ingredient-details.module.css';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';


export default function IngredientDetails() {
    const { id } = useParams<{ id: string }>();
    const currentIngredient = useSelector(state => state.ingredients.ingredients.find(item => item._id === id));
    const isIngredientsLoading = useSelector(state => state.ingredients.ingredientsRequest);
    const ingredientsLoadFailed = useSelector(state => state.ingredients.ingredientsFailed);

    if (isIngredientsLoading) return <p>Загрузка...</p>


    //const currentIngredient = useSelector(state => state.ingredients.currentIngredient);
    return (
        <>
            {ingredientsLoadFailed ? <p>Произошла ошибка загрузки</p> :
                !currentIngredient ? <p>ингредиент не найден</p> :
                    <>
                        <img alt={currentIngredient.name} src={currentIngredient.image} />
                        <p className="text text_type_main-default pt-4">{currentIngredient.name}</p>
                        <div className={styles.composition + ' pt-8'}>
                            <span className="text text_type_main-default">Калории, ккал<br />{currentIngredient.calories}</span>
                            <span className="text text_type_main-default">Белки, г<br />{currentIngredient.proteins}</span>
                            <span className="text text_type_main-default">Жиры, г<br />{currentIngredient.fat}</span>
                            <span className="text text_type_main-default">Углеводы, г<br />{currentIngredient.carbohydrates}</span>
                        </div>
                    </>
            }
        </>
    )
}





