import { IExecuteFunctions } from 'n8n-core';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
//@ts-ignore
import { Dubbo, java, setting } from 'apache-dubbo-js';


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
        displayName: 'InterfaceName',
        name: 'interFacename',
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
        placeholder: 'Method Name',
        description: '',
      }
    ]
  };


  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

    const items = this.getInputData();

    let item: INodeExecutionData;
    let myString: string;

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      myString = this.getNodeParameter('myString', itemIndex, '') as string;
      item = items[itemIndex];

      item.json['myString'] = myString;
    }

    const name = 'sayHello'

    // @ts-ignore
    const demoProvider = dubbo =>
      dubbo.proxyService({
        dubboInterface: 'org.apache.dubbo.spring.boot.sample.consumer.DemoService',
        version: '1.0.0',
        methods: {
          [name]() {
            return [java.String("1233333")];
          }
        },
      });

    const service = {
      demoProvider,
    };

    const dubboSetting = setting
      .match(
        [
          'org.apache.dubbo.spring.boot.sample.consumer.DemoService'
        ],
        {
          version: '1.0.0',
        },
      );

    // @ts-ignore
    const dubbo = new Dubbo<typeof service>({
      application: { name: 'dubbo-js' },
      register: 'localhost:2181',
      service,
      dubboSetting
    });

    const re = await dubbo.service.demoProvider[name]('2222')

    console.log(re)

    return this.prepareOutputData(items);

  }
}
