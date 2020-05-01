import { Injectable } from "@nestjs/common";
var csv = require('csvtojson');
@Injectable()
export class FileParserService {
    public static hospitalizedData = [];
    public static deathAndRecoveredData = [];


    parseData() {
        csv().fromFile('raw_data.csv').then((json) => {
            FileParserService.hospitalizedData = json;
        })
        csv().fromFile('death_and_recovered.csv').then((json) => {
            FileParserService.deathAndRecoveredData = json;
        })
    }
}