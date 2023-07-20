import { createID } from "./interface";

describe("createID", () => {
  it("creates ID", () => {
    expect(createID()).toBeGreaterThanOrEqual(1);
  });
});
