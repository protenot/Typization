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
  createToDoTask(text?: string, task?: ToDoTask): Promise<void>;

  getToDoTask(): Promise<ToDoTask[] | []>;

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
//const x = createID();
//console.log(x);
export class ToDoList {
  /*  static createToDoTask(text: string) {
      throw new Error("Method not implemented.");
  } */
  tasks: ToDoTask[];
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  }
  async createToDoTask(text: string, task?: ToDoTask): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.tasks.find((task) => task.content === text)) {
        console.log(ToDoList);
        reject("Такая задача уже существует");
        return;
      } else {
        const newToDoTask = {
          //...task,
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
  async getToDoTask(): Promise<ToDoTask[] | []> {
    const tasks: string | null = localStorage.getItem("tasks");
    if (tasks) {
      // return JSON.parse(tasks) as ToDoTask[];
      const parsedTasks: any[] = JSON.parse(tasks);
      const formattedTasks: ToDoTask[] = parsedTasks.map((task: any) => ({
        ...task,
        date: new Date(task.date), // преобразуем строковое значение даты в объект Date
      }));
      return formattedTasks;
    }
    return [];
  }
}
