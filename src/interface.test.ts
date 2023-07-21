import {
  ToDoTaskLibrary,
  createID,
  ToDoList,
  Status,
  ToDoTask,
} from "./interface";
describe("ToDoTaskLibrary", () => {
  let toDoTaskLibrary: ToDoTaskLibrary;

  /*   beforeEach(() => {
      toDoTaskLibrary = new ToDoTaskLibrary();
    });
   */
  afterEach(() => {
    localStorage.removeItem("tasks");
  });

  describe("createID", () => {
    it("creates ID", () => {
      expect(createID()).toBeGreaterThanOrEqual(1);
    });
  });

  describe("createToDoTask", () => {
    //const text:string = "Погулять с собакой";
    it("should create a new task and add it to the array", async () => {
      const toDoList = new ToDoList();
      const text: string = "Погулять с кошкой";
      await toDoList.createToDoTask(text);
      //console.log(toDoList);
      expect(toDoList.tasks.length).toBe(1);

      expect(toDoList.tasks[0]).toBeInstanceOf(Object);
      expect(toDoList.tasks[0].content).toBe("Погулять с кошкой");
      expect(toDoList.tasks[0].status).toBe("pending");
    });

    it("should reject to create new task if content already exists", async () => {
      const toDoList1 = new ToDoList();
      const existingTask = {
        id: 111,
        date: new Date(),
        content: "Погулять с собакой",
        status: Status.Done,
      };
      toDoList1.tasks.push(existingTask);
      console.log(toDoList1.tasks);
      const text: string = "Погулять с собакой";

      try {
        await toDoList1.createToDoTask(text);
      } catch (error) {
        expect(error).toBe("Такая задача уже существует");
      }
      console.log(toDoList1.tasks);

      expect(toDoList1.tasks.length).toBe(1);
    });
  });
  /*  describe('getToDoTask',()=>{
    it ('returns data from localStorage',()=>{
       
        const text:string = "Полить цветы";
         toDoList.createToDoTask(text);
        let result =  toDoList.getToDoTask()
        expect(result).toBeDefined();
        expect(result).toBe (null)
    })*/
});
describe("getToDoTask", () => {
  it("should return an empty array when there are no tasks", async () => {
    const toDoList = new ToDoList();
    const tasks = await toDoList.getToDoTask();
    expect(tasks).toEqual([]);
  });
  it("should return an array of tasks when tasks exist in local storage", async () => {
    const dummyTasks: ToDoTask[] = [
      { id: 1, date: new Date(), content: "Task 1", status: Status.Delayed },
      { id: 2, date: new Date(), content: "Task 2", status: Status.Pending },
      { id: 3, date: new Date(), content: "Task 3", status: Status.Done },
    ];

    localStorage.setItem("tasks", JSON.stringify(dummyTasks));
    const toDoList = new ToDoList();
    const tasks = await toDoList.getToDoTask();
    expect(tasks).toStrictEqual(dummyTasks);
  });
});
