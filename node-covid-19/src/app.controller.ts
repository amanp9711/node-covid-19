import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FileParserService } from './file-parser.service';
import { States, stateObject } from './states_details';

@Controller('statedata')
export class AppController {
  constructor(private readonly appService: AppService, private readonly fileService: FileParserService) {
    this.fileService.parseData();
  }

  @Get()
  getStateData(): stateObject[] {
    return States.states_data;
  }
}
