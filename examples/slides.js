import Jsmoo, { after, before } from 'jsmoo'

class Car extends Jsmoo {
  beforeInitialize(args) {
    if (args.brand === 'H') args.brand = 'Honda';
    return args;
  }
  afterInitialize() { this.created_at = new Date() }
  doorsBuiler() { return 4 }
}

Car.prototype.triggerDoors = function(newValue, oldValue) {
  this.is_big = newValue >= 4 ? true : false
}

function calculateWeight() {
  return new Promise((resolve, reject) => {
    console.log('calculating ...');
    setTimeout(() => {
      resolve(600)
    }, 1000)
  })
}

function convertStringToNumber(value) { return parseInt(value) }

Car.has({
  brand:      { is: 'ro', isa: 'String', required: true },
  created_at: { is: 'rw', isa: 'Date' },
  wheels:     { is: 'rw', isa: 'Number', default: 4, coerce: convertStringToNumber },
  weight:     { is: 'ro', lazy: true, predicate: true, default: calculateWeight, clearer: true },
  doors:      { is: 'rw', isa: 'Number', builder: 'doorsBuiler', trigger: true, coerce: convertStringToNumber },
  is_big:     { is: 'rw', isa: 'Boolean' }
});

before(Car.prototype, 'save', function() {
  console.log('Before save ...');
})

Car.prototype.save = function() {
  console.log('Saving ');
}

after(Car.prototype, 'save', function() {
  console.log('After save ...')
})

const car = new Car({ brand: 'H', doors: "4", wheels: "5" });
console.log(car.hasWeight())
//car.save()
//car.weight.then(w => console.log(w));
//car.clearWeight();
//car.weight.then(w => console.log(w));
