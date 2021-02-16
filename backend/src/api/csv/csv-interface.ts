
import { E_CsvJobStatus } from '@utilities/constants';
import { CsvFileDTO } from './csv-dto';
import { CsvHeader } from './csv-header.entity';

export interface ICsvDetailsPayload {
  header: string;
  payload: CsvFileDTO[];
  rowSize: number;
}

export interface ICsvUpdateHeaderMsg {
  status: E_CsvJobStatus,
  message: string,
  id: string,
  dateUpdated?: Date
}

export interface ICsvUpdateHeaderRowSize {
  rowSize: number,
  id: string,
  dateUpdated?: Date
}

export interface ICsvUpdateHeaderJobId {
  jobId: number,
  id: string,
  dateUpdated?: Date
}

export interface ICsvCreateDetails {
  header: CsvHeader,
  payload?: CsvFileDTO
}

export interface IGetDetailsPerPage {
  header: string,
  page: number
}