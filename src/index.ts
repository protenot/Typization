import {
  getUserOrderStates,
  getOrderState,
  Order2,
  StateOrder,
  omit,
  filterOnlyInitialAndInWorkOrder,
  getDefaultProps,
} from "./tasks";

const order1 = getUserOrderStates([
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
]);
const div1 = document.createElement("div");
document.body.append(div1);
div1.innerText = `1. В функцию приходит массив состояний заказа и фильтруется
   Нужно заменить FIXME на тип который вычисляется на основе OrderState\n 
    На входе массив [ "initial","inWork", "buyingSupplies", "producing", "fullfilled"]\n
   Результат : ${order1}`;
const ord11: Order2 = {
  state: "initial",
  sum: 18,
};
const order2: StateOrder = getOrderState(ord11);
const div2 = document.createElement("div");
document.body.append(div2);
div2.innerText = `2. Есть объединение (юнион) типов заказов в различных состояниях
   Нужно заменить FIXME на тип который достанет из Order все возможные состояния (state) \n
   На входе объект {state: "initial",sum: 18}\n
   Результат  : ${order2}`;
const obj = { state: "fullfilled", sum: 10, workerId: 1452, suppliesSum: 156 };
const key = "sum";
const order3 = omit(obj, key);
const div3 = document.createElement("div");
document.body.append(div3);
div3.innerText = `3. Есть общая функция omit которая удаляет поле из объекта и возвращает его без этого поля
    Нужно заменить FIXME на соответствующий тип \n
    На входе объект {state: "fullfilled", sum: 10, workerId: 1452, suppliesSum: 156}\n
    И ключ 'sum'\n
    Результат: ${order3}`;

const order4 = filterOnlyInitialAndInWorkOrder({
  state: "producing",
  sum: 15,
  workerId: 16,
  suppliesSum: 17,
  produceEstimate: new Date(),
});

const div4 = document.createElement("div");
document.body.append(div4);
div4.innerText = `4. Есть объединение (юнион) типов заказов в различных состояниях
    и функция filterOnlyInitialAndInWorkOrder которая принимает заказы в любых состояниях
    А возвращает только initial и inWork
    Нужно заменить FIXME на правильный тип вычисленный на основе Order \n
    На входе объект {state: "producing", sum: 15, workerId: 16, suppliesSum: 17,produceEstimate:new Date}\n
    Результат${order4}`;
const component = {
  sum: 15,
  defaultProps: 10,
};

const order5 = getDefaultProps(component);
const div5 = document.createElement("div");
document.body.append(div5);
div5.innerText = `5. Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
    Нужно заменить FIXME на правильный тип\n
    На входе объект {sum:15, defaultProps:10}\n
    Результат ${order5}`;
