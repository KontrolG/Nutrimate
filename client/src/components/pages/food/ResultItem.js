import React from "react";
import Icon from "../../Icon";
import NutrientAmount from "../../NutrientAmount";
import MacrosList from "../../MacrosList";

const ResultItem = ({
  fdcId,
  description,
  calories,
  portion,
  protein,
  carbohydrate,
  fat
}) => {
  return (
    <li>
      <a className="results__fig" href={`#${fdcId}`} title={description}>
        <div className="results__summary">
          <p className="results__calories calories">
            <Icon name="bolt" />
            <NutrientAmount nutrient={calories} />
          </p>
          <hr />
          <p className="results__portion">
            <Icon name="plate" />
            <span>{portion.gramWeight}</span> g
          </p>
        </div>
        <div className="results__info">
          <h4 className="results__name text__with__ellipsis">{description}</h4>
          <MacrosList
            macros={[protein, carbohydrate, fat]}
            className="results__macros"
          />
        </div>
      </a>
    </li>
  );
};

export default ResultItem;
