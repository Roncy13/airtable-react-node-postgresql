import { SmurfAction } from "@core/response";
import { HTTP_METHODS } from "@utilities/constants";
import { GeneateRowsCsv, GetDetailsByPage, GetHeaderDetails } from "./csv.services";
import { UploadedFile } from 'express-fileupload';
import { CsvDetailsPageSchema } from "./csv.validators";
import { IGetDetailsPerPage } from "./csv-interface";
import { CsvCheckFilePolicy, CsvCheckRowsPolicy } from "./csv.policy";
import { AppLoggerResponse } from "@utilities/responseLogger";

@SmurfAction({
  action: '/csv',
  message: 'Csv fetched successfully',
})
export class CsvApi extends AppLoggerResponse {

  async run() {
    this.logger('Getting Header Details');
    this.data =  await GetHeaderDetails();
    this.logger('Done Getting Header Details');
  }
}

@SmurfAction({
  action: '/csv',
  method: HTTP_METHODS.POST,
  policies: [CsvCheckFilePolicy, CsvCheckRowsPolicy],
  message: 'Csv File is being processed. Please see table list for details',
})
export class CsvApiCreate extends AppLoggerResponse {

  async run() {
    this.logger('Generating Csv Files');
    const { file } = this.req.files ;
    this.data = await GeneateRowsCsv(file as UploadedFile);
    this.logger('Done Generating Csv Files');
  }
}

@SmurfAction({
  action: '/csv/details',
  validation: CsvDetailsPageSchema,
  message: 'Details has been fetched successfully',
})
export class CsvApiDetails extends AppLoggerResponse {

  async run() {
    this.logger('Getting Csv Details');
    const payload = this.req.query as unknown as IGetDetailsPerPage;

    this.data = await GetDetailsByPage(payload);
    this.logger('Done Getting Csv Details');
  }
}