import { IExecuteFunctions } from 'n8n-core';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import axios from 'axios';
import { url } from '../../api';


export class DubboInvoker implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'DubboInvoker',
    name: 'DubboInvoker',
    group: ['transform'],
    version: 1,
    description: 'DubboInvoker',
    defaults: {
      name: 'DubboInvoker',
      color: '#772244',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        default: '',
        placeholder: 'Address',
        description: '',
      },
      {
        displayName: 'InterfaceName',
        name: 'interfaceName',
        type: 'string',
        default: '',
        placeholder: 'Interface Name',
        description: '',
      },
      {
        displayName: 'MethodName',
        name: 'methodName',
        type: 'string',
        default: '',
        placeholder: 'Method Name',
        description: '',
      },
      {
        displayName: 'Version',
        name: 'version',
        type: 'string',
        default: '1.0.0',
        placeholder: 'Version',
        description: '',
      },
      {
        displayName: 'Timeout',
        name: 'timeout',
        type: 'string',
        default: '10000',
        placeholder: 'Timeout',
        description: '',
      },
      {
        displayName: 'Params',
        name: 'params',
        type: 'json',
        default: '{}',
        placeholder: 'Params',
        description: '',
      }
    ]
  };


  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

    const items = this.getInputData();

    let item: INodeExecutionData;

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const address = this.getNodeParameter('address', itemIndex, '') as string;
      const interfaceName = this.getNodeParameter('interfaceName', itemIndex, '') as string;
      const methodName = this.getNodeParameter('methodName', itemIndex, '') as string;
      const version = this.getNodeParameter('version', itemIndex, '') as string;
      const timeout = this.getNodeParameter('timeout', itemIndex, '') as string;
      const params = this.getNodeParameter('params', itemIndex, {}) as string;
      const request = { address, interfaceName, methodName, version, timeout, params: JSON.parse(params) };
      const { data }: any = await axios.post(`${url}/api/dubbo/invoke`, request);
      console.log(data)
      item = items[itemIndex];
      item.json = data
    }

    console.log(items)

    return this.prepareOutputData(items);

  }
}
