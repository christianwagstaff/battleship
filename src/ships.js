export default function createShip(size, name) {
  let hitLocations = Array(size).fill(0);
  function hit(location) {
    if (location > size - 1 || location < 0) {
      throw "location outside of ship size";
    }
    hitLocations[location] = 1;
    return hitLocations;
  }
  function isSunk() {
    if (hitLocations.includes(0)) {
      return false;
    } else {
      return true;
    }
  }

  return {
    name,
    size,
    hitLocations,
    hit,
    isSunk,
  };
}
