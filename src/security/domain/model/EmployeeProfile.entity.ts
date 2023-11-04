import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Employee} from "@app/security/domain/model/Employee.entity";

@Entity('employee_profiles')
export class EmployeeProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @OneToOne(() => Employee, (employee) => employee.id)
  employeeId: number;
}