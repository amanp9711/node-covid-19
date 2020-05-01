import { Get, Controller, Param } from "@nestjs/common";
import { AgeWiseService } from "./age-wise-data.service";
@Controller('age')
export class AgeWiseController {
  constructor(private ageWiseService: AgeWiseService) {

  }
  @Get(':state')
  getAge(@Param('state') stateId: number): any {
    return this.ageWiseService.getAgeData(stateId);
  }
}