import { IHostStats } from '@/store/hosts/Types';
import axios from 'axios';
import { mapAllStats } from './Mapper';

export async function getAllStats(url: string): Promise<IHostStats> {
  return await axios.get(`${url}/all`).then(({ status, data }) => {
    if (status === 200) {
      return mapAllStats(data);
    } else {
      throw new Error('Error making request: ' + status);
    }
  });
}
