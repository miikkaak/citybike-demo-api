import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import fs = require('fs');
import { CreateJourneyDto } from './journeys/dto/create-journey.dto';
import { JourneysService } from './journeys/journeys.service';

@Injectable()
export class AppService {
  constructor(private readonly journeysService: JourneysService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async buildDatabase(): Promise<Boolean> {
    const wd = `${process.cwd()}/src/data`;

    await this.journeysService.truncate();
    const journeys = await this.handleDir(wd, 'journeys');

    return true;
  }

  async handleDir(base: string, dir: string): Promise<any> {
    const directory = fs.readdir(`${base}/${dir}`, (err, files) => {
      if (err) {
        console.error(err);
        return false;
      }

      files.forEach((file) => {
        fs.readFile(`${base}/${dir}/${file}`, 'utf-8', (err, content) => {
          console.log(`Processing ${file}`);
          const rows = content.split('\r\n');
          rows.shift();

          //Traditional for-loop to shave off few milliseconds
          const entities = [];
          for (let i = 0; i < rows.length; i++) {
            const vals = rows[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

            const eligible = this.validateEntry(vals);

            if (eligible) {
              entities.push({
                departure: new Date(vals[0]),
                returnTime: new Date(vals[1]),
                depStationId: vals[2],
                depStationName: vals[3],
                retStationId: vals[4],
                retStationName: vals[5],
                distance: Number(vals[6]),
                duration: Number(vals[7]),
              });
            }
          }

          // Send all to be written to the database
          this.createDbEntry(entities, dir);
        });
      });
    });
  }

  // drop entries with low distance and duration
  validateEntry(vals: string[]): boolean {
    try {
      if (Number(vals[6]) < 10) return false;
      if (Number(vals[7]) < 10) return false;
      if (isNaN(Number(vals[7]))) console.log(vals[7]);
    } catch (e) {
      return false;
    }

    return true;
  }

  async createDbEntry(entities: Array<CreateJourneyDto>, dir): Promise<void> {
    try {
      const e = await this.journeysService.createMany(entities);
    } catch (error) {
      console.error(error);
    }
  }
}
