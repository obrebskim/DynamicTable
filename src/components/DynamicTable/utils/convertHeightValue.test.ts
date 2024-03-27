import { convertHeightValue } from "./convertHeightValue";

describe("convertHeightValue", () => {
  it("should convert a number value to pixels", () => {
    const value = 100;
    const result = convertHeightValue(value);
    expect(result).toBe("100px");
  });

  it("should return the same string value", () => {
    const value = "50%";
    const result = convertHeightValue(value);
    expect(result).toBe("50%");
  });
});
