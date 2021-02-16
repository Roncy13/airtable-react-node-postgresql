import SmurfResponse, { SmurfAction } from "@core/response";
import { HTTP_METHODS } from "@utilities/constants";
import { GeneateRowsCsv } from "./csv.services";
import { UploadedFile } from 'express-fileupload';

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
