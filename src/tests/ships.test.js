import createShip from "../ships";

describe("Ship Factory Function", () => {
  it("creates an object with the ship size", () => {
    expect(createShip(5, "carrier")).toMatchObject({ size: 5 });
  });
  it("creates an object with the ship name", () => {
    expect(createShip(5, "carrier")).toMatchObject({ name: "carrier" });
  });
  it("logs when it has been hit", () => {
    const ship = createShip(5, "carrier");
    expect(ship.hit(3)).toMatchObject([0, 0, 0, 1, 0]);
    expect(ship.hit(2)).toMatchObject([0, 0, 1, 1, 0]);
  });
  it("checks if the ship has been sunk", () => {
    const ship = createShip(2, "tug boat");
    expect(ship.isSunk()).toBe(false);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBe(true);
  });
  it("doesn't allow hits outside of ship size", () => {
    const ship = createShip(3, "cruiser");
    expect(() => ship.hit(5)).toThrow();
    expect(() => ship.hit(-2)).toThrow();
  });
});
