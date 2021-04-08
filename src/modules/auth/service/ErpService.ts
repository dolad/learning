import { ApiRequest } from './fetchEmployee.services';
import configuration from '../../../config/app.config';
export class ErpClass extends ApiRequest {
  constructor() {
    super();
    this.baseURL = configuration().erp.baseUrl;
  }

  async init(): Promise<any> {
    await this.fetchEmployee();
    await this.fetchDepartment();
    await this.fetchBranch();
  }

  async fetchEmployee(): Promise<any> {
    return await this.fetchRequest(`allLMSemployees`, 'GET');
  }

  async fetchDepartment(): Promise<any> {
    return await this.fetchRequest(`alldepts`, 'GET');
  }
  async fetchBranch(): Promise<any> {
    return await this.fetchRequest(`alldesignations`, 'GET');
  }
}
