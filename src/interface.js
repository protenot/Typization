var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
export var Status;
(function (Status) {
  Status["Delayed"] = "delayed";
  Status["Done"] = "done";
  Status["Pending"] = "pending";
  Status["Cancelled"] = "cancelled";
})(Status || (Status = {}));
export function createID() {
  return Math.floor(Math.random() * 1000);
}
export class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  }
  createToDoTask(text, task) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => {
        if (this.tasks.some((t) => t.content == task.content)) {
          reject("Такая задача уже существует");
        } else {
          const newToDoTask = Object.assign(Object.assign({}, task), {
            id: createID(),
            date: new Date(),
            content: text,
            status: Status.Pending,
          });
          this.tasks.push(newToDoTask);
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
          resolve("Задача создана");
        }
      });
    });
  }
}
