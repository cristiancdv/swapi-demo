// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
const cluster = require("node:cluster");
import * as os from "os";

export class AppClusterService {
  static async clusterize(callback: () => Promise<void>, numClusters?: number): Promise<void> {
    const cpus = os.cpus().length;
    const clusterCount = numClusters ?? cpus;

    if ((cluster as { isPrimary: boolean }).isPrimary) {
      console.log(`[AppClusterService] Master ${process.pid} is running with ${clusterCount} clusters`);

      for (let i = 0; i < clusterCount; i++) {
        (cluster as { fork: () => void }).fork();
      }

      (cluster as { on: (event: string, callback: (worker: { process: { pid: number } }) => void) => void }).on("exit", worker => {
        console.log(`[AppClusterService] Worker ${worker.process.pid} died. Restarting...`);
        (cluster as { fork: () => void }).fork();
      });
    } else {
      console.log(`[AppClusterService] Worker ${process.pid} started`);
      await callback();
    }
  }
}
