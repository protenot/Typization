export enum Status {
  Delayed = "delayed",
  Done = "done",
  Pending = "pending",
  Cancelled = "cancelled",
}
export interface ToDoTask {
  id: number;
  date: Date;
  content: string;
  status: Status;
}

export interface Filter {
  date: Date;
  content: string;
  status: Status;
}

export interface ToDoTaskLibrary {
  //tasks: ToDoTask[];
  createToDoTask(text?: string, task?: ToDoTask): Promise<string>;
  getToDoTask(task: ToDoTask): Promise<Partial<ToDoTask>>;
  getAll(): Promise<ToDoTask[]>;
  updateToDoTask(
    id: number,
    updateToDoTask: Partial<ToDoTask>,
  ): Promise<Partial<ToDoTask>>;
  deleteToDoTask(id: number): Promise<void>;
  filterDates(date: Date): Promise<ToDoTask | ToDoTask[] | undefined>;
  filterContent(content: string): Promise<ToDoTask | ToDoTask[] | undefined>;
  filterStatus(status: Status): Promise<ToDoTask | ToDoTask[] | undefined>;
}
export function createID(): number {
  return Math.floor(Math.random() * 10000);
}
const x = createID();
console.log(x);
export class ToDoList {
  tasks: ToDoTask[];
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  }
  async createToDoTask(text: string, task?: ToDoTask): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.tasks.some((t) => t.content == task.content)) {
        reject("Такая задача уже существует");
      } else {
        const newToDoTask = {
          ...task,
          id: createID(),
          date: new Date(),
          content: text,
          status: Status.Pending,
        };
        this.tasks.push(newToDoTask);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        resolve("Задача создана");
      }
    });
  }
}
