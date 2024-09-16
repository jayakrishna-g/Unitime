import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { AllConfigType } from '../config/config.type';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createMongooseOptions(): MongooseModuleOptions {
    console.log(this.configService.get('database.url', { infer: true }));
    console.log(this.configService.get('database.name', { infer: true }));
    console.log(this.configService.get('database.username', { infer: true }));
    console.log(this.configService.get('database.password', { infer: true }));
    return {
      uri: this.configService.get('database.url', { infer: true }),
      dbName: this.configService.get('database.name', { infer: true }),
      user: this.configService.get('database.username', { infer: true }),
      pass: this.configService.get('database.password', { infer: true }),
    };
  }
}
