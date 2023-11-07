import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SharedModule } from '@app/shared/shared.module';
import { SecurityModule } from '@app/security/security.module';
import { VehicleRetailModule } from '@app/vehicle-retail/vehicle-retail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '1234',
      host: 'localhost',
      port: 3306,
      database: 'leak_finance',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    SharedModule,
    SecurityModule,
    VehicleRetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
