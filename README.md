# winston-log-factory

winston-log-factory é uma biblioteca para facilitar a criação de logger de aplicação usando winston-js e elk

## Instalação

```bash
npm install --save winston-log-factory
```

## Uso

```javascript
import { LoggerFactory } from "winston-log-factory";

const options = {
  level: "info",
  color: true,
  defaultMeta: { foo: "bar" },
  serviceName: "my-service",
  serviceVersion: "v1.0.0",
  elk: { config: { node: "http://localhost:9200" }, level: "info" },
  formats: [ expressMessageFormat() ]
};

const logger = LoggerFactory.init(options);

logger.info("qualquer coisa", { test: "params" });
logger.error("erro", new Error("error"));
logger.debug("variavel.x", variavel.x);
logger.warn("warning", { teste: 123 });
logger.log("info", "teste", { aaa: "bbb" });
```

### Parâmetros disponíveis

| Parametro              | Tipo    | Valor padrão           | Observação                                                  |
| ---------------------- | ------- | ---------------------- | ----------------------------------------------------------- |
| options.level          | string  | 'info'                 | Nivel máximo para logging no stdout                         |
| options.color          | boolean | false                  | Definir se o output do stdout será colorizado ou não        |
| options.defaultMeta    | object  | {}                     | Objeto com informações que serão incluídas em todos os logs |
| options.serviceName    | string  | -                      | Nome do serviço onde o logger será utilizado                |
| options.serviceVersion | string  | -                      | Versão do serviço onde o logger será utilizado              |
| options.elk            | object  | -                      | Configurações para logging no ELK                           |
| options.elk.level      | string  | 'info'                 | Nivel máximo para logging no ELK                            |
| options.elk.config     | object  | -                      | Configurações do cliente do ELK                             |
| options.formats        | array   | [shortMessageFormat()] | Formatadores de saída do winston                            |
