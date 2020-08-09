import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Manager } from '../../../modules/manager/models/manager.schema';
import { Model } from 'mongoose';
import { ManagerAuthenticate } from '../dto/authManager.dto';
import { JwtService } from '@nestjs/jwt';
import { EmployeeAuthenticate } from '../dto/authEmployee.dto';
import { Employee } from '../../../modules/employees/models/employee.schema';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Manager.name)
        private readonly managerModel: Model<Manager>,

        @InjectModel(Employee.name)
        private readonly employeeModel: Model<Employee>,

        private jwtService: JwtService,
    ) { }

    async managerAuthenticate(authenticate: ManagerAuthenticate): Promise<any> {
        try {
            const manager = await this.managerModel.findOne({
                email: authenticate.email,
                password: authenticate.password,
            });

            if (!manager) {
                return new HttpException("Credenciales inválidas", HttpStatus.UNAUTHORIZED)
            }

            return {
                access_token: this.jwtService.sign({ id: manager.id }),
            };
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async employeerAuthentication(authenticate: EmployeeAuthenticate): Promise<any> {
        try {
            const employee = await this.employeeModel.findOne({
                email: authenticate.email,
                password: authenticate.password
            })

            if (!employee) {
                return new HttpException("Credenciales inválidas", HttpStatus.UNAUTHORIZED)
            }

            if (!employee.active) {
                return new HttpException("Su cuenta esta deshabilitada, contacto con el gerente para volver a habilitarla", HttpStatus.UNAUTHORIZED);
            }

            return {
                access_token: this.jwtService.sign({ id: employee.id })
            }
        } catch (error) {
            return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    decodeToken(token: string): any {
        return this.jwtService.decode(token);
    }
}
