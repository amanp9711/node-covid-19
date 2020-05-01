import { Injectable } from "@nestjs/common";
import { DayWiseDataDTO } from "./day_wise_data.dto";
import { FileParserService } from "src/file-parser.service";
import * as moment from 'moment';
import { States } from "src/states_details";
@Injectable()
export class DayWiseService {
    getDayData(date: string, stateID: number) {

        const stateName = States.states_data.find(x => x.state_id == stateID).state_name;
        return this.getLast15DaysData(date, stateName);
    }


    getLast15DaysData(date: string, state: String) {
        var responseData = [] as DayWiseDataDTO[];
        var labels = [] as string[];
        var currentDate = new Date(date);
        for (let i = 0; i < 15; i++) {
            var newDate = new Date();
            var dateOffset = (24 * 60 * 60 * 1000) * i;
            newDate.setTime(currentDate.getTime() - dateOffset);
            const currentDateObject = new DayWiseDataDTO();
            currentDateObject.date = moment(newDate).format('YYYY-MM-DD');
            labels.push(currentDateObject.date);
            var compareDate = moment(newDate).format('DD/MM/YYYY');
            let currentDateHospitalizedData = FileParserService.hospitalizedData.filter(x => x['Date Announced'] == compareDate);
            let currentDateDeathAndRecoveredData = FileParserService.deathAndRecoveredData.filter(x => x['Date'] == compareDate);

            if (state != 'All') {
                currentDateHospitalizedData = currentDateHospitalizedData ? currentDateHospitalizedData.filter(x => x['Detected State'] == state) : [];
                currentDateDeathAndRecoveredData = currentDateDeathAndRecoveredData ? currentDateDeathAndRecoveredData.filter(x => x['State'] == state) : [];
            }

            if (currentDateHospitalizedData && currentDateHospitalizedData.length > 0) {
                const newData = currentDateHospitalizedData.filter(x => x['Current Status'] == 'Hospitalized')
                currentDateObject.hospitalized = newData ? newData.length : 0;
            } else {
                currentDateObject.hospitalized = 0;
            }

            if (currentDateDeathAndRecoveredData && currentDateDeathAndRecoveredData.length > 0) {
                const newDeathData = currentDateDeathAndRecoveredData.filter(x => x['Patient_Status'] == 'Deceased')
                currentDateObject.deceased = newDeathData ? newDeathData.length : 0;
                const newRecoveredData = currentDateDeathAndRecoveredData.filter(x => x['Patient_Status'] == 'Recovered')
                currentDateObject.recovered = newRecoveredData ? newRecoveredData.length : 0;
            } else {
                currentDateObject.deceased = 0;
                currentDateObject.recovered = 0;
            }
            responseData.push(currentDateObject);
        }
        return { data: responseData, labels: labels };
    }
}