import  "reflect-metadata";
import { GetConnection } from '@config/database';
import { CsvHeader } from './csv-header.entity';
import csvtojson from 'csvtojson';
import { UploadedFile } from 'express-fileupload';
import { Repository } from "typeorm";
import { CsvFileDTO } from './csv-dto';
import { ICsvCreateDetails, ICsvDetailsPayload, ICsvUpdateHeaderJobId, ICsvUpdateHeaderMsg, ICsvUpdateHeaderRowSize, IGetDetailsPerPage } from "./csv-interface";
import CsvQueueJob from "@utilities/queue";
import { CsvDetails } from './csv-details.entity';
import { GetConn } from '@core/models';
import { NotEmpty } from "@utilities/dataHelper";

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

export async function CheckIfHeaderExist(id: string) {
  const result = await GetHeaderById(id);

  return NotEmpty(result);
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

  for (const row of details) {
    await modelDetails.createQueryBuilder().insert().values(row).execute();
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

export async function GetCountDetails({ header }: IGetDetailsPerPage) {
  return modelDetails.count({ header });
}

export async function GenerateOptionsForPage({ page }: IGetDetailsPerPage, total: number) {
  const take = 10;

  return {
    take,
    skip: page * 5
  }
}

export async function GetDetails(header: string, options: any = {}) {
  return modelDetails.find({
    where: {
      header
    },
    ...options
  })
}


export async function GetDetailsByPage(payload: IGetDetailsPerPage) {
  const total = await GetCountDetails(payload);
  const options = await GenerateOptionsForPage(payload, total);
  const header = await GetHeaderById(payload.header);
  const details = await GetDetails(payload.header, options);

  return { total, page: payload.page, header, details };
}

export async function GetHeaderDetails() {
  return modelHeader.query(`
    SELECT
      csv_h.id,
      csv_h.filename,
      csv_h."jobId" ,
      CASE
          WHEN csv_h.status = 0  THEN 'Inserting'
          WHEN csv_h.status = 1  THEN 'Success'
        ELSE 'failed'
      end as status,
      csv_h.status as "statusNumber",
      csv_h.message,
      csv_h."rows",
      TO_CHAR(csv_h."dateUpdated", 'MM/DD/YYYY HH:MI AM') as "dateUpdated",
      TO_CHAR(csv_h."dateCreated" , 'MM/DD/YYYY HH:MI AM') as "dateCreated",
      count(csv_d."headerId") as "insertedDetails"
    FROM
      csv_details csv_d
    INNER JOIN
      csv_header csv_h ON csv_h.id = csv_d."headerId"
    GROUP BY
      csv_h.id,
      csv_h.filename,
      csv_h."jobId" ,
      csv_h.status,
      csv_h.message,
      csv_h."rows",
      csv_h."dateUpdated",
      csv_h."dateCreated"
    ORDER BY csv_h."dateCreated" desc
  `);
}