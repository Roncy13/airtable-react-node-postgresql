import SmurfResponse, { SmurfAction } from "@core/response";
import { HTTP_METHODS } from "@utilities/constants";
import { GeneateRowsCsv, GetDetailsByPage } from "./csv.services";
import { UploadedFile } from 'express-fileupload';
import { CsvDetailsPageSchema } from "./csv.validators";
import { IGetDetailsPerPage } from "./csv-interface";

@SmurfAction({
  action: '/csv',
  message: 'Csv fetched successfully',
})
export class CsvApi extends SmurfResponse {

  async run() {
    this.data = 'index api for Csv';
  }
}

@SmurfAction({
  action: '/csv',
  method: HTTP_METHODS.POST,
  message: 'Csv File is being generated. Please see table list for details',
})
export class CsvApiCreate extends SmurfResponse {

  async run() {
    const { file } = this.req.files ;

    this.data = await GeneateRowsCsv(file as UploadedFile);
  }
}

@SmurfAction({
  action: '/csv/details',
  validation: CsvDetailsPageSchema,
  message: 'Details has been fetched successfully',
})
export class CsvApiDetails extends SmurfResponse {

  async run() {
    const payload = this.req.query as unknown as IGetDetailsPerPage;

    this.data = await GetDetailsByPage(payload);
  }
}


