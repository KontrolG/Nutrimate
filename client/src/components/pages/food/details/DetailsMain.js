import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchFoodById,
  cleanFood,
  setQuantity,
  setPortionWeightInGrams
} from "../../../../actions/details";

import LoadingSpinner from "../../../LoadingSpinner";
import DetailsBody from "./DetailsBody";
import Main from "../../../layout/Main";

const DetailsMain = ({
  fetchFoodById,
  cleanFoodOnUnmount,
  setQuantity,
  setPortionWeightInGrams,
  foodId,
  isLoading,
  food,
  quantity,
  portionWeightInGrams
}) => {
  useEffect(() => {
    fetchFoodById(foodId);
    return cleanFoodOnUnmount;
  }, []);

  const foodIsAvailable = !isLoading && food;
  const details = foodIsAvailable ? (
    <DetailsBody
      {...food}
      {...{
        quantity,
        portionWeightInGrams,
        setQuantity,
        setPortionWeightInGrams
      }}
    />
  ) : (
    <LoadingSpinner />
  );

  return <Main id="foodDetails">{details}</Main>;
};

const mapStateToProps = ({ details }) => {
  return details;
};

const mapDispatchToProps = dispatch => {
  return {
    cleanFoodOnUnmount() {
      cleanFood(dispatch);
    },
    fetchFoodById(id) {
      dispatch(fetchFoodById(id));
    },
    setPortionWeightInGrams({ target }) {
      dispatch(setPortionWeightInGrams(Number(target.value)));
    },
    setQuantity({ target }) {
      dispatch(setQuantity(Number(target.value)));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsMain);
