import Jsmoo, { Role } from 'jsmoo'

// ========= Vehicle Rol ===========

class Vehicle extends Role { }

Vehicle.has({
  brand:  { is: 'rw', isa: 'String', required: true },
  wheels: { is: 'rw', isa: 'Number', builder: true },
  doors:  { is: 'rw', isa: 'Number', required: true }
});

// ========== Car class =========
class Car extends Jsmoo {
  buildWheels() { return 4 }
}

Car.does(Vehicle)

// ========== Motorcycle class ======
class Motorcycle extends Jsmoo {
  buildWheels() { return 2 }
}

Motorcycle.does(Vehicle)

Motorcycle.has({
  '+doors': { required: false, default: 0 }
})

//=========== Example =============

const car = new Car({ brand: 'Audi', doors: 4 });
const motorcycle = new Motorcycle({ brand: 'BMW' });

console.log("Car: ", car.brand, car.wheels, car.doors);
console.log("Motorcycle: ", motorcycle.brand, motorcycle.wheels, motorcycle.doors);
