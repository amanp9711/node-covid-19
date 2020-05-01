import { AgeWiseController } from './age-wise-data.controller'
import { AgeWiseService } from './age-wise-data.service'
import { Module } from '@nestjs/common';
import { FileParserService } from './../file-parser.service';
@Module({
    controllers: [AgeWiseController],
    providers: [AgeWiseService, FileParserService],
    exports: []
})
export class AgeWiseModule { }
