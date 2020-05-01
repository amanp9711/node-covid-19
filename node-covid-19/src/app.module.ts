import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DayWiseModule } from './DayWiseData/day-wise-data.module';
import { AgeWiseModule } from './AgeWiseData/age-wise-data.module';
import { FileParserService } from './file-parser.service';

@Module({
  imports: [AgeWiseModule, DayWiseModule],
  controllers: [AppController],
  providers: [AppService,FileParserService],
})
export class AppModule { }
