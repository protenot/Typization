enum Status {
  "delayed",
  "done",
  "pending",
  "cancelled",
}
interface ToDoTask {
  id: number;
  date: Date;
  content: string;
  status: Status;
}

interface Filter {
  date: Date;
  content: string;
  status: Status;
}

interface ToDoTaskLibrary {
  tasks: ToDoTask[];
  createToDoTask(task: ToDoTask): Promise<string>;
  getToDoTask(filter: Filter): Promise<Partial<ToDoTask>>;
  getAll(): Promise<ToDoTask[]>;
  updateToDoTask(
    id: number,
    updateToDoTask: Partial<ToDoTask>,
  ): Promise<Partial<ToDoTask>>;
  deleteToDoTask(id: number): Promise<void>;
}
