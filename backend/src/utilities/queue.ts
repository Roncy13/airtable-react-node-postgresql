import { CsvFileDTO } from '@base/api/csv/csv-dto';
import { CreateCsvDetails, GetHeaderById, UpdateHeaderMsg, UpdateHeaderRowSize } from '@base/api/csv/csv.services';
import Queue, { DoneCallback, Job } from 'bull';
import { ICsvCreateDetails, ICsvDetailsPayload, ICsvUpdateHeaderRowSize } from './../api/csv/csv-interface';
import { E_CsvJobStatus, E_CsvJobStatusMsg } from '@utilities/constants';

export default async function CsvQueueJob() {
  const videoQueue = new Queue(`csv-insertion`);
  
  async function processQueue(job: Job, done: DoneCallback) {
    const { header, payload, rowSize  } = job.data as ICsvDetailsPayload;
   
    try {
      const payloadRowSize: ICsvUpdateHeaderRowSize = { rowSize, id: header };
     
      await UpdateHeaderRowSize(payloadRowSize);
      await CreateCsvDetails(payload, header);

      await job.moveToCompleted();
    } catch(err: any | Error) {
      const message = err.message;
      const payloadErr = {id: header, message, status:  E_CsvJobStatus.FAILED }
     
      await UpdateHeaderMsg(payloadErr);
      await job.moveToFailed({ message });
    } finally {
      done();
    }
  
    return true;
  }

  
  videoQueue.process(processQueue);

  return videoQueue;
}