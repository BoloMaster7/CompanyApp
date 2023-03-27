const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest',
        { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.error(err);
    }
  });


  ////READ
  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        department: 'department #1',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'firstName #2',
        lastName: 'lastName #2',
        department: 'department #2',
      });
      await testEmpTwo.save();
    });

    it('should return proper document by various params with findOne method', async () => {
      const cases =[
        {firstName: 'firstName #1'},
        {lastName: 'lastName #1'},
        {department: 'department #1'},
      ];
      for(let employee of cases){
        const emp = await Employee.findOne(employee);
        expect(emp).to.exist;
    }
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  // //////CREATE
  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({
      firstName: 'firstName #1',
      lastName: 'lastName #1',
      department: 'department #1', });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    })

  });

  /////UPDATE
  describe('Updating data', () => {

    beforeEach(async () => {
      const testDepOne = new Employee(
      {firstName: 'firstName #1'},
      {lastName: 'lastName #1'},
      {department: 'department #1'},);
      await testDepOne.save();

      const testDepTwo = new Employee(
      {firstName: 'firstName #2'},
      {lastName: 'lastName #2'},
      {department: 'department #2'});
      await testDepTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne
      ({ firstName: 'Employee #1' }, 
      { firstName: '=Employee #1='}, )
      // {lastName: '=lastName #1='},
      // {lastName: 'lastName #1'},
      // {department: 'department #1'},
      // {department: '=department #1='});
      const updatedEmployee = await Employee.findOne(
        { firstName: '=Employee #1=' },
        // { lastName: '=lastName #1=' },
        // { department: '=department #1=' }
        );
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const Employee = await Employee.findOne({ firstName: 'Employee #1' });
      Employee.firstName = '=Employee #1=';
      await Employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=' });
      expect(updatedEmployee).to.not.be.null;
    });

  //   it('should properly update multiple documents with "updateMany" method', async () => {
  //     await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
  //     const Employees = await Employee.find();
  //     expect(Employees[0].firstName).to.equal("Updated!");
  //     expect(Employees[1].firstName).to.equal("Updated!");
     
  //   });

  //   afterEach(async () => {
  //     await Employee.deleteMany();
  //   });

  });

  // //////DELETE
  // describe('Removing data', () => {

  //   beforeEach(async () => {
  //     const testDepOne = new Employee(
  //     {firstName: 'firstName #1'},
  //     {lastName: 'lastName #1'},
  //     {department: 'department #1'});
  //     await testDepOne.save();

  //     const testDepTwo = new Employee(
  //     {firstName: 'firstName #2'},
  //     {lastName: 'lastName #2'},
  //     {department: 'department #2'});
  //     await testDepTwo.save();
  //   });

  //   afterEach(async () => {
  //     await Employee.deleteMany();
  //   });

  //   it('should properly remove one document with "deleteOne" method', async () => {
  //     await Employee.deleteOne( 
  //     {firstName: 'firstName #1'},
  //     {lastName: 'lastName #1'},
  //     {department: 'department #1'} );
  //     const removeEmployee = await Employee.findOne(
  //     {firstName: 'firstName #2'},
  //     {lastName: 'lastName #2'},
  //     {department: 'department #2'});
  //     expect(removeEmployee).to.be.null;
  //   });

  //   it('should properly remove one document with "remove" method', async () => {
  //     const Employee = await Employee.findOne({ firstName: 'Employee #1' });
  //     await Employee.remove();
  //     const removedEmployee = await Employee.findOne({ firstName: 'Employee #1' });
  //     expect(removedEmployee).to.be.null;
  //   });

  //   it('should properly remove multiple documents with "deleteMany" method', async () => {
  //     await Employee.deleteMany();
  //     const Employees = await Employee.find();
  //     expect(Employees.length).to.be.equal(0);
  //   });

  // });

  after(() => {
    mongoose.models = {};
  });
});