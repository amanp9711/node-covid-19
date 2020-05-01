import { Injectable } from "@nestjs/common";
import { AgeWiseDataDTO } from "./age_wise_data.dto";
import { FileParserService } from "./../file-parser.service";
import { States } from "src/states_details";


@Injectable()
export class AgeWiseService {
    constructor() {
    }

    getAgeData(state: number) {
        const stateName = States.states_data.find(x => x.state_id == state).state_name;
        return this.getAgeFilterData(stateName);
    }


    getAgeFilterData(state: String) {
        var labels = [] as string[];
        var responseData = [] as AgeWiseDataDTO[];
        var hospitalAgeData = FileParserService.hospitalizedData.filter(x => x['Age Bracket'] != '');
        var reacoveredAgeData = FileParserService.deathAndRecoveredData.filter(x => x['Age Bracket'] != '');
        for (let i = 0; i < 5; i++) {
            const currentDateObject = new AgeWiseDataDTO();
            currentDateObject.age_gap = (i ? ((i * 20) + 1).toString() : 0) + '-' + ((i + 1) * 20).toString();
            labels.push(currentDateObject.age_gap);
            let currentDateHospitalizedData;
            let currentDateDeathAndRecoveredData
            if (i == 0) {
                currentDateHospitalizedData = hospitalAgeData.filter(x => x['Age Bracket'] >= 0 && x['Age Bracket'] <= 20);
                currentDateDeathAndRecoveredData = reacoveredAgeData.filter(x => x['Age Bracket'] >= 0 && x['Age Bracket'] <= 20);
            } else {
                currentDateHospitalizedData = hospitalAgeData.filter(x => x['Age Bracket'] >= ((i * 20) + 1) && x['Age Bracket'] <= ((i + 1) * 20));
                currentDateDeathAndRecoveredData = reacoveredAgeData.filter(x => x['Age Bracket'] >= ((i * 20) + 1) && x['Age Bracket'] <= ((i + 1) * 20));
            }
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