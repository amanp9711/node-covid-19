import { Controller, Get, Param } from "@nestjs/common";
import { DayWiseService } from "./day-wise-data.service";

@Controller('day')
export class DayWiseController {
    constructor(private dayWiseService: DayWiseService) { }
    @Get(':date/:state')
    getDayWiseData(@Param('date') date: string, @Param('state') state: number): any {
        return this.dayWiseService.getDayData(date, state);
    }
}