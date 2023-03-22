const Employee = require('../Employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employee', () => {

  it('should throw an error if no "name" arg', () => {


    const dep = new Employee({}); // create new Employee, but don't set `name` attr value

    dep.validate(err => {
      expect(err.errors.firstName).to.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });

  it('should throw an error if "name" is not a string', () => {

    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Employee({ name });

      dep.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
    after(() => {
      mongoose.models = {};
    });
  });



  it('should throw an error if "name" is too short or too long', () => {

    const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip']; // we test various cases, some of them are too short, some of them are too long
    for (let name of cases) {
      const dep = new Employee({ name });

      dep.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
    after(() => {
      mongoose.models = {};
    });
  });

  it('should not throw an error if "firstName", "lastName" and "department" is okay', () => {

    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'Tech' },
      { firstName: 'Amanda', lastName: 'Watson', department: 'Marketing' },
    ];
    for (let name of cases) {
      const dep = new Employee( name );

      dep.validate(err => {
        expect(err).to.not.exist;
      });
    
    after(() => {
      mongoose.models = {};
    });
  }
  });

});