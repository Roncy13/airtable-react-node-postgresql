import  "reflect-metadata";
import { GetConnection } from '@config/database';
import { CsvHeader } from './csv-header.entity';
import csvtojson from 'csvtojson';
import { UploadedFile } from 'express-fileupload';
import { Repository } from "typeorm";
import { CsvFileDTO } from './csv-dto';
import { ICsvCreateDetails, ICsvDetailsPayload, ICsvUpdateHeaderJobId, ICsvUpdateHeaderMsg, ICsvUpdateHeaderRowSize } from "./csv-interface";
import CsvQueueJob from "@utilities/queue";
import { CsvDetails } from './csv-details.entity';
import { GetConn } from '@core/models';

const modelHeader = GetConnection(CsvHeader) as Repository<CsvHeader>;
const modelDetails = GetConn(CsvDetails) as Repository<CsvDetails>;

export function CsvAllSrv() {
  // default function in my Smurfjs Framework
  return modelHeader.find();
}

export async function GetHeaderById(id: string) {
  return modelHeader.findOne(id);
}

export async function GetHeaderByIdWithRelation(id: string) {
  return modelHeader.findOne(id, { relations : ['details']});
}

export async function UpdateHeaderMsg({id, dateUpdated = new Date(), ...params}: ICsvUpdateHeaderMsg) {
  const header = await GetHeaderById(id);
  
  header.status = params.status;
  header.message = params.message;
  header.dateUpdated = dateUpdated;
  
  return await modelHeader.save(header);
}

export async function UpdateHeaderJobId({id, dateUpdated = new Date(), ...params}: ICsvUpdateHeaderJobId) {
  const header = await GetHeaderById(id);
  
  header.jobId = params.jobId;
  header.dateUpdated = dateUpdated;
  
  return await modelHeader.save(header);
}

export async function CreateCsvDetails(payload: CsvFileDTO[], parentID: string) {
  const details = payload.map((row) => ({...row, header: parentID}));

  // batch not working, so i decided to loop insert manually
  for (const index in details) {
    await modelDetails.createQueryBuilder().insert().values(details[index]).execute();
  }
}

export async function UpdateHeaderRowSize({id, dateUpdated = new Date(), ...params}: ICsvUpdateHeaderRowSize) {
  const header = await GetHeaderById(id);
  
  header.rows = params.rowSize;
  header.dateUpdated = dateUpdated;
  
  return await modelHeader.save(header);
}

export async function GenerateHeaderForCsv(file: UploadedFile) {
  const filename = file.name;
  const csv = new CsvHeader();

  csv.filename = filename;

  return modelHeader.save({ filename });
}

export async function InsertDetailsInCsv(header: string, file: UploadedFile) {
  const rows = await ConvertCsvToJson(file);
  const payload: ICsvDetailsPayload = { header, payload: rows, rowSize: rows.length };
  
  return await (await CsvQueueJob()).add(payload);
}

export async function ConvertCsvToJson(file: UploadedFile) {
  return csvtojson().fromFile(file.tempFilePath) as any as CsvFileDTO[];

}

export async function GeneateRowsCsv(file: UploadedFile) {
  const { id: headerId } = await GenerateHeaderForCsv(file);
  const { id: jobId } = await InsertDetailsInCsv(headerId, file);
  const jobToInt = parseInt(jobId.toString(), 10);
  const payload: ICsvUpdateHeaderJobId = { jobId: jobToInt, id: headerId };
  
  await UpdateHeaderJobId(payload);

  return { headerId, jobId };
}

export async function GetDetailsByPage(file: UploadedFile) {
  /*
    const { id: headerId } = await GenerateHeaderForCsv(file);
    const { id: jobId } = await InsertDetailsInCsv(headerId, file);
    const jobToInt = parseInt(jobId.toString(), 10);
    const payload: ICsvUpdateHeaderJobId = { jobId: jobToInt, id: headerId };
    
    await UpdateHeaderJobId(payload);

    return { headerId, jobId };
  */
}