import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvaliableMeals.module.css';

import axios from 'axios';


const AvaliableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const getMeals = async () => {
      const response = await axios.get('https://react-udemy-http-b9e21-default-rtdb.firebaseio.com/meals.json')
      .catch(error => {
        setHttpError(error.message);
      });

      const responseData = response.data;

      const mealsArray = [];

      for(const key in responseData) {
        mealsArray.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      };
      setMeals(mealsArray);
      setIsLoading(false);
    }
    getMeals();
  }, []);

  if(isLoading) {
    return <section className={classes['meals-loading']}>
      Loading...
    </section>
  };

  if(httpError) {
    return <section className={classes['meals-error']}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map(meal => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
  ));

  return (
      <section className={classes.meals}>
          <Card>
              <ul>{mealsList}</ul>
          </Card>
      </section>
  );
};

export default AvaliableMeals;
