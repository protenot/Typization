import {
  ToDoTaskLibrary,
  createID,
  ToDoList,
  Status,
  ToDoTask,
  Filter,
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
      {
        id: 1,
        date: 1689886800000,
        content: "Погулять с кошкой",
        status: Status.Delayed,
      },
      {
        id: 2,
        date: 1689886800000,
        content: "Покормить черепаху",
        status: Status.Pending,
      },
      {
        id: 3,
        date: 1689886800000,
        content: "Купить слона",
        status: Status.Done,
      },
    ];

    localStorage.setItem("tasks", JSON.stringify(dummyTasks));
    const toDoList = new ToDoList();
    const tasks = await toDoList.getToDoTask();
    expect(tasks).toStrictEqual(dummyTasks);
  });
});
describe("updateToDoTask", () => {
  it("updates data", async () => {
    //localStorage.removeItem("tasks");
    const toDoList = new ToDoList();
    const task = {
      id: 1,
      date: Date.parse("2023-7-21"),
      content: "Погулять с попугаем",
      status: Status.Pending,
    };

    expect(await toDoList.updateToDoTask(task)).toEqual([
      {
        id: 1,
        date: 1689886800000,
        content: "Погулять с попугаем",
        status: "pending",
      },
      {
        id: 2,
        date: Date.parse("2023-7-21"),
        content: "Покормить черепаху",
        status: Status.Pending,
      },
      {
        id: 3,
        date: Date.parse("2023-7-21"),
        content: "Купить слона",
        status: Status.Done,
      },
    ]);
  });

  describe("deleteToDoTask", () => {
    it("deletes data", async () => {
      const toDoList = new ToDoList();
      const task = {
        id: 1,
        date: Date.parse("2023-7-21"),
        content: "Погулять с попугаем",
        status: Status.Pending,
      };

      expect(await toDoList.deleteToDoTask(task)).toEqual([
        {
          id: 2,
          date: Date.parse("2023-7-21"),
          content: "Покормить черепаху",
          status: Status.Pending,
        },
        {
          id: 3,
          date: Date.parse("2023-7-21"),
          content: "Купить слона",
          status: Status.Done,
        },
      ]);
    });
  });
  describe("filterToDoTask", () => {
    it("filters by date", async () => {
      localStorage.removeItem("tasks");
      const dummyTasks: ToDoTask[] = [
        {
          id: 1,
          date: 1689886900000,
          content: "Погулять с кошкой",
          status: Status.Delayed,
        },
        {
          id: 2,
          date: 1689887800000,
          content: "Покормить черепаху",
          status: Status.Pending,
        },
        {
          id: 3,
          date: 1689886800000,
          content: "Купить слона",
          status: Status.Done,
        },
      ];

      localStorage.setItem("tasks", JSON.stringify(dummyTasks));
      const toDoList = new ToDoList();
      const slon = { content: "Купить слона" };
      const data = { date: 1689886900000 } as Filter;
      const stat = { status: "pending" } as Filter;

      expect(await toDoList.filterToDoTask(slon)).toEqual([
        {
          id: 3,
          date: Date.parse("2023-7-21"),
          content: "Купить слона",
          status: Status.Done,
        },
      ]);

      expect(await toDoList.filterToDoTask(data)).toEqual([
        {
          id: 1,
          date: 1689886900000,
          content: "Погулять с кошкой",
          status: Status.Delayed,
        },
      ]);

      expect(await toDoList.filterToDoTask(stat)).toEqual([
        {
          id: 2,
          date: 1689887800000,
          content: "Покормить черепаху",
          status: Status.Pending,
        },
      ]);
    });
  });
});
