import { ClientOptions } from '@elastic/elasticsearch';
import winston from "winston";
import { DefaultMeta } from './default-meta';

export interface IOptions extends Record<string, any> {
  /**
   * @type {'debug' | 'info' | 'error'}
   * @summary Nivel máximo para logging no stdout
   */
  level: "debug" | "info" | "error";
  /**
   * @type {boolean}
   * @summary Definir se o output do stdout será colorizado ou não
   */
  color: boolean;
  /**
   * @type {string}
   * @summary Nome do serviço onde o logger será utilizado
   */
  serviceName?: string;
  /**
   * @type {string}
   * @summary Versão do serviço onde o logger será utilizado
   */
  serviceVersion?: string;
  /**
   * @type {DefaultMeta}
   * @summary Objeto com informações que serão incluídas em todos os logs
   */
  defaultMeta: DefaultMeta;
  /**
   * @type {object}
   * @summary Configurações para logging no ELK
   */
  elk: {
    /**
     * @type {'debug' | 'info' | 'error'}
     * @summary Nivel máximo para logging no ELK
     */
    level: "debug" | "info" | "error";
    /**
     * @type {ClientOptions}
     * @summary Configurações do cliente do ELK
     */
    config?: ClientOptions;
  };

  /**
   * @type {winston.Logform.Format[]}
   * @summary Lista de formats do winston
   */
  formats?: winston.Logform.Format[]
}

export type Options = IOptions;