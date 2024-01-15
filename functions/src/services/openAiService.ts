import * as fs from "fs";
import * as functions from "firebase-functions";
import OpenAI from "openai";
import { Thread } from "openai/resources/beta/threads/threads";
import { log } from "firebase-functions/logger";

class OpenAIService {
  private openai: OpenAI;
  private threadPromise?: Promise<Thread>;

  constructor() {
    this.openai = new OpenAI({
      apiKey: functions.config().openai.api_key,
    });
    this.initThread();
  }

  testData(): any {
    return {
      "options": {
        "method": "get",
        "path": "/threads/thread_lsT1dfWQJRUHjkMdwHAfiqaZ/messages",
        "query": {},
        "headers": {
          "OpenAI-Beta": "assistants=v1"
        }
      },
      "response": {
        "size": 0,
        "timeout": 0
      },
      "body": {
        "object": "list",
        "data": [
          {
            "id": "msg_sXLP2XE6RjfZjF7oSCRDMVh1",
            "object": "thread.message",
            "created_at": 1705277971,
            "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "Después de ajustar el modelo simplificado de suavizado exponencial sin considerar la estacionalidad debido a la limitada cantidad de datos, hemos obtenido las siguientes proyecciones de ventas para el próximo trimestre. Es importante notar que se han producido algunos valores negativos en los pronósticos, lo cual no tiene sentido práctico para las ventas; esto indica que el modelo no se ajusta adecuadamente a los datos, posiblemente debido a la escasez de datos históricos para algunas marcas. Es posible que necesitemos recopilar más datos o explorar otros métodos de pronóstico más adecuados para la naturaleza de nuestros datos.\n\nSin embargo, aquí están los valores proyectados para las ventas:\n\n- **Audi**: Disminución progresiva hasta -1,076.98 unidades (estos valores negativos no son prácticos y reflejan un problema con la modelización de esta marca)\n- **BMW**: Reducción para el cuarto mes hasta 346.67 unidades\n- **Chevrolet**: Disminución progresiva hasta -524.07 unidades (valor no práctico)\n- **Ford**: Incremento hasta 697.63 unidades\n- **Honda**: Reducción para el cuarto mes hasta 427.14 unidades\n- **Hyundai**: Disminución progresiva hasta -538.52 unidades (valor no práctico)\n- **Mercedes**: Reducción para el cuarto mes hasta 488.98 unidades\n- **Nissan**: Disminución progresiva hasta -255.78 unidades (valor no práctico)\n- **Toyota**: Disminución progresiva hasta -183.82 unidades (valor no práctico)\n- **Volkswagen**: Reducción para el cuarto mes hasta 431.18 unidades\n\n#### Recomendaciones para Maximizar Ventas\n\nDado que los modelos de pronóstico han generado valores no prácticos para algunas marcas, recomendamos la cautela al utilizar estos pronósticos para la toma de decisiones. Una posible manera de abordar esta situación es concentrar esfuerzos de marketing y ventas en las marcas con proyecciones positivas y para las que el modelo ajustó mejor, como **Ford**, que muestra una tendencia al alza.\n\nAdemás, sería provechoso considerar los resultados del rendimiento pasado (análisis de las ventas y los ingresos), donde marcas como **Toyota**, **Hyundai** y **Volkswagen** mostraron números fuertes. Una estrategia combinada que tome en cuenta estas marcas de alto rendimiento y ajuste las proyecciones futuras podría ser más beneficioso para maximizar las ventas en el próximo trimestre.\n\nPara concluir, se recomienda una evaluación más profunda de los modelos predictivos y la adquisición de más datos para futuras proyecciones. Las acciones de la empresa deberían ser informadas tanto por el rendimiento histórico como por las tendencias del mercado y datos de la industria automotriz más amplios.",
                  "annotations": []
                }
              }
            ],
            "file_ids": [],
            "assistant_id": "asst_OCd57jQGcrbwPgsDnBJqkvHn",
            "run_id": "run_gtUTCprxXxoEyjS7u4V5FcdA",
            "metadata": {}
          },
          {
            "id": "msg_2roOobAlBCBui8ehU8ao9k31",
            "object": "thread.message",
            "created_at": 1705277951,
            "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "Hemos encontrado un problema al intentar crear una proyección para el próximo trimestre. El modelo de suavizado exponencial de Holt-Winters requiere al menos dos ciclos completos de datos estacionales para calcular los valores iniciales de la temporada de forma heurística, pero parece que no contamos con suficientes ciclos en los datos proporcionados.\n\nComo alternativa, podemos ajustar el enfoque de modelado o simplificar el modelo para no considerar la estacionalidad. Dado que el objetivo es obtener una proyección básica para el próximo trimestre, procederemos a realizar el modelado sin la componente estacional, utilizando una tendencia aditiva.\n\nProcederemos ahora a ajustar y proyectar con el modelo simplificado.",
                  "annotations": []
                }
              }
            ],
            "file_ids": [],
            "assistant_id": "asst_OCd57jQGcrbwPgsDnBJqkvHn",
            "run_id": "run_gtUTCprxXxoEyjS7u4V5FcdA",
            "metadata": {}
          },
          {
            "id": "msg_ZdlogLWHTXEfGDJzLohEzVea",
            "object": "thread.message",
            "created_at": 1705277906,
            "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "El rendimiento de las marcas de automóviles en el último trimestre se presenta a continuación, ordenado por el total de ventas:\n\n1. **Toyota**\n   - Total de Ventas: 2,425 unidades\n   - Total de Ingresos: $123,760,100 (aprox.)\n   - Precio Promedio: $50,059.70\n\n2. **Ford**\n   - Total de Ventas: 2,385 unidades\n   - Total de Ingresos: $119,076,700 (aprox.)\n   - Precio Promedio: $49,083.94\n\n3. **Chevrolet**\n   - Total de Ventas: 2,377 unidades\n   - Total de Ingresos: $113,681,900 (aprox.)\n   - Precio Promedio: $48,596.30\n\n4. **Hyundai**\n   - Total de Ventas: 2,377 unidades\n   - Total de Ingresos: $124,655,500 (aprox.)\n   - Precio Promedio: $50,582.14\n\n... y así sucesivamente con las marcas restantes que encuentras en la lista.\n\nDe este análisis preliminar, podemos observar que Toyota lidera en términos de unidades vendidas, seguido muy de cerca por Ford y Chevrolet. En términos de ingresos, Hyundai y Volkswagen muestran números fuertes a pesar de tener menos unidades vendidas en comparación con Chevrolet debido a sus precios promedio más altos. Esto sugiere que podríamos centrarnos en Hyundai y Volkswagen para maximizar ingresos, dada la combinación de precio promedio alto y un volumen de ventas significativo.\n\n#### Proyección para el Próximo Trimestre\n\nPara crear una proyección de ventas para el próximo trimestre, consideraremos dos aspectos: el rendimiento histórico de la marca y la tendencia general del mercado. Utilizaremos un modelo simple de series temporales para estimar las ventas futuras de cada marca. Debido a que las proyecciones pueden depender de múltiples factores y suposiciones, mantendremos el modelo básico con los datos disponibles.\n\nComencemos desarrollando el modelo de proyección.",
                  "annotations": []
                }
              }
            ],
            "file_ids": [],
            "assistant_id": "asst_OCd57jQGcrbwPgsDnBJqkvHn",
            "run_id": "run_gtUTCprxXxoEyjS7u4V5FcdA",
            "metadata": {}
          },
          {
            "id": "msg_HQQbAZODkDCjsErYOgds8f7c",
            "object": "thread.message",
            "created_at": 1705277871,
            "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "Las estadísticas descriptivas del conjunto de datos nos proporcionan una visión general de las distribuciones de precio y ventas.\n\n**Precio (USD)**\n- **Media**: $49,376.38\n- **Mediana**: $49,528.61\n- **Desviación estándar**: $17,345.93\n- **Mínimo**: $20,013.96\n- **Máximo**: $79,925.64\n- **Asimetría (Skewness)**: 0.027, lo que indica una distribución simétrica alrededor de la media.\n- **Curtosis**: -1.196, lo que sugiere una distribución relativamente plana respecto a una distribución normal (leptocúrtica).\n\n**Ventas**\n- **Media**: 25.26 unidades vendidas.\n- **Mediana**: 25 unidades vendidas.\n- **Desviación estándar**: 14.96\n- **Rango**: 0 a 50 unidades.\n- **Asimetría (Skewness)**: -0.020, una distribución muy cercana a la simetría.\n- **Curtosis**: -1.230, también indica una distribución más aplanada que la normal.\n\nA partir de estas estadísticas, podemos interpretar que los precios de los automóviles tienen un rango amplio y están distribuidos alrededor de la media de una manera bastante uniforme. Las ventas tienen un rango de 0 a 50 unidades, y la media de ventas unitarias es de aproximadamente 25, lo que podría ser un buen punto de referencia para valorar el rendimiento de cada marca.\n\nEl siguiente paso será analizar el rendimiento de las distintas marcas de automóviles y realizar una proyección para el próximo trimestre para comprender en qué marcas deberíamos centrar nuestros esfuerzos para maximizar las ventas. \n\n#### Análisis de Rendimiento por Marca\n\nVamos a calcular el total de ventas y los ingresos por marca, así como el precio promedio por marca, lo cual nos ayudará a identificar qué marcas tienen el mayor rendimiento en términos de unidades vendidas y generación de ingresos.\n\nPosteriormente, crearemos un modelo de proyección para el próximo trimestre basado en los datos actuales.\n\nProcedamos con el análisis por marca.",
                  "annotations": []
                }
              }
            ],
            "file_ids": [],
            "assistant_id": "asst_OCd57jQGcrbwPgsDnBJqkvHn",
            "run_id": "run_gtUTCprxXxoEyjS7u4V5FcdA",
            "metadata": {}
          },
          {
            "id": "msg_zz4ThTyiqmSwqXn4P1jKiwa1",
            "object": "thread.message",
            "created_at": 1705277855,
            "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "Hemos recibido correctamente el reporte de ventas por marca de automóviles correspondiente al último trimestre. El conjunto de datos consta de 910 entradas y se compone de las siguientes variables:\n\n- **Fecha**: Día de las ventas, registrada sin valores faltantes.\n- **Marca**: Marca del automóvil vendido, todas las entradas están completas.\n- **Precio (USD)**: Precio unitario del automóvil vendido, también completo en el conjunto de datos.\n- **Ventas**: Cantidad de ventas unitarias totales, sin valores faltantes.\n\nAntes de proceder con el análisis de rendimiento de las marcas y con la proyección para el próximo trimestre, revisaremos las estadísticas descriptivas del conjunto de datos. \n\n#### Estadísticas Descriptivas\n\nVamos a calcular las estadísticas descriptivas como paso inicial para entender mejor la distribución de los precios y las ventas, así como algunas medidas adicionales que describirán la forma de la distribución de nuestros datos, tales como la asimetría (skewness) y la curtosis (kurtosis). \n\nProcederemos a realizar los cálculos pertinentes.",
                  "annotations": []
                }
              }
            ],
            "file_ids": [],
            "assistant_id": "asst_OCd57jQGcrbwPgsDnBJqkvHn",
            "run_id": "run_gtUTCprxXxoEyjS7u4V5FcdA",
            "metadata": {}
          },
          {
            "id": "msg_za9woZalgPw3JdhYR0l1MX36",
            "object": "thread.message",
            "created_at": 1705277830,
            "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "1. What is the data file? Es un reporte de ventas por marca de carro, del ultimo Q\n1.1 File type: .xlsx\n2. What the data means:\n - Fecha: Dia de las ventas\n- Marca: Marca del carro vendido\n- Precio: Precio unitario\n- Ventas: Ventas unitarias totales\n3. What is the focus of the analysis?: Quiero hacer un analisis del performance las marcas que vendo en mi consesionario en el ultimo Q, y crear una proyeccion para el proximo Q, y saber en que marcas centrarme para maximisar mis ventas",
                  "annotations": []
                }
              }
            ],
            "file_ids": [
              "file-9q0wf0gqt90lP60UMcYrry2c"
            ],
            "assistant_id": null,
            "run_id": null,
            "metadata": {}
          }
        ],
        "first_id": "msg_sXLP2XE6RjfZjF7oSCRDMVh1",
        "last_id": "msg_za9woZalgPw3JdhYR0l1MX36",
        "has_more": false
      },
      "data": [
        {
          "id": "msg_sXLP2XE6RjfZjF7oSCRDMVh1",
          "object": "thread.message",
          "created_at": 1705277971,
          "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": {
                "value": "Después de ajustar el modelo simplificado de suavizado exponencial sin considerar la estacionalidad debido a la limitada cantidad de datos, hemos obtenido las siguientes proyecciones de ventas para el próximo trimestre. Es importante notar que se han producido algunos valores negativos en los pronósticos, lo cual no tiene sentido práctico para las ventas; esto indica que el modelo no se ajusta adecuadamente a los datos, posiblemente debido a la escasez de datos históricos para algunas marcas. Es posible que necesitemos recopilar más datos o explorar otros métodos de pronóstico más adecuados para la naturaleza de nuestros datos.\n\nSin embargo, aquí están los valores proyectados para las ventas:\n\n- **Audi**: Disminución progresiva hasta -1,076.98 unidades (estos valores negativos no son prácticos y reflejan un problema con la modelización de esta marca)\n- **BMW**: Reducción para el cuarto mes hasta 346.67 unidades\n- **Chevrolet**: Disminución progresiva hasta -524.07 unidades (valor no práctico)\n- **Ford**: Incremento hasta 697.63 unidades\n- **Honda**: Reducción para el cuarto mes hasta 427.14 unidades\n- **Hyundai**: Disminución progresiva hasta -538.52 unidades (valor no práctico)\n- **Mercedes**: Reducción para el cuarto mes hasta 488.98 unidades\n- **Nissan**: Disminución progresiva hasta -255.78 unidades (valor no práctico)\n- **Toyota**: Disminución progresiva hasta -183.82 unidades (valor no práctico)\n- **Volkswagen**: Reducción para el cuarto mes hasta 431.18 unidades\n\n#### Recomendaciones para Maximizar Ventas\n\nDado que los modelos de pronóstico han generado valores no prácticos para algunas marcas, recomendamos la cautela al utilizar estos pronósticos para la toma de decisiones. Una posible manera de abordar esta situación es concentrar esfuerzos de marketing y ventas en las marcas con proyecciones positivas y para las que el modelo ajustó mejor, como **Ford**, que muestra una tendencia al alza.\n\nAdemás, sería provechoso considerar los resultados del rendimiento pasado (análisis de las ventas y los ingresos), donde marcas como **Toyota**, **Hyundai** y **Volkswagen** mostraron números fuertes. Una estrategia combinada que tome en cuenta estas marcas de alto rendimiento y ajuste las proyecciones futuras podría ser más beneficioso para maximizar las ventas en el próximo trimestre.\n\nPara concluir, se recomienda una evaluación más profunda de los modelos predictivos y la adquisición de más datos para futuras proyecciones. Las acciones de la empresa deberían ser informadas tanto por el rendimiento histórico como por las tendencias del mercado y datos de la industria automotriz más amplios.",
                "annotations": []
              }
            }
          ],
          "file_ids": [],
          "assistant_id": "asst_OCd57jQGcrbwPgsDnBJqkvHn",
          "run_id": "run_gtUTCprxXxoEyjS7u4V5FcdA",
          "metadata": {}
        },
        {
          "id": "msg_2roOobAlBCBui8ehU8ao9k31",
          "object": "thread.message",
          "created_at": 1705277951,
          "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": {
                "value": "Hemos encontrado un problema al intentar crear una proyección para el próximo trimestre. El modelo de suavizado exponencial de Holt-Winters requiere al menos dos ciclos completos de datos estacionales para calcular los valores iniciales de la temporada de forma heurística, pero parece que no contamos con suficientes ciclos en los datos proporcionados.\n\nComo alternativa, podemos ajustar el enfoque de modelado o simplificar el modelo para no considerar la estacionalidad. Dado que el objetivo es obtener una proyección básica para el próximo trimestre, procederemos a realizar el modelado sin la componente estacional, utilizando una tendencia aditiva.\n\nProcederemos ahora a ajustar y proyectar con el modelo simplificado.",
                "annotations": []
              }
            }
          ],
          "file_ids": [],
          "assistant_id": "asst_OCd57jQGcrbwPgsDnBJqkvHn",
          "run_id": "run_gtUTCprxXxoEyjS7u4V5FcdA",
          "metadata": {}
        },
        {
          "id": "msg_ZdlogLWHTXEfGDJzLohEzVea",
          "object": "thread.message",
          "created_at": 1705277906,
          "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": {
                "value": "El rendimiento de las marcas de automóviles en el último trimestre se presenta a continuación, ordenado por el total de ventas:\n\n1. **Toyota**\n   - Total de Ventas: 2,425 unidades\n   - Total de Ingresos: $123,760,100 (aprox.)\n   - Precio Promedio: $50,059.70\n\n2. **Ford**\n   - Total de Ventas: 2,385 unidades\n   - Total de Ingresos: $119,076,700 (aprox.)\n   - Precio Promedio: $49,083.94\n\n3. **Chevrolet**\n   - Total de Ventas: 2,377 unidades\n   - Total de Ingresos: $113,681,900 (aprox.)\n   - Precio Promedio: $48,596.30\n\n4. **Hyundai**\n   - Total de Ventas: 2,377 unidades\n   - Total de Ingresos: $124,655,500 (aprox.)\n   - Precio Promedio: $50,582.14\n\n... y así sucesivamente con las marcas restantes que encuentras en la lista.\n\nDe este análisis preliminar, podemos observar que Toyota lidera en términos de unidades vendidas, seguido muy de cerca por Ford y Chevrolet. En términos de ingresos, Hyundai y Volkswagen muestran números fuertes a pesar de tener menos unidades vendidas en comparación con Chevrolet debido a sus precios promedio más altos. Esto sugiere que podríamos centrarnos en Hyundai y Volkswagen para maximizar ingresos, dada la combinación de precio promedio alto y un volumen de ventas significativo.\n\n#### Proyección para el Próximo Trimestre\n\nPara crear una proyección de ventas para el próximo trimestre, consideraremos dos aspectos: el rendimiento histórico de la marca y la tendencia general del mercado. Utilizaremos un modelo simple de series temporales para estimar las ventas futuras de cada marca. Debido a que las proyecciones pueden depender de múltiples factores y suposiciones, mantendremos el modelo básico con los datos disponibles.\n\nComencemos desarrollando el modelo de proyección.",
                "annotations": []
              }
            }
          ],
          "file_ids": [],
          "assistant_id": "asst_OCd57jQGcrbwPgsDnBJqkvHn",
          "run_id": "run_gtUTCprxXxoEyjS7u4V5FcdA",
          "metadata": {}
        },
        {
          "id": "msg_HQQbAZODkDCjsErYOgds8f7c",
          "object": "thread.message",
          "created_at": 1705277871,
          "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": {
                "value": "Las estadísticas descriptivas del conjunto de datos nos proporcionan una visión general de las distribuciones de precio y ventas.\n\n**Precio (USD)**\n- **Media**: $49,376.38\n- **Mediana**: $49,528.61\n- **Desviación estándar**: $17,345.93\n- **Mínimo**: $20,013.96\n- **Máximo**: $79,925.64\n- **Asimetría (Skewness)**: 0.027, lo que indica una distribución simétrica alrededor de la media.\n- **Curtosis**: -1.196, lo que sugiere una distribución relativamente plana respecto a una distribución normal (leptocúrtica).\n\n**Ventas**\n- **Media**: 25.26 unidades vendidas.\n- **Mediana**: 25 unidades vendidas.\n- **Desviación estándar**: 14.96\n- **Rango**: 0 a 50 unidades.\n- **Asimetría (Skewness)**: -0.020, una distribución muy cercana a la simetría.\n- **Curtosis**: -1.230, también indica una distribución más aplanada que la normal.\n\nA partir de estas estadísticas, podemos interpretar que los precios de los automóviles tienen un rango amplio y están distribuidos alrededor de la media de una manera bastante uniforme. Las ventas tienen un rango de 0 a 50 unidades, y la media de ventas unitarias es de aproximadamente 25, lo que podría ser un buen punto de referencia para valorar el rendimiento de cada marca.\n\nEl siguiente paso será analizar el rendimiento de las distintas marcas de automóviles y realizar una proyección para el próximo trimestre para comprender en qué marcas deberíamos centrar nuestros esfuerzos para maximizar las ventas. \n\n#### Análisis de Rendimiento por Marca\n\nVamos a calcular el total de ventas y los ingresos por marca, así como el precio promedio por marca, lo cual nos ayudará a identificar qué marcas tienen el mayor rendimiento en términos de unidades vendidas y generación de ingresos.\n\nPosteriormente, crearemos un modelo de proyección para el próximo trimestre basado en los datos actuales.\n\nProcedamos con el análisis por marca.",
                "annotations": []
              }
            }
          ],
          "file_ids": [],
          "assistant_id": "asst_OCd57jQGcrbwPgsDnBJqkvHn",
          "run_id": "run_gtUTCprxXxoEyjS7u4V5FcdA",
          "metadata": {}
        },
        {
          "id": "msg_zz4ThTyiqmSwqXn4P1jKiwa1",
          "object": "thread.message",
          "created_at": 1705277855,
          "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": {
                "value": "Hemos recibido correctamente el reporte de ventas por marca de automóviles correspondiente al último trimestre. El conjunto de datos consta de 910 entradas y se compone de las siguientes variables:\n\n- **Fecha**: Día de las ventas, registrada sin valores faltantes.\n- **Marca**: Marca del automóvil vendido, todas las entradas están completas.\n- **Precio (USD)**: Precio unitario del automóvil vendido, también completo en el conjunto de datos.\n- **Ventas**: Cantidad de ventas unitarias totales, sin valores faltantes.\n\nAntes de proceder con el análisis de rendimiento de las marcas y con la proyección para el próximo trimestre, revisaremos las estadísticas descriptivas del conjunto de datos. \n\n#### Estadísticas Descriptivas\n\nVamos a calcular las estadísticas descriptivas como paso inicial para entender mejor la distribución de los precios y las ventas, así como algunas medidas adicionales que describirán la forma de la distribución de nuestros datos, tales como la asimetría (skewness) y la curtosis (kurtosis). \n\nProcederemos a realizar los cálculos pertinentes.",
                "annotations": []
              }
            }
          ],
          "file_ids": [],
          "assistant_id": "asst_OCd57jQGcrbwPgsDnBJqkvHn",
          "run_id": "run_gtUTCprxXxoEyjS7u4V5FcdA",
          "metadata": {}
        },
        {
          "id": "msg_za9woZalgPw3JdhYR0l1MX36",
          "object": "thread.message",
          "created_at": 1705277830,
          "thread_id": "thread_lsT1dfWQJRUHjkMdwHAfiqaZ",
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": {
                "value": "1. What is the data file? Es un reporte de ventas por marca de carro, del ultimo Q\n1.1 File type: .xlsx\n2. What the data means:\n - Fecha: Dia de las ventas\n- Marca: Marca del carro vendido\n- Precio: Precio unitario\n- Ventas: Ventas unitarias totales\n3. What is the focus of the analysis?: Quiero hacer un analisis del performance las marcas que vendo en mi consesionario en el ultimo Q, y crear una proyeccion para el proximo Q, y saber en que marcas centrarme para maximisar mis ventas",
                "annotations": []
              }
            }
          ],
          "file_ids": [
            "file-9q0wf0gqt90lP60UMcYrry2c"
          ],
          "assistant_id": null,
          "run_id": null,
          "metadata": {}
        }
      ],
    };
  }

  private initThread(): void {
    this.threadPromise = this.openai.beta.threads.create();
  }

  private async getThread(): Promise<Thread> {
    if (!this.threadPromise) {
      this.initThread();
    }
    return this.threadPromise;
  }

  async postMessage(message: string, filePath: string): Promise<void> {
    this.initThread();
    const thread = await this.getThread();

    const fileId = await this.createFile(filePath);
    await this.openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: message,
        file_ids: [fileId],
      }
    );
  }

  private async createFile(filePath: string) : Promise<string> {
    const openAiFile = await this.openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });

    return openAiFile.id;
  }

  async processMessage(assistantId: string): Promise<any> {
    const messagea = this.testData();

    const mes = messagea.data.filter((msg) => msg.role == "assistant");
    mes.sort((a, b) => a.created_at - b.created_at);

    return mes;

    const runId = await this.createRun(assistantId);
    const toolOutputs = await this.processRun(runId);
    const thread = await this.getThread();
    const messages = await this.openai.beta.threads.messages.list(thread.id);

    return { "analysis": messages, toolOutputs };
  }

  private async createRun(assistantId: string): Promise<string> {
    const thread = await this.getThread();
    const run = await this.openai.beta.threads.runs.create(
      thread.id,
      { assistant_id: assistantId }
    );
    return run.id;
  }

  private async processRun(runId: string): Promise<any[]> {
    let runner: OpenAI.Beta.Threads.Runs.Run;
    let toolOutputs: any[] = [];
    const thread = await this.getThread();

    do {
      runner = await this.openai.beta.threads.runs.retrieve(thread.id, runId);
      const runToolOutputs = await this.handleRunStatus(runner, runId);
      if (runToolOutputs) {
        toolOutputs = runToolOutputs;
      }
    } while (
      !["expired", "completed", "failed", "cancelled"].includes(runner.status)
    );

    return toolOutputs;
  }

  private async handleRunStatus(
    runner: OpenAI.Beta.Threads.Runs.Run,
    runId: string
  ): Promise<any[] | null> {
    log(runner);

    if (
      runner.status === "requires_action" &&
      runner.required_action?.type === "submit_tool_outputs"
    ) {
      const thread = await this.getThread();
      const toolOutputs = runner.required_action.submit_tool_outputs.tool_calls
        .map((toolCall) => ({
          tool_call_id: toolCall.id,
          output: toolCall.function.arguments,
        }));

      await this.openai.beta.threads.runs.submitToolOutputs(
        thread.id, runId, { tool_outputs: toolOutputs }
      );
      await this.sleep(200);

      return toolOutputs;
    } else {
      await this.sleep(100);
      return null;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default new OpenAIService();
