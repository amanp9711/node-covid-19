import { DayWiseController } from './day-wise-data.controller'
import { DayWiseService } from './day-wise-data.service'
import { Module } from '@nestjs/common';
import { FileParserService } from './../file-parser.service';

@Module({
    controllers: [DayWiseController],
    providers: [DayWiseService,FileParserService],
    exports: []
})
export class DayWiseModule { }
