import { CreateCsvDetails, UpdateHeaderMsg, UpdateHeaderRowSize } from '@base/api/csv/csv.services';
import { E_CsvJobStatus, E_CsvJobStatusMsg } from '@utilities/constants';
import Queue, { DoneCallback, Job } from 'bull';
import { ICsvDetailsPayload, ICsvUpdateHeaderRowSize } from './../api/csv/csv-interface';

export default async function CsvQueueJob() {
  const videoQueue = new Queue(`csv-insertion`);

  async function processQueue(job: Job, done: DoneCallback) {
    const { header, payload, rowSize  } = job.data as ICsvDetailsPayload;

    try {
      const payloadRowSize: ICsvUpdateHeaderRowSize = { rowSize, id: header };

      await UpdateHeaderRowSize(payloadRowSize);
      await CreateCsvDetails(payload, header);
      const payloadErr = {id: header, message: E_CsvJobStatusMsg.SUCCESS, status:  E_CsvJobStatus.SUCCESS }

      await UpdateHeaderMsg(payloadErr);
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