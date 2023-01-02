import { Injectable } from '@nestjs/common';
import fs = require('fs');
import { JourneysService } from './journeys/journeys.service';
import { StationsService } from './stations/stations.service';

@Injectable()
export class AppService {
  constructor(
    private readonly journeysService: JourneysService,
    private readonly stationsService: StationsService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async buildDatabase(): Promise<Boolean> {
    const wd = `${process.cwd()}/src/data`;

    await this.stationsService.truncate();
    await this.journeysService.truncate();

    await this.handleDir(wd, 'stations');
    await this.handleDir(wd, 'journeys');

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
          const rows = content.split('\n');
          rows.shift();

          //Traditional for-loop to shave off few milliseconds
          const entities = [];
          if (dir == 'journeys') {
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
                  duration: Number(vals[7].replace('\r', '')),
                });
              }
            }
          } else {
            for (let i = 0; i < rows.length; i++) {
              const vals = rows[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
              if (vals != null) {
                entities.push({
                  fid: Number(vals[0]),
                  id: Number(vals[1]),
                  nameFI: vals[2],
                  nameSWE: vals[3],
                  name: vals[4],
                  addressFI: vals[5],
                  addressSWE: vals[6],
                  city: vals[7],
                  citySWE: vals[8],
                  operator: vals[9],
                  capacity: Number(vals[10]),
                  lon: Number(vals[11]),
                  lat: Number(vals[12]),
                });
              }
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

  async createDbEntry(entities: Array<any>, dir: string): Promise<void> {
    try {
      dir == 'journeys'
        ? await this.journeysService.createMany(entities)
        : await this.stationsService.createMany(entities);
    } catch (error) {
      console.error(error);
    }
  }
}
