# ML Engineer 2 — Evaluation Report

## Priority Classifier (XGBClassifier)

|Metric|Score|
|-|-|
|Accuracy|0.9972|
|Precision|0.9955|
|Recall|1.0000|
|F1 Score|0.9977|

## Duration Regressor (XGBRegressor)

|Metric|Value|
|-|-|
|MAE|125.90 minutes|
|RMSE|1368.90 minutes|

## Notes

* Priority Classifier achieves near-perfect performance.
* Duration Regressor RMSE is high due to extreme outliers in resolution\_minutes (max: 44613 min).
* Log transform applied to resolution\_minutes before training; predictions inverse-transformed via expm1.
* Models saved as .joblib for optimized sklearn/XGBoost serialization.

