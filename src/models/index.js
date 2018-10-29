import { Sequelize, sequelize } from './base'
import Example from './example'
import Employee from './employee'

Example.belongsTo(Employee, {
    foreignKey: 'employee_id',
    as: 'employee'
})
Employee.hasMany(Example, {
    foreignKey: 'employee_id',
    as: 'examples'
})

export {
    Sequelize,
    sequelize,
    
    Example,
    Employee
}