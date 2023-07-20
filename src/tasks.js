var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
export const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
];
export const getUserOrderStates = (orderStates) => {
  const filteredStates = [];
  orderStates.forEach((element) => {
    if (element !== "buyingSupplies" && element !== "producing") {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};
export const getOrderState = (order) => order.state;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = (obj, keyToOmit) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _a = obj,
    _b = keyToOmit,
    _ = _a[_b],
    withoutKey = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
  return withoutKey;
};
export const filterOnlyInitialAndInWorkOrder = (order) => {
  if (order.state === "initial" || order.state === "inWork") {
    return order;
  }
  return null;
};
// Hint: infer
export const getDefaultProps = (component) => {
  return component.defaultProps;
};
