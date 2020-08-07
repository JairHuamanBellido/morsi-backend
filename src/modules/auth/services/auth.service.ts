import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Manager } from '../../../modules/manager/models/manager.schema';
import { Model } from 'mongoose';
import { ManagerAuthenticate } from '../dto/Authenticate.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Manager.name)
        private readonly managerModel: Model<Manager>,
        private jwtService: JwtService,
    ) {}

    async authenticate(authenticate: ManagerAuthenticate): Promise<any> {
        try {
            const manager = await this.managerModel.findOne({
                email: authenticate.email,
                password: authenticate.password,
            });
            return {
                access_token: this.jwtService.sign({ id: manager.id }),
            };
        } catch (error) {
            return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    decodeToken(token: string): any {
        return this.jwtService.decode(token);
    }
}
