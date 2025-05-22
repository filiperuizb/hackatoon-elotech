
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model tipo_documento
 * 
 */
export type tipo_documento = $Result.DefaultSelection<Prisma.$tipo_documentoPayload>
/**
 * Model especialidade
 * 
 */
export type especialidade = $Result.DefaultSelection<Prisma.$especialidadePayload>
/**
 * Model consulta
 * 
 */
export type consulta = $Result.DefaultSelection<Prisma.$consultaPayload>
/**
 * Model paciente
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type paciente = $Result.DefaultSelection<Prisma.$pacientePayload>
/**
 * Model prescricao
 * 
 */
export type prescricao = $Result.DefaultSelection<Prisma.$prescricaoPayload>
/**
 * Model profissional_saude
 * 
 */
export type profissional_saude = $Result.DefaultSelection<Prisma.$profissional_saudePayload>
/**
 * Model template
 * 
 */
export type template = $Result.DefaultSelection<Prisma.$templatePayload>
/**
 * Model unidade_saude
 * 
 */
export type unidade_saude = $Result.DefaultSelection<Prisma.$unidade_saudePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tipo_documentos
 * const tipo_documentos = await prisma.tipo_documento.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tipo_documentos
   * const tipo_documentos = await prisma.tipo_documento.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.tipo_documento`: Exposes CRUD operations for the **tipo_documento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tipo_documentos
    * const tipo_documentos = await prisma.tipo_documento.findMany()
    * ```
    */
  get tipo_documento(): Prisma.tipo_documentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.especialidade`: Exposes CRUD operations for the **especialidade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Especialidades
    * const especialidades = await prisma.especialidade.findMany()
    * ```
    */
  get especialidade(): Prisma.especialidadeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consulta`: Exposes CRUD operations for the **consulta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consultas
    * const consultas = await prisma.consulta.findMany()
    * ```
    */
  get consulta(): Prisma.consultaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paciente`: Exposes CRUD operations for the **paciente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pacientes
    * const pacientes = await prisma.paciente.findMany()
    * ```
    */
  get paciente(): Prisma.pacienteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prescricao`: Exposes CRUD operations for the **prescricao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prescricaos
    * const prescricaos = await prisma.prescricao.findMany()
    * ```
    */
  get prescricao(): Prisma.prescricaoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profissional_saude`: Exposes CRUD operations for the **profissional_saude** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profissional_saudes
    * const profissional_saudes = await prisma.profissional_saude.findMany()
    * ```
    */
  get profissional_saude(): Prisma.profissional_saudeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.template`: Exposes CRUD operations for the **template** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Templates
    * const templates = await prisma.template.findMany()
    * ```
    */
  get template(): Prisma.templateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.unidade_saude`: Exposes CRUD operations for the **unidade_saude** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Unidade_saudes
    * const unidade_saudes = await prisma.unidade_saude.findMany()
    * ```
    */
  get unidade_saude(): Prisma.unidade_saudeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    tipo_documento: 'tipo_documento',
    especialidade: 'especialidade',
    consulta: 'consulta',
    paciente: 'paciente',
    prescricao: 'prescricao',
    profissional_saude: 'profissional_saude',
    template: 'template',
    unidade_saude: 'unidade_saude'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "tipo_documento" | "especialidade" | "consulta" | "paciente" | "prescricao" | "profissional_saude" | "template" | "unidade_saude"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      tipo_documento: {
        payload: Prisma.$tipo_documentoPayload<ExtArgs>
        fields: Prisma.tipo_documentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tipo_documentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_documentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tipo_documentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_documentoPayload>
          }
          findFirst: {
            args: Prisma.tipo_documentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_documentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tipo_documentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_documentoPayload>
          }
          findMany: {
            args: Prisma.tipo_documentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_documentoPayload>[]
          }
          create: {
            args: Prisma.tipo_documentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_documentoPayload>
          }
          createMany: {
            args: Prisma.tipo_documentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tipo_documentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_documentoPayload>[]
          }
          delete: {
            args: Prisma.tipo_documentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_documentoPayload>
          }
          update: {
            args: Prisma.tipo_documentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_documentoPayload>
          }
          deleteMany: {
            args: Prisma.tipo_documentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tipo_documentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tipo_documentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_documentoPayload>[]
          }
          upsert: {
            args: Prisma.tipo_documentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_documentoPayload>
          }
          aggregate: {
            args: Prisma.Tipo_documentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTipo_documento>
          }
          groupBy: {
            args: Prisma.tipo_documentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tipo_documentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.tipo_documentoCountArgs<ExtArgs>
            result: $Utils.Optional<Tipo_documentoCountAggregateOutputType> | number
          }
        }
      }
      especialidade: {
        payload: Prisma.$especialidadePayload<ExtArgs>
        fields: Prisma.especialidadeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.especialidadeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$especialidadePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.especialidadeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$especialidadePayload>
          }
          findFirst: {
            args: Prisma.especialidadeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$especialidadePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.especialidadeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$especialidadePayload>
          }
          findMany: {
            args: Prisma.especialidadeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$especialidadePayload>[]
          }
          create: {
            args: Prisma.especialidadeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$especialidadePayload>
          }
          createMany: {
            args: Prisma.especialidadeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.especialidadeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$especialidadePayload>[]
          }
          delete: {
            args: Prisma.especialidadeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$especialidadePayload>
          }
          update: {
            args: Prisma.especialidadeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$especialidadePayload>
          }
          deleteMany: {
            args: Prisma.especialidadeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.especialidadeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.especialidadeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$especialidadePayload>[]
          }
          upsert: {
            args: Prisma.especialidadeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$especialidadePayload>
          }
          aggregate: {
            args: Prisma.EspecialidadeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEspecialidade>
          }
          groupBy: {
            args: Prisma.especialidadeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EspecialidadeGroupByOutputType>[]
          }
          count: {
            args: Prisma.especialidadeCountArgs<ExtArgs>
            result: $Utils.Optional<EspecialidadeCountAggregateOutputType> | number
          }
        }
      }
      consulta: {
        payload: Prisma.$consultaPayload<ExtArgs>
        fields: Prisma.consultaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.consultaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consultaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.consultaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consultaPayload>
          }
          findFirst: {
            args: Prisma.consultaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consultaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.consultaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consultaPayload>
          }
          findMany: {
            args: Prisma.consultaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consultaPayload>[]
          }
          create: {
            args: Prisma.consultaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consultaPayload>
          }
          createMany: {
            args: Prisma.consultaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.consultaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consultaPayload>[]
          }
          delete: {
            args: Prisma.consultaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consultaPayload>
          }
          update: {
            args: Prisma.consultaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consultaPayload>
          }
          deleteMany: {
            args: Prisma.consultaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.consultaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.consultaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consultaPayload>[]
          }
          upsert: {
            args: Prisma.consultaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consultaPayload>
          }
          aggregate: {
            args: Prisma.ConsultaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsulta>
          }
          groupBy: {
            args: Prisma.consultaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsultaGroupByOutputType>[]
          }
          count: {
            args: Prisma.consultaCountArgs<ExtArgs>
            result: $Utils.Optional<ConsultaCountAggregateOutputType> | number
          }
        }
      }
      paciente: {
        payload: Prisma.$pacientePayload<ExtArgs>
        fields: Prisma.pacienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pacienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pacientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pacienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pacientePayload>
          }
          findFirst: {
            args: Prisma.pacienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pacientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pacienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pacientePayload>
          }
          findMany: {
            args: Prisma.pacienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pacientePayload>[]
          }
          create: {
            args: Prisma.pacienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pacientePayload>
          }
          createMany: {
            args: Prisma.pacienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.pacienteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pacientePayload>[]
          }
          delete: {
            args: Prisma.pacienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pacientePayload>
          }
          update: {
            args: Prisma.pacienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pacientePayload>
          }
          deleteMany: {
            args: Prisma.pacienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pacienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.pacienteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pacientePayload>[]
          }
          upsert: {
            args: Prisma.pacienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pacientePayload>
          }
          aggregate: {
            args: Prisma.PacienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaciente>
          }
          groupBy: {
            args: Prisma.pacienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<PacienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.pacienteCountArgs<ExtArgs>
            result: $Utils.Optional<PacienteCountAggregateOutputType> | number
          }
        }
      }
      prescricao: {
        payload: Prisma.$prescricaoPayload<ExtArgs>
        fields: Prisma.prescricaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.prescricaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescricaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.prescricaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescricaoPayload>
          }
          findFirst: {
            args: Prisma.prescricaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescricaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.prescricaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescricaoPayload>
          }
          findMany: {
            args: Prisma.prescricaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescricaoPayload>[]
          }
          create: {
            args: Prisma.prescricaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescricaoPayload>
          }
          createMany: {
            args: Prisma.prescricaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.prescricaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescricaoPayload>[]
          }
          delete: {
            args: Prisma.prescricaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescricaoPayload>
          }
          update: {
            args: Prisma.prescricaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescricaoPayload>
          }
          deleteMany: {
            args: Prisma.prescricaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.prescricaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.prescricaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescricaoPayload>[]
          }
          upsert: {
            args: Prisma.prescricaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$prescricaoPayload>
          }
          aggregate: {
            args: Prisma.PrescricaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrescricao>
          }
          groupBy: {
            args: Prisma.prescricaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrescricaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.prescricaoCountArgs<ExtArgs>
            result: $Utils.Optional<PrescricaoCountAggregateOutputType> | number
          }
        }
      }
      profissional_saude: {
        payload: Prisma.$profissional_saudePayload<ExtArgs>
        fields: Prisma.profissional_saudeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.profissional_saudeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profissional_saudePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.profissional_saudeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profissional_saudePayload>
          }
          findFirst: {
            args: Prisma.profissional_saudeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profissional_saudePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.profissional_saudeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profissional_saudePayload>
          }
          findMany: {
            args: Prisma.profissional_saudeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profissional_saudePayload>[]
          }
          create: {
            args: Prisma.profissional_saudeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profissional_saudePayload>
          }
          createMany: {
            args: Prisma.profissional_saudeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.profissional_saudeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profissional_saudePayload>[]
          }
          delete: {
            args: Prisma.profissional_saudeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profissional_saudePayload>
          }
          update: {
            args: Prisma.profissional_saudeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profissional_saudePayload>
          }
          deleteMany: {
            args: Prisma.profissional_saudeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.profissional_saudeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.profissional_saudeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profissional_saudePayload>[]
          }
          upsert: {
            args: Prisma.profissional_saudeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profissional_saudePayload>
          }
          aggregate: {
            args: Prisma.Profissional_saudeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfissional_saude>
          }
          groupBy: {
            args: Prisma.profissional_saudeGroupByArgs<ExtArgs>
            result: $Utils.Optional<Profissional_saudeGroupByOutputType>[]
          }
          count: {
            args: Prisma.profissional_saudeCountArgs<ExtArgs>
            result: $Utils.Optional<Profissional_saudeCountAggregateOutputType> | number
          }
        }
      }
      template: {
        payload: Prisma.$templatePayload<ExtArgs>
        fields: Prisma.templateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.templateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.templateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatePayload>
          }
          findFirst: {
            args: Prisma.templateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.templateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatePayload>
          }
          findMany: {
            args: Prisma.templateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatePayload>[]
          }
          create: {
            args: Prisma.templateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatePayload>
          }
          createMany: {
            args: Prisma.templateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.templateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatePayload>[]
          }
          delete: {
            args: Prisma.templateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatePayload>
          }
          update: {
            args: Prisma.templateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatePayload>
          }
          deleteMany: {
            args: Prisma.templateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.templateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.templateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatePayload>[]
          }
          upsert: {
            args: Prisma.templateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$templatePayload>
          }
          aggregate: {
            args: Prisma.TemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplate>
          }
          groupBy: {
            args: Prisma.templateGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.templateCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateCountAggregateOutputType> | number
          }
        }
      }
      unidade_saude: {
        payload: Prisma.$unidade_saudePayload<ExtArgs>
        fields: Prisma.unidade_saudeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.unidade_saudeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unidade_saudePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.unidade_saudeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unidade_saudePayload>
          }
          findFirst: {
            args: Prisma.unidade_saudeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unidade_saudePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.unidade_saudeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unidade_saudePayload>
          }
          findMany: {
            args: Prisma.unidade_saudeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unidade_saudePayload>[]
          }
          create: {
            args: Prisma.unidade_saudeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unidade_saudePayload>
          }
          createMany: {
            args: Prisma.unidade_saudeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.unidade_saudeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unidade_saudePayload>[]
          }
          delete: {
            args: Prisma.unidade_saudeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unidade_saudePayload>
          }
          update: {
            args: Prisma.unidade_saudeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unidade_saudePayload>
          }
          deleteMany: {
            args: Prisma.unidade_saudeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.unidade_saudeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.unidade_saudeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unidade_saudePayload>[]
          }
          upsert: {
            args: Prisma.unidade_saudeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$unidade_saudePayload>
          }
          aggregate: {
            args: Prisma.Unidade_saudeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUnidade_saude>
          }
          groupBy: {
            args: Prisma.unidade_saudeGroupByArgs<ExtArgs>
            result: $Utils.Optional<Unidade_saudeGroupByOutputType>[]
          }
          count: {
            args: Prisma.unidade_saudeCountArgs<ExtArgs>
            result: $Utils.Optional<Unidade_saudeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    tipo_documento?: tipo_documentoOmit
    especialidade?: especialidadeOmit
    consulta?: consultaOmit
    paciente?: pacienteOmit
    prescricao?: prescricaoOmit
    profissional_saude?: profissional_saudeOmit
    template?: templateOmit
    unidade_saude?: unidade_saudeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Tipo_documentoCountOutputType
   */

  export type Tipo_documentoCountOutputType = {
    profissional_saude: number
  }

  export type Tipo_documentoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profissional_saude?: boolean | Tipo_documentoCountOutputTypeCountProfissional_saudeArgs
  }

  // Custom InputTypes
  /**
   * Tipo_documentoCountOutputType without action
   */
  export type Tipo_documentoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tipo_documentoCountOutputType
     */
    select?: Tipo_documentoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Tipo_documentoCountOutputType without action
   */
  export type Tipo_documentoCountOutputTypeCountProfissional_saudeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: profissional_saudeWhereInput
  }


  /**
   * Count Type EspecialidadeCountOutputType
   */

  export type EspecialidadeCountOutputType = {
    profissional_saude: number
  }

  export type EspecialidadeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profissional_saude?: boolean | EspecialidadeCountOutputTypeCountProfissional_saudeArgs
  }

  // Custom InputTypes
  /**
   * EspecialidadeCountOutputType without action
   */
  export type EspecialidadeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspecialidadeCountOutputType
     */
    select?: EspecialidadeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EspecialidadeCountOutputType without action
   */
  export type EspecialidadeCountOutputTypeCountProfissional_saudeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: profissional_saudeWhereInput
  }


  /**
   * Count Type ConsultaCountOutputType
   */

  export type ConsultaCountOutputType = {
    prescricao: number
  }

  export type ConsultaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prescricao?: boolean | ConsultaCountOutputTypeCountPrescricaoArgs
  }

  // Custom InputTypes
  /**
   * ConsultaCountOutputType without action
   */
  export type ConsultaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConsultaCountOutputType
     */
    select?: ConsultaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConsultaCountOutputType without action
   */
  export type ConsultaCountOutputTypeCountPrescricaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: prescricaoWhereInput
  }


  /**
   * Count Type PacienteCountOutputType
   */

  export type PacienteCountOutputType = {
    consulta: number
  }

  export type PacienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consulta?: boolean | PacienteCountOutputTypeCountConsultaArgs
  }

  // Custom InputTypes
  /**
   * PacienteCountOutputType without action
   */
  export type PacienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PacienteCountOutputType
     */
    select?: PacienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PacienteCountOutputType without action
   */
  export type PacienteCountOutputTypeCountConsultaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: consultaWhereInput
  }


  /**
   * Count Type Profissional_saudeCountOutputType
   */

  export type Profissional_saudeCountOutputType = {
    consulta: number
  }

  export type Profissional_saudeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consulta?: boolean | Profissional_saudeCountOutputTypeCountConsultaArgs
  }

  // Custom InputTypes
  /**
   * Profissional_saudeCountOutputType without action
   */
  export type Profissional_saudeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profissional_saudeCountOutputType
     */
    select?: Profissional_saudeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Profissional_saudeCountOutputType without action
   */
  export type Profissional_saudeCountOutputTypeCountConsultaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: consultaWhereInput
  }


  /**
   * Count Type Unidade_saudeCountOutputType
   */

  export type Unidade_saudeCountOutputType = {
    consulta: number
  }

  export type Unidade_saudeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consulta?: boolean | Unidade_saudeCountOutputTypeCountConsultaArgs
  }

  // Custom InputTypes
  /**
   * Unidade_saudeCountOutputType without action
   */
  export type Unidade_saudeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Unidade_saudeCountOutputType
     */
    select?: Unidade_saudeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Unidade_saudeCountOutputType without action
   */
  export type Unidade_saudeCountOutputTypeCountConsultaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: consultaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model tipo_documento
   */

  export type AggregateTipo_documento = {
    _count: Tipo_documentoCountAggregateOutputType | null
    _min: Tipo_documentoMinAggregateOutputType | null
    _max: Tipo_documentoMaxAggregateOutputType | null
  }

  export type Tipo_documentoMinAggregateOutputType = {
    id: string | null
    nome: string | null
    descricao: string | null
  }

  export type Tipo_documentoMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    descricao: string | null
  }

  export type Tipo_documentoCountAggregateOutputType = {
    id: number
    nome: number
    descricao: number
    _all: number
  }


  export type Tipo_documentoMinAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
  }

  export type Tipo_documentoMaxAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
  }

  export type Tipo_documentoCountAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    _all?: true
  }

  export type Tipo_documentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tipo_documento to aggregate.
     */
    where?: tipo_documentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipo_documentos to fetch.
     */
    orderBy?: tipo_documentoOrderByWithRelationInput | tipo_documentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tipo_documentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipo_documentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipo_documentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tipo_documentos
    **/
    _count?: true | Tipo_documentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tipo_documentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tipo_documentoMaxAggregateInputType
  }

  export type GetTipo_documentoAggregateType<T extends Tipo_documentoAggregateArgs> = {
        [P in keyof T & keyof AggregateTipo_documento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTipo_documento[P]>
      : GetScalarType<T[P], AggregateTipo_documento[P]>
  }




  export type tipo_documentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tipo_documentoWhereInput
    orderBy?: tipo_documentoOrderByWithAggregationInput | tipo_documentoOrderByWithAggregationInput[]
    by: Tipo_documentoScalarFieldEnum[] | Tipo_documentoScalarFieldEnum
    having?: tipo_documentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tipo_documentoCountAggregateInputType | true
    _min?: Tipo_documentoMinAggregateInputType
    _max?: Tipo_documentoMaxAggregateInputType
  }

  export type Tipo_documentoGroupByOutputType = {
    id: string
    nome: string
    descricao: string | null
    _count: Tipo_documentoCountAggregateOutputType | null
    _min: Tipo_documentoMinAggregateOutputType | null
    _max: Tipo_documentoMaxAggregateOutputType | null
  }

  type GetTipo_documentoGroupByPayload<T extends tipo_documentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tipo_documentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tipo_documentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tipo_documentoGroupByOutputType[P]>
            : GetScalarType<T[P], Tipo_documentoGroupByOutputType[P]>
        }
      >
    >


  export type tipo_documentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    profissional_saude?: boolean | tipo_documento$profissional_saudeArgs<ExtArgs>
    _count?: boolean | Tipo_documentoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tipo_documento"]>

  export type tipo_documentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
  }, ExtArgs["result"]["tipo_documento"]>

  export type tipo_documentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
  }, ExtArgs["result"]["tipo_documento"]>

  export type tipo_documentoSelectScalar = {
    id?: boolean
    nome?: boolean
    descricao?: boolean
  }

  export type tipo_documentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "descricao", ExtArgs["result"]["tipo_documento"]>
  export type tipo_documentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profissional_saude?: boolean | tipo_documento$profissional_saudeArgs<ExtArgs>
    _count?: boolean | Tipo_documentoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type tipo_documentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type tipo_documentoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $tipo_documentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tipo_documento"
    objects: {
      profissional_saude: Prisma.$profissional_saudePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      descricao: string | null
    }, ExtArgs["result"]["tipo_documento"]>
    composites: {}
  }

  type tipo_documentoGetPayload<S extends boolean | null | undefined | tipo_documentoDefaultArgs> = $Result.GetResult<Prisma.$tipo_documentoPayload, S>

  type tipo_documentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tipo_documentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tipo_documentoCountAggregateInputType | true
    }

  export interface tipo_documentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tipo_documento'], meta: { name: 'tipo_documento' } }
    /**
     * Find zero or one Tipo_documento that matches the filter.
     * @param {tipo_documentoFindUniqueArgs} args - Arguments to find a Tipo_documento
     * @example
     * // Get one Tipo_documento
     * const tipo_documento = await prisma.tipo_documento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tipo_documentoFindUniqueArgs>(args: SelectSubset<T, tipo_documentoFindUniqueArgs<ExtArgs>>): Prisma__tipo_documentoClient<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tipo_documento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tipo_documentoFindUniqueOrThrowArgs} args - Arguments to find a Tipo_documento
     * @example
     * // Get one Tipo_documento
     * const tipo_documento = await prisma.tipo_documento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tipo_documentoFindUniqueOrThrowArgs>(args: SelectSubset<T, tipo_documentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tipo_documentoClient<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tipo_documento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_documentoFindFirstArgs} args - Arguments to find a Tipo_documento
     * @example
     * // Get one Tipo_documento
     * const tipo_documento = await prisma.tipo_documento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tipo_documentoFindFirstArgs>(args?: SelectSubset<T, tipo_documentoFindFirstArgs<ExtArgs>>): Prisma__tipo_documentoClient<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tipo_documento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_documentoFindFirstOrThrowArgs} args - Arguments to find a Tipo_documento
     * @example
     * // Get one Tipo_documento
     * const tipo_documento = await prisma.tipo_documento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tipo_documentoFindFirstOrThrowArgs>(args?: SelectSubset<T, tipo_documentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__tipo_documentoClient<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tipo_documentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_documentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tipo_documentos
     * const tipo_documentos = await prisma.tipo_documento.findMany()
     * 
     * // Get first 10 Tipo_documentos
     * const tipo_documentos = await prisma.tipo_documento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tipo_documentoWithIdOnly = await prisma.tipo_documento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tipo_documentoFindManyArgs>(args?: SelectSubset<T, tipo_documentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tipo_documento.
     * @param {tipo_documentoCreateArgs} args - Arguments to create a Tipo_documento.
     * @example
     * // Create one Tipo_documento
     * const Tipo_documento = await prisma.tipo_documento.create({
     *   data: {
     *     // ... data to create a Tipo_documento
     *   }
     * })
     * 
     */
    create<T extends tipo_documentoCreateArgs>(args: SelectSubset<T, tipo_documentoCreateArgs<ExtArgs>>): Prisma__tipo_documentoClient<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tipo_documentos.
     * @param {tipo_documentoCreateManyArgs} args - Arguments to create many Tipo_documentos.
     * @example
     * // Create many Tipo_documentos
     * const tipo_documento = await prisma.tipo_documento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tipo_documentoCreateManyArgs>(args?: SelectSubset<T, tipo_documentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tipo_documentos and returns the data saved in the database.
     * @param {tipo_documentoCreateManyAndReturnArgs} args - Arguments to create many Tipo_documentos.
     * @example
     * // Create many Tipo_documentos
     * const tipo_documento = await prisma.tipo_documento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tipo_documentos and only return the `id`
     * const tipo_documentoWithIdOnly = await prisma.tipo_documento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tipo_documentoCreateManyAndReturnArgs>(args?: SelectSubset<T, tipo_documentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tipo_documento.
     * @param {tipo_documentoDeleteArgs} args - Arguments to delete one Tipo_documento.
     * @example
     * // Delete one Tipo_documento
     * const Tipo_documento = await prisma.tipo_documento.delete({
     *   where: {
     *     // ... filter to delete one Tipo_documento
     *   }
     * })
     * 
     */
    delete<T extends tipo_documentoDeleteArgs>(args: SelectSubset<T, tipo_documentoDeleteArgs<ExtArgs>>): Prisma__tipo_documentoClient<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tipo_documento.
     * @param {tipo_documentoUpdateArgs} args - Arguments to update one Tipo_documento.
     * @example
     * // Update one Tipo_documento
     * const tipo_documento = await prisma.tipo_documento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tipo_documentoUpdateArgs>(args: SelectSubset<T, tipo_documentoUpdateArgs<ExtArgs>>): Prisma__tipo_documentoClient<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tipo_documentos.
     * @param {tipo_documentoDeleteManyArgs} args - Arguments to filter Tipo_documentos to delete.
     * @example
     * // Delete a few Tipo_documentos
     * const { count } = await prisma.tipo_documento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tipo_documentoDeleteManyArgs>(args?: SelectSubset<T, tipo_documentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tipo_documentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_documentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tipo_documentos
     * const tipo_documento = await prisma.tipo_documento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tipo_documentoUpdateManyArgs>(args: SelectSubset<T, tipo_documentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tipo_documentos and returns the data updated in the database.
     * @param {tipo_documentoUpdateManyAndReturnArgs} args - Arguments to update many Tipo_documentos.
     * @example
     * // Update many Tipo_documentos
     * const tipo_documento = await prisma.tipo_documento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tipo_documentos and only return the `id`
     * const tipo_documentoWithIdOnly = await prisma.tipo_documento.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tipo_documentoUpdateManyAndReturnArgs>(args: SelectSubset<T, tipo_documentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tipo_documento.
     * @param {tipo_documentoUpsertArgs} args - Arguments to update or create a Tipo_documento.
     * @example
     * // Update or create a Tipo_documento
     * const tipo_documento = await prisma.tipo_documento.upsert({
     *   create: {
     *     // ... data to create a Tipo_documento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tipo_documento we want to update
     *   }
     * })
     */
    upsert<T extends tipo_documentoUpsertArgs>(args: SelectSubset<T, tipo_documentoUpsertArgs<ExtArgs>>): Prisma__tipo_documentoClient<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tipo_documentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_documentoCountArgs} args - Arguments to filter Tipo_documentos to count.
     * @example
     * // Count the number of Tipo_documentos
     * const count = await prisma.tipo_documento.count({
     *   where: {
     *     // ... the filter for the Tipo_documentos we want to count
     *   }
     * })
    **/
    count<T extends tipo_documentoCountArgs>(
      args?: Subset<T, tipo_documentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tipo_documentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tipo_documento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tipo_documentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Tipo_documentoAggregateArgs>(args: Subset<T, Tipo_documentoAggregateArgs>): Prisma.PrismaPromise<GetTipo_documentoAggregateType<T>>

    /**
     * Group by Tipo_documento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_documentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tipo_documentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tipo_documentoGroupByArgs['orderBy'] }
        : { orderBy?: tipo_documentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tipo_documentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipo_documentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tipo_documento model
   */
  readonly fields: tipo_documentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tipo_documento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tipo_documentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profissional_saude<T extends tipo_documento$profissional_saudeArgs<ExtArgs> = {}>(args?: Subset<T, tipo_documento$profissional_saudeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tipo_documento model
   */
  interface tipo_documentoFieldRefs {
    readonly id: FieldRef<"tipo_documento", 'String'>
    readonly nome: FieldRef<"tipo_documento", 'String'>
    readonly descricao: FieldRef<"tipo_documento", 'String'>
  }
    

  // Custom InputTypes
  /**
   * tipo_documento findUnique
   */
  export type tipo_documentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipo_documentoInclude<ExtArgs> | null
    /**
     * Filter, which tipo_documento to fetch.
     */
    where: tipo_documentoWhereUniqueInput
  }

  /**
   * tipo_documento findUniqueOrThrow
   */
  export type tipo_documentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipo_documentoInclude<ExtArgs> | null
    /**
     * Filter, which tipo_documento to fetch.
     */
    where: tipo_documentoWhereUniqueInput
  }

  /**
   * tipo_documento findFirst
   */
  export type tipo_documentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipo_documentoInclude<ExtArgs> | null
    /**
     * Filter, which tipo_documento to fetch.
     */
    where?: tipo_documentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipo_documentos to fetch.
     */
    orderBy?: tipo_documentoOrderByWithRelationInput | tipo_documentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tipo_documentos.
     */
    cursor?: tipo_documentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipo_documentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipo_documentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tipo_documentos.
     */
    distinct?: Tipo_documentoScalarFieldEnum | Tipo_documentoScalarFieldEnum[]
  }

  /**
   * tipo_documento findFirstOrThrow
   */
  export type tipo_documentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipo_documentoInclude<ExtArgs> | null
    /**
     * Filter, which tipo_documento to fetch.
     */
    where?: tipo_documentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipo_documentos to fetch.
     */
    orderBy?: tipo_documentoOrderByWithRelationInput | tipo_documentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tipo_documentos.
     */
    cursor?: tipo_documentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipo_documentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipo_documentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tipo_documentos.
     */
    distinct?: Tipo_documentoScalarFieldEnum | Tipo_documentoScalarFieldEnum[]
  }

  /**
   * tipo_documento findMany
   */
  export type tipo_documentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipo_documentoInclude<ExtArgs> | null
    /**
     * Filter, which tipo_documentos to fetch.
     */
    where?: tipo_documentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipo_documentos to fetch.
     */
    orderBy?: tipo_documentoOrderByWithRelationInput | tipo_documentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tipo_documentos.
     */
    cursor?: tipo_documentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipo_documentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipo_documentos.
     */
    skip?: number
    distinct?: Tipo_documentoScalarFieldEnum | Tipo_documentoScalarFieldEnum[]
  }

  /**
   * tipo_documento create
   */
  export type tipo_documentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipo_documentoInclude<ExtArgs> | null
    /**
     * The data needed to create a tipo_documento.
     */
    data: XOR<tipo_documentoCreateInput, tipo_documentoUncheckedCreateInput>
  }

  /**
   * tipo_documento createMany
   */
  export type tipo_documentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tipo_documentos.
     */
    data: tipo_documentoCreateManyInput | tipo_documentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tipo_documento createManyAndReturn
   */
  export type tipo_documentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * The data used to create many tipo_documentos.
     */
    data: tipo_documentoCreateManyInput | tipo_documentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tipo_documento update
   */
  export type tipo_documentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipo_documentoInclude<ExtArgs> | null
    /**
     * The data needed to update a tipo_documento.
     */
    data: XOR<tipo_documentoUpdateInput, tipo_documentoUncheckedUpdateInput>
    /**
     * Choose, which tipo_documento to update.
     */
    where: tipo_documentoWhereUniqueInput
  }

  /**
   * tipo_documento updateMany
   */
  export type tipo_documentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tipo_documentos.
     */
    data: XOR<tipo_documentoUpdateManyMutationInput, tipo_documentoUncheckedUpdateManyInput>
    /**
     * Filter which tipo_documentos to update
     */
    where?: tipo_documentoWhereInput
    /**
     * Limit how many tipo_documentos to update.
     */
    limit?: number
  }

  /**
   * tipo_documento updateManyAndReturn
   */
  export type tipo_documentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * The data used to update tipo_documentos.
     */
    data: XOR<tipo_documentoUpdateManyMutationInput, tipo_documentoUncheckedUpdateManyInput>
    /**
     * Filter which tipo_documentos to update
     */
    where?: tipo_documentoWhereInput
    /**
     * Limit how many tipo_documentos to update.
     */
    limit?: number
  }

  /**
   * tipo_documento upsert
   */
  export type tipo_documentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipo_documentoInclude<ExtArgs> | null
    /**
     * The filter to search for the tipo_documento to update in case it exists.
     */
    where: tipo_documentoWhereUniqueInput
    /**
     * In case the tipo_documento found by the `where` argument doesn't exist, create a new tipo_documento with this data.
     */
    create: XOR<tipo_documentoCreateInput, tipo_documentoUncheckedCreateInput>
    /**
     * In case the tipo_documento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tipo_documentoUpdateInput, tipo_documentoUncheckedUpdateInput>
  }

  /**
   * tipo_documento delete
   */
  export type tipo_documentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipo_documentoInclude<ExtArgs> | null
    /**
     * Filter which tipo_documento to delete.
     */
    where: tipo_documentoWhereUniqueInput
  }

  /**
   * tipo_documento deleteMany
   */
  export type tipo_documentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tipo_documentos to delete
     */
    where?: tipo_documentoWhereInput
    /**
     * Limit how many tipo_documentos to delete.
     */
    limit?: number
  }

  /**
   * tipo_documento.profissional_saude
   */
  export type tipo_documento$profissional_saudeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    where?: profissional_saudeWhereInput
    orderBy?: profissional_saudeOrderByWithRelationInput | profissional_saudeOrderByWithRelationInput[]
    cursor?: profissional_saudeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Profissional_saudeScalarFieldEnum | Profissional_saudeScalarFieldEnum[]
  }

  /**
   * tipo_documento without action
   */
  export type tipo_documentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipo_documentoInclude<ExtArgs> | null
  }


  /**
   * Model especialidade
   */

  export type AggregateEspecialidade = {
    _count: EspecialidadeCountAggregateOutputType | null
    _min: EspecialidadeMinAggregateOutputType | null
    _max: EspecialidadeMaxAggregateOutputType | null
  }

  export type EspecialidadeMinAggregateOutputType = {
    id: string | null
    nome: string | null
    descricao: string | null
  }

  export type EspecialidadeMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    descricao: string | null
  }

  export type EspecialidadeCountAggregateOutputType = {
    id: number
    nome: number
    descricao: number
    _all: number
  }


  export type EspecialidadeMinAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
  }

  export type EspecialidadeMaxAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
  }

  export type EspecialidadeCountAggregateInputType = {
    id?: true
    nome?: true
    descricao?: true
    _all?: true
  }

  export type EspecialidadeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which especialidade to aggregate.
     */
    where?: especialidadeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of especialidades to fetch.
     */
    orderBy?: especialidadeOrderByWithRelationInput | especialidadeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: especialidadeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` especialidades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` especialidades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned especialidades
    **/
    _count?: true | EspecialidadeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EspecialidadeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EspecialidadeMaxAggregateInputType
  }

  export type GetEspecialidadeAggregateType<T extends EspecialidadeAggregateArgs> = {
        [P in keyof T & keyof AggregateEspecialidade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEspecialidade[P]>
      : GetScalarType<T[P], AggregateEspecialidade[P]>
  }




  export type especialidadeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: especialidadeWhereInput
    orderBy?: especialidadeOrderByWithAggregationInput | especialidadeOrderByWithAggregationInput[]
    by: EspecialidadeScalarFieldEnum[] | EspecialidadeScalarFieldEnum
    having?: especialidadeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EspecialidadeCountAggregateInputType | true
    _min?: EspecialidadeMinAggregateInputType
    _max?: EspecialidadeMaxAggregateInputType
  }

  export type EspecialidadeGroupByOutputType = {
    id: string
    nome: string
    descricao: string | null
    _count: EspecialidadeCountAggregateOutputType | null
    _min: EspecialidadeMinAggregateOutputType | null
    _max: EspecialidadeMaxAggregateOutputType | null
  }

  type GetEspecialidadeGroupByPayload<T extends especialidadeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EspecialidadeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EspecialidadeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EspecialidadeGroupByOutputType[P]>
            : GetScalarType<T[P], EspecialidadeGroupByOutputType[P]>
        }
      >
    >


  export type especialidadeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
    profissional_saude?: boolean | especialidade$profissional_saudeArgs<ExtArgs>
    _count?: boolean | EspecialidadeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["especialidade"]>

  export type especialidadeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
  }, ExtArgs["result"]["especialidade"]>

  export type especialidadeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    descricao?: boolean
  }, ExtArgs["result"]["especialidade"]>

  export type especialidadeSelectScalar = {
    id?: boolean
    nome?: boolean
    descricao?: boolean
  }

  export type especialidadeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "descricao", ExtArgs["result"]["especialidade"]>
  export type especialidadeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profissional_saude?: boolean | especialidade$profissional_saudeArgs<ExtArgs>
    _count?: boolean | EspecialidadeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type especialidadeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type especialidadeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $especialidadePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "especialidade"
    objects: {
      profissional_saude: Prisma.$profissional_saudePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      descricao: string | null
    }, ExtArgs["result"]["especialidade"]>
    composites: {}
  }

  type especialidadeGetPayload<S extends boolean | null | undefined | especialidadeDefaultArgs> = $Result.GetResult<Prisma.$especialidadePayload, S>

  type especialidadeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<especialidadeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EspecialidadeCountAggregateInputType | true
    }

  export interface especialidadeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['especialidade'], meta: { name: 'especialidade' } }
    /**
     * Find zero or one Especialidade that matches the filter.
     * @param {especialidadeFindUniqueArgs} args - Arguments to find a Especialidade
     * @example
     * // Get one Especialidade
     * const especialidade = await prisma.especialidade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends especialidadeFindUniqueArgs>(args: SelectSubset<T, especialidadeFindUniqueArgs<ExtArgs>>): Prisma__especialidadeClient<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Especialidade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {especialidadeFindUniqueOrThrowArgs} args - Arguments to find a Especialidade
     * @example
     * // Get one Especialidade
     * const especialidade = await prisma.especialidade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends especialidadeFindUniqueOrThrowArgs>(args: SelectSubset<T, especialidadeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__especialidadeClient<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Especialidade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {especialidadeFindFirstArgs} args - Arguments to find a Especialidade
     * @example
     * // Get one Especialidade
     * const especialidade = await prisma.especialidade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends especialidadeFindFirstArgs>(args?: SelectSubset<T, especialidadeFindFirstArgs<ExtArgs>>): Prisma__especialidadeClient<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Especialidade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {especialidadeFindFirstOrThrowArgs} args - Arguments to find a Especialidade
     * @example
     * // Get one Especialidade
     * const especialidade = await prisma.especialidade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends especialidadeFindFirstOrThrowArgs>(args?: SelectSubset<T, especialidadeFindFirstOrThrowArgs<ExtArgs>>): Prisma__especialidadeClient<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Especialidades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {especialidadeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Especialidades
     * const especialidades = await prisma.especialidade.findMany()
     * 
     * // Get first 10 Especialidades
     * const especialidades = await prisma.especialidade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const especialidadeWithIdOnly = await prisma.especialidade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends especialidadeFindManyArgs>(args?: SelectSubset<T, especialidadeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Especialidade.
     * @param {especialidadeCreateArgs} args - Arguments to create a Especialidade.
     * @example
     * // Create one Especialidade
     * const Especialidade = await prisma.especialidade.create({
     *   data: {
     *     // ... data to create a Especialidade
     *   }
     * })
     * 
     */
    create<T extends especialidadeCreateArgs>(args: SelectSubset<T, especialidadeCreateArgs<ExtArgs>>): Prisma__especialidadeClient<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Especialidades.
     * @param {especialidadeCreateManyArgs} args - Arguments to create many Especialidades.
     * @example
     * // Create many Especialidades
     * const especialidade = await prisma.especialidade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends especialidadeCreateManyArgs>(args?: SelectSubset<T, especialidadeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Especialidades and returns the data saved in the database.
     * @param {especialidadeCreateManyAndReturnArgs} args - Arguments to create many Especialidades.
     * @example
     * // Create many Especialidades
     * const especialidade = await prisma.especialidade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Especialidades and only return the `id`
     * const especialidadeWithIdOnly = await prisma.especialidade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends especialidadeCreateManyAndReturnArgs>(args?: SelectSubset<T, especialidadeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Especialidade.
     * @param {especialidadeDeleteArgs} args - Arguments to delete one Especialidade.
     * @example
     * // Delete one Especialidade
     * const Especialidade = await prisma.especialidade.delete({
     *   where: {
     *     // ... filter to delete one Especialidade
     *   }
     * })
     * 
     */
    delete<T extends especialidadeDeleteArgs>(args: SelectSubset<T, especialidadeDeleteArgs<ExtArgs>>): Prisma__especialidadeClient<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Especialidade.
     * @param {especialidadeUpdateArgs} args - Arguments to update one Especialidade.
     * @example
     * // Update one Especialidade
     * const especialidade = await prisma.especialidade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends especialidadeUpdateArgs>(args: SelectSubset<T, especialidadeUpdateArgs<ExtArgs>>): Prisma__especialidadeClient<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Especialidades.
     * @param {especialidadeDeleteManyArgs} args - Arguments to filter Especialidades to delete.
     * @example
     * // Delete a few Especialidades
     * const { count } = await prisma.especialidade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends especialidadeDeleteManyArgs>(args?: SelectSubset<T, especialidadeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Especialidades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {especialidadeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Especialidades
     * const especialidade = await prisma.especialidade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends especialidadeUpdateManyArgs>(args: SelectSubset<T, especialidadeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Especialidades and returns the data updated in the database.
     * @param {especialidadeUpdateManyAndReturnArgs} args - Arguments to update many Especialidades.
     * @example
     * // Update many Especialidades
     * const especialidade = await prisma.especialidade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Especialidades and only return the `id`
     * const especialidadeWithIdOnly = await prisma.especialidade.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends especialidadeUpdateManyAndReturnArgs>(args: SelectSubset<T, especialidadeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Especialidade.
     * @param {especialidadeUpsertArgs} args - Arguments to update or create a Especialidade.
     * @example
     * // Update or create a Especialidade
     * const especialidade = await prisma.especialidade.upsert({
     *   create: {
     *     // ... data to create a Especialidade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Especialidade we want to update
     *   }
     * })
     */
    upsert<T extends especialidadeUpsertArgs>(args: SelectSubset<T, especialidadeUpsertArgs<ExtArgs>>): Prisma__especialidadeClient<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Especialidades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {especialidadeCountArgs} args - Arguments to filter Especialidades to count.
     * @example
     * // Count the number of Especialidades
     * const count = await prisma.especialidade.count({
     *   where: {
     *     // ... the filter for the Especialidades we want to count
     *   }
     * })
    **/
    count<T extends especialidadeCountArgs>(
      args?: Subset<T, especialidadeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EspecialidadeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Especialidade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspecialidadeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EspecialidadeAggregateArgs>(args: Subset<T, EspecialidadeAggregateArgs>): Prisma.PrismaPromise<GetEspecialidadeAggregateType<T>>

    /**
     * Group by Especialidade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {especialidadeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends especialidadeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: especialidadeGroupByArgs['orderBy'] }
        : { orderBy?: especialidadeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, especialidadeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEspecialidadeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the especialidade model
   */
  readonly fields: especialidadeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for especialidade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__especialidadeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profissional_saude<T extends especialidade$profissional_saudeArgs<ExtArgs> = {}>(args?: Subset<T, especialidade$profissional_saudeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the especialidade model
   */
  interface especialidadeFieldRefs {
    readonly id: FieldRef<"especialidade", 'String'>
    readonly nome: FieldRef<"especialidade", 'String'>
    readonly descricao: FieldRef<"especialidade", 'String'>
  }
    

  // Custom InputTypes
  /**
   * especialidade findUnique
   */
  export type especialidadeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: especialidadeInclude<ExtArgs> | null
    /**
     * Filter, which especialidade to fetch.
     */
    where: especialidadeWhereUniqueInput
  }

  /**
   * especialidade findUniqueOrThrow
   */
  export type especialidadeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: especialidadeInclude<ExtArgs> | null
    /**
     * Filter, which especialidade to fetch.
     */
    where: especialidadeWhereUniqueInput
  }

  /**
   * especialidade findFirst
   */
  export type especialidadeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: especialidadeInclude<ExtArgs> | null
    /**
     * Filter, which especialidade to fetch.
     */
    where?: especialidadeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of especialidades to fetch.
     */
    orderBy?: especialidadeOrderByWithRelationInput | especialidadeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for especialidades.
     */
    cursor?: especialidadeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` especialidades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` especialidades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of especialidades.
     */
    distinct?: EspecialidadeScalarFieldEnum | EspecialidadeScalarFieldEnum[]
  }

  /**
   * especialidade findFirstOrThrow
   */
  export type especialidadeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: especialidadeInclude<ExtArgs> | null
    /**
     * Filter, which especialidade to fetch.
     */
    where?: especialidadeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of especialidades to fetch.
     */
    orderBy?: especialidadeOrderByWithRelationInput | especialidadeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for especialidades.
     */
    cursor?: especialidadeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` especialidades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` especialidades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of especialidades.
     */
    distinct?: EspecialidadeScalarFieldEnum | EspecialidadeScalarFieldEnum[]
  }

  /**
   * especialidade findMany
   */
  export type especialidadeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: especialidadeInclude<ExtArgs> | null
    /**
     * Filter, which especialidades to fetch.
     */
    where?: especialidadeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of especialidades to fetch.
     */
    orderBy?: especialidadeOrderByWithRelationInput | especialidadeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing especialidades.
     */
    cursor?: especialidadeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` especialidades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` especialidades.
     */
    skip?: number
    distinct?: EspecialidadeScalarFieldEnum | EspecialidadeScalarFieldEnum[]
  }

  /**
   * especialidade create
   */
  export type especialidadeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: especialidadeInclude<ExtArgs> | null
    /**
     * The data needed to create a especialidade.
     */
    data: XOR<especialidadeCreateInput, especialidadeUncheckedCreateInput>
  }

  /**
   * especialidade createMany
   */
  export type especialidadeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many especialidades.
     */
    data: especialidadeCreateManyInput | especialidadeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * especialidade createManyAndReturn
   */
  export type especialidadeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * The data used to create many especialidades.
     */
    data: especialidadeCreateManyInput | especialidadeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * especialidade update
   */
  export type especialidadeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: especialidadeInclude<ExtArgs> | null
    /**
     * The data needed to update a especialidade.
     */
    data: XOR<especialidadeUpdateInput, especialidadeUncheckedUpdateInput>
    /**
     * Choose, which especialidade to update.
     */
    where: especialidadeWhereUniqueInput
  }

  /**
   * especialidade updateMany
   */
  export type especialidadeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update especialidades.
     */
    data: XOR<especialidadeUpdateManyMutationInput, especialidadeUncheckedUpdateManyInput>
    /**
     * Filter which especialidades to update
     */
    where?: especialidadeWhereInput
    /**
     * Limit how many especialidades to update.
     */
    limit?: number
  }

  /**
   * especialidade updateManyAndReturn
   */
  export type especialidadeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * The data used to update especialidades.
     */
    data: XOR<especialidadeUpdateManyMutationInput, especialidadeUncheckedUpdateManyInput>
    /**
     * Filter which especialidades to update
     */
    where?: especialidadeWhereInput
    /**
     * Limit how many especialidades to update.
     */
    limit?: number
  }

  /**
   * especialidade upsert
   */
  export type especialidadeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: especialidadeInclude<ExtArgs> | null
    /**
     * The filter to search for the especialidade to update in case it exists.
     */
    where: especialidadeWhereUniqueInput
    /**
     * In case the especialidade found by the `where` argument doesn't exist, create a new especialidade with this data.
     */
    create: XOR<especialidadeCreateInput, especialidadeUncheckedCreateInput>
    /**
     * In case the especialidade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<especialidadeUpdateInput, especialidadeUncheckedUpdateInput>
  }

  /**
   * especialidade delete
   */
  export type especialidadeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: especialidadeInclude<ExtArgs> | null
    /**
     * Filter which especialidade to delete.
     */
    where: especialidadeWhereUniqueInput
  }

  /**
   * especialidade deleteMany
   */
  export type especialidadeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which especialidades to delete
     */
    where?: especialidadeWhereInput
    /**
     * Limit how many especialidades to delete.
     */
    limit?: number
  }

  /**
   * especialidade.profissional_saude
   */
  export type especialidade$profissional_saudeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    where?: profissional_saudeWhereInput
    orderBy?: profissional_saudeOrderByWithRelationInput | profissional_saudeOrderByWithRelationInput[]
    cursor?: profissional_saudeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Profissional_saudeScalarFieldEnum | Profissional_saudeScalarFieldEnum[]
  }

  /**
   * especialidade without action
   */
  export type especialidadeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: especialidadeInclude<ExtArgs> | null
  }


  /**
   * Model consulta
   */

  export type AggregateConsulta = {
    _count: ConsultaCountAggregateOutputType | null
    _min: ConsultaMinAggregateOutputType | null
    _max: ConsultaMaxAggregateOutputType | null
  }

  export type ConsultaMinAggregateOutputType = {
    id: string | null
    paciente_id: string | null
    profissional_id: string | null
    unidade_id: string | null
    data: Date | null
    sintomas: string | null
    diagnostico: string | null
    conduta: string | null
  }

  export type ConsultaMaxAggregateOutputType = {
    id: string | null
    paciente_id: string | null
    profissional_id: string | null
    unidade_id: string | null
    data: Date | null
    sintomas: string | null
    diagnostico: string | null
    conduta: string | null
  }

  export type ConsultaCountAggregateOutputType = {
    id: number
    paciente_id: number
    profissional_id: number
    unidade_id: number
    data: number
    sintomas: number
    diagnostico: number
    conduta: number
    _all: number
  }


  export type ConsultaMinAggregateInputType = {
    id?: true
    paciente_id?: true
    profissional_id?: true
    unidade_id?: true
    data?: true
    sintomas?: true
    diagnostico?: true
    conduta?: true
  }

  export type ConsultaMaxAggregateInputType = {
    id?: true
    paciente_id?: true
    profissional_id?: true
    unidade_id?: true
    data?: true
    sintomas?: true
    diagnostico?: true
    conduta?: true
  }

  export type ConsultaCountAggregateInputType = {
    id?: true
    paciente_id?: true
    profissional_id?: true
    unidade_id?: true
    data?: true
    sintomas?: true
    diagnostico?: true
    conduta?: true
    _all?: true
  }

  export type ConsultaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which consulta to aggregate.
     */
    where?: consultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of consultas to fetch.
     */
    orderBy?: consultaOrderByWithRelationInput | consultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: consultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` consultas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` consultas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned consultas
    **/
    _count?: true | ConsultaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsultaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsultaMaxAggregateInputType
  }

  export type GetConsultaAggregateType<T extends ConsultaAggregateArgs> = {
        [P in keyof T & keyof AggregateConsulta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsulta[P]>
      : GetScalarType<T[P], AggregateConsulta[P]>
  }




  export type consultaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: consultaWhereInput
    orderBy?: consultaOrderByWithAggregationInput | consultaOrderByWithAggregationInput[]
    by: ConsultaScalarFieldEnum[] | ConsultaScalarFieldEnum
    having?: consultaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsultaCountAggregateInputType | true
    _min?: ConsultaMinAggregateInputType
    _max?: ConsultaMaxAggregateInputType
  }

  export type ConsultaGroupByOutputType = {
    id: string
    paciente_id: string | null
    profissional_id: string | null
    unidade_id: string | null
    data: Date
    sintomas: string | null
    diagnostico: string | null
    conduta: string | null
    _count: ConsultaCountAggregateOutputType | null
    _min: ConsultaMinAggregateOutputType | null
    _max: ConsultaMaxAggregateOutputType | null
  }

  type GetConsultaGroupByPayload<T extends consultaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsultaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsultaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsultaGroupByOutputType[P]>
            : GetScalarType<T[P], ConsultaGroupByOutputType[P]>
        }
      >
    >


  export type consultaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paciente_id?: boolean
    profissional_id?: boolean
    unidade_id?: boolean
    data?: boolean
    sintomas?: boolean
    diagnostico?: boolean
    conduta?: boolean
    paciente?: boolean | consulta$pacienteArgs<ExtArgs>
    profissional_saude?: boolean | consulta$profissional_saudeArgs<ExtArgs>
    unidade_saude?: boolean | consulta$unidade_saudeArgs<ExtArgs>
    prescricao?: boolean | consulta$prescricaoArgs<ExtArgs>
    _count?: boolean | ConsultaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consulta"]>

  export type consultaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paciente_id?: boolean
    profissional_id?: boolean
    unidade_id?: boolean
    data?: boolean
    sintomas?: boolean
    diagnostico?: boolean
    conduta?: boolean
    paciente?: boolean | consulta$pacienteArgs<ExtArgs>
    profissional_saude?: boolean | consulta$profissional_saudeArgs<ExtArgs>
    unidade_saude?: boolean | consulta$unidade_saudeArgs<ExtArgs>
  }, ExtArgs["result"]["consulta"]>

  export type consultaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paciente_id?: boolean
    profissional_id?: boolean
    unidade_id?: boolean
    data?: boolean
    sintomas?: boolean
    diagnostico?: boolean
    conduta?: boolean
    paciente?: boolean | consulta$pacienteArgs<ExtArgs>
    profissional_saude?: boolean | consulta$profissional_saudeArgs<ExtArgs>
    unidade_saude?: boolean | consulta$unidade_saudeArgs<ExtArgs>
  }, ExtArgs["result"]["consulta"]>

  export type consultaSelectScalar = {
    id?: boolean
    paciente_id?: boolean
    profissional_id?: boolean
    unidade_id?: boolean
    data?: boolean
    sintomas?: boolean
    diagnostico?: boolean
    conduta?: boolean
  }

  export type consultaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "paciente_id" | "profissional_id" | "unidade_id" | "data" | "sintomas" | "diagnostico" | "conduta", ExtArgs["result"]["consulta"]>
  export type consultaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paciente?: boolean | consulta$pacienteArgs<ExtArgs>
    profissional_saude?: boolean | consulta$profissional_saudeArgs<ExtArgs>
    unidade_saude?: boolean | consulta$unidade_saudeArgs<ExtArgs>
    prescricao?: boolean | consulta$prescricaoArgs<ExtArgs>
    _count?: boolean | ConsultaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type consultaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paciente?: boolean | consulta$pacienteArgs<ExtArgs>
    profissional_saude?: boolean | consulta$profissional_saudeArgs<ExtArgs>
    unidade_saude?: boolean | consulta$unidade_saudeArgs<ExtArgs>
  }
  export type consultaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paciente?: boolean | consulta$pacienteArgs<ExtArgs>
    profissional_saude?: boolean | consulta$profissional_saudeArgs<ExtArgs>
    unidade_saude?: boolean | consulta$unidade_saudeArgs<ExtArgs>
  }

  export type $consultaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "consulta"
    objects: {
      paciente: Prisma.$pacientePayload<ExtArgs> | null
      profissional_saude: Prisma.$profissional_saudePayload<ExtArgs> | null
      unidade_saude: Prisma.$unidade_saudePayload<ExtArgs> | null
      prescricao: Prisma.$prescricaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paciente_id: string | null
      profissional_id: string | null
      unidade_id: string | null
      data: Date
      sintomas: string | null
      diagnostico: string | null
      conduta: string | null
    }, ExtArgs["result"]["consulta"]>
    composites: {}
  }

  type consultaGetPayload<S extends boolean | null | undefined | consultaDefaultArgs> = $Result.GetResult<Prisma.$consultaPayload, S>

  type consultaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<consultaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsultaCountAggregateInputType | true
    }

  export interface consultaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['consulta'], meta: { name: 'consulta' } }
    /**
     * Find zero or one Consulta that matches the filter.
     * @param {consultaFindUniqueArgs} args - Arguments to find a Consulta
     * @example
     * // Get one Consulta
     * const consulta = await prisma.consulta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends consultaFindUniqueArgs>(args: SelectSubset<T, consultaFindUniqueArgs<ExtArgs>>): Prisma__consultaClient<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consulta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {consultaFindUniqueOrThrowArgs} args - Arguments to find a Consulta
     * @example
     * // Get one Consulta
     * const consulta = await prisma.consulta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends consultaFindUniqueOrThrowArgs>(args: SelectSubset<T, consultaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__consultaClient<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consulta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consultaFindFirstArgs} args - Arguments to find a Consulta
     * @example
     * // Get one Consulta
     * const consulta = await prisma.consulta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends consultaFindFirstArgs>(args?: SelectSubset<T, consultaFindFirstArgs<ExtArgs>>): Prisma__consultaClient<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consulta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consultaFindFirstOrThrowArgs} args - Arguments to find a Consulta
     * @example
     * // Get one Consulta
     * const consulta = await prisma.consulta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends consultaFindFirstOrThrowArgs>(args?: SelectSubset<T, consultaFindFirstOrThrowArgs<ExtArgs>>): Prisma__consultaClient<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consultas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consultaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consultas
     * const consultas = await prisma.consulta.findMany()
     * 
     * // Get first 10 Consultas
     * const consultas = await prisma.consulta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consultaWithIdOnly = await prisma.consulta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends consultaFindManyArgs>(args?: SelectSubset<T, consultaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consulta.
     * @param {consultaCreateArgs} args - Arguments to create a Consulta.
     * @example
     * // Create one Consulta
     * const Consulta = await prisma.consulta.create({
     *   data: {
     *     // ... data to create a Consulta
     *   }
     * })
     * 
     */
    create<T extends consultaCreateArgs>(args: SelectSubset<T, consultaCreateArgs<ExtArgs>>): Prisma__consultaClient<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consultas.
     * @param {consultaCreateManyArgs} args - Arguments to create many Consultas.
     * @example
     * // Create many Consultas
     * const consulta = await prisma.consulta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends consultaCreateManyArgs>(args?: SelectSubset<T, consultaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Consultas and returns the data saved in the database.
     * @param {consultaCreateManyAndReturnArgs} args - Arguments to create many Consultas.
     * @example
     * // Create many Consultas
     * const consulta = await prisma.consulta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Consultas and only return the `id`
     * const consultaWithIdOnly = await prisma.consulta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends consultaCreateManyAndReturnArgs>(args?: SelectSubset<T, consultaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Consulta.
     * @param {consultaDeleteArgs} args - Arguments to delete one Consulta.
     * @example
     * // Delete one Consulta
     * const Consulta = await prisma.consulta.delete({
     *   where: {
     *     // ... filter to delete one Consulta
     *   }
     * })
     * 
     */
    delete<T extends consultaDeleteArgs>(args: SelectSubset<T, consultaDeleteArgs<ExtArgs>>): Prisma__consultaClient<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consulta.
     * @param {consultaUpdateArgs} args - Arguments to update one Consulta.
     * @example
     * // Update one Consulta
     * const consulta = await prisma.consulta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends consultaUpdateArgs>(args: SelectSubset<T, consultaUpdateArgs<ExtArgs>>): Prisma__consultaClient<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consultas.
     * @param {consultaDeleteManyArgs} args - Arguments to filter Consultas to delete.
     * @example
     * // Delete a few Consultas
     * const { count } = await prisma.consulta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends consultaDeleteManyArgs>(args?: SelectSubset<T, consultaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consultaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consultas
     * const consulta = await prisma.consulta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends consultaUpdateManyArgs>(args: SelectSubset<T, consultaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consultas and returns the data updated in the database.
     * @param {consultaUpdateManyAndReturnArgs} args - Arguments to update many Consultas.
     * @example
     * // Update many Consultas
     * const consulta = await prisma.consulta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Consultas and only return the `id`
     * const consultaWithIdOnly = await prisma.consulta.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends consultaUpdateManyAndReturnArgs>(args: SelectSubset<T, consultaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Consulta.
     * @param {consultaUpsertArgs} args - Arguments to update or create a Consulta.
     * @example
     * // Update or create a Consulta
     * const consulta = await prisma.consulta.upsert({
     *   create: {
     *     // ... data to create a Consulta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consulta we want to update
     *   }
     * })
     */
    upsert<T extends consultaUpsertArgs>(args: SelectSubset<T, consultaUpsertArgs<ExtArgs>>): Prisma__consultaClient<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Consultas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consultaCountArgs} args - Arguments to filter Consultas to count.
     * @example
     * // Count the number of Consultas
     * const count = await prisma.consulta.count({
     *   where: {
     *     // ... the filter for the Consultas we want to count
     *   }
     * })
    **/
    count<T extends consultaCountArgs>(
      args?: Subset<T, consultaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsultaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consulta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsultaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsultaAggregateArgs>(args: Subset<T, ConsultaAggregateArgs>): Prisma.PrismaPromise<GetConsultaAggregateType<T>>

    /**
     * Group by Consulta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consultaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends consultaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: consultaGroupByArgs['orderBy'] }
        : { orderBy?: consultaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, consultaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsultaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the consulta model
   */
  readonly fields: consultaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for consulta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__consultaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paciente<T extends consulta$pacienteArgs<ExtArgs> = {}>(args?: Subset<T, consulta$pacienteArgs<ExtArgs>>): Prisma__pacienteClient<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    profissional_saude<T extends consulta$profissional_saudeArgs<ExtArgs> = {}>(args?: Subset<T, consulta$profissional_saudeArgs<ExtArgs>>): Prisma__profissional_saudeClient<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    unidade_saude<T extends consulta$unidade_saudeArgs<ExtArgs> = {}>(args?: Subset<T, consulta$unidade_saudeArgs<ExtArgs>>): Prisma__unidade_saudeClient<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    prescricao<T extends consulta$prescricaoArgs<ExtArgs> = {}>(args?: Subset<T, consulta$prescricaoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the consulta model
   */
  interface consultaFieldRefs {
    readonly id: FieldRef<"consulta", 'String'>
    readonly paciente_id: FieldRef<"consulta", 'String'>
    readonly profissional_id: FieldRef<"consulta", 'String'>
    readonly unidade_id: FieldRef<"consulta", 'String'>
    readonly data: FieldRef<"consulta", 'DateTime'>
    readonly sintomas: FieldRef<"consulta", 'String'>
    readonly diagnostico: FieldRef<"consulta", 'String'>
    readonly conduta: FieldRef<"consulta", 'String'>
  }
    

  // Custom InputTypes
  /**
   * consulta findUnique
   */
  export type consultaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    /**
     * Filter, which consulta to fetch.
     */
    where: consultaWhereUniqueInput
  }

  /**
   * consulta findUniqueOrThrow
   */
  export type consultaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    /**
     * Filter, which consulta to fetch.
     */
    where: consultaWhereUniqueInput
  }

  /**
   * consulta findFirst
   */
  export type consultaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    /**
     * Filter, which consulta to fetch.
     */
    where?: consultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of consultas to fetch.
     */
    orderBy?: consultaOrderByWithRelationInput | consultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for consultas.
     */
    cursor?: consultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` consultas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` consultas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of consultas.
     */
    distinct?: ConsultaScalarFieldEnum | ConsultaScalarFieldEnum[]
  }

  /**
   * consulta findFirstOrThrow
   */
  export type consultaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    /**
     * Filter, which consulta to fetch.
     */
    where?: consultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of consultas to fetch.
     */
    orderBy?: consultaOrderByWithRelationInput | consultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for consultas.
     */
    cursor?: consultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` consultas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` consultas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of consultas.
     */
    distinct?: ConsultaScalarFieldEnum | ConsultaScalarFieldEnum[]
  }

  /**
   * consulta findMany
   */
  export type consultaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    /**
     * Filter, which consultas to fetch.
     */
    where?: consultaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of consultas to fetch.
     */
    orderBy?: consultaOrderByWithRelationInput | consultaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing consultas.
     */
    cursor?: consultaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` consultas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` consultas.
     */
    skip?: number
    distinct?: ConsultaScalarFieldEnum | ConsultaScalarFieldEnum[]
  }

  /**
   * consulta create
   */
  export type consultaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    /**
     * The data needed to create a consulta.
     */
    data?: XOR<consultaCreateInput, consultaUncheckedCreateInput>
  }

  /**
   * consulta createMany
   */
  export type consultaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many consultas.
     */
    data: consultaCreateManyInput | consultaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * consulta createManyAndReturn
   */
  export type consultaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * The data used to create many consultas.
     */
    data: consultaCreateManyInput | consultaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * consulta update
   */
  export type consultaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    /**
     * The data needed to update a consulta.
     */
    data: XOR<consultaUpdateInput, consultaUncheckedUpdateInput>
    /**
     * Choose, which consulta to update.
     */
    where: consultaWhereUniqueInput
  }

  /**
   * consulta updateMany
   */
  export type consultaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update consultas.
     */
    data: XOR<consultaUpdateManyMutationInput, consultaUncheckedUpdateManyInput>
    /**
     * Filter which consultas to update
     */
    where?: consultaWhereInput
    /**
     * Limit how many consultas to update.
     */
    limit?: number
  }

  /**
   * consulta updateManyAndReturn
   */
  export type consultaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * The data used to update consultas.
     */
    data: XOR<consultaUpdateManyMutationInput, consultaUncheckedUpdateManyInput>
    /**
     * Filter which consultas to update
     */
    where?: consultaWhereInput
    /**
     * Limit how many consultas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * consulta upsert
   */
  export type consultaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    /**
     * The filter to search for the consulta to update in case it exists.
     */
    where: consultaWhereUniqueInput
    /**
     * In case the consulta found by the `where` argument doesn't exist, create a new consulta with this data.
     */
    create: XOR<consultaCreateInput, consultaUncheckedCreateInput>
    /**
     * In case the consulta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<consultaUpdateInput, consultaUncheckedUpdateInput>
  }

  /**
   * consulta delete
   */
  export type consultaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    /**
     * Filter which consulta to delete.
     */
    where: consultaWhereUniqueInput
  }

  /**
   * consulta deleteMany
   */
  export type consultaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which consultas to delete
     */
    where?: consultaWhereInput
    /**
     * Limit how many consultas to delete.
     */
    limit?: number
  }

  /**
   * consulta.paciente
   */
  export type consulta$pacienteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pacienteInclude<ExtArgs> | null
    where?: pacienteWhereInput
  }

  /**
   * consulta.profissional_saude
   */
  export type consulta$profissional_saudeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    where?: profissional_saudeWhereInput
  }

  /**
   * consulta.unidade_saude
   */
  export type consulta$unidade_saudeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unidade_saudeInclude<ExtArgs> | null
    where?: unidade_saudeWhereInput
  }

  /**
   * consulta.prescricao
   */
  export type consulta$prescricaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoInclude<ExtArgs> | null
    where?: prescricaoWhereInput
    orderBy?: prescricaoOrderByWithRelationInput | prescricaoOrderByWithRelationInput[]
    cursor?: prescricaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrescricaoScalarFieldEnum | PrescricaoScalarFieldEnum[]
  }

  /**
   * consulta without action
   */
  export type consultaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
  }


  /**
   * Model paciente
   */

  export type AggregatePaciente = {
    _count: PacienteCountAggregateOutputType | null
    _min: PacienteMinAggregateOutputType | null
    _max: PacienteMaxAggregateOutputType | null
  }

  export type PacienteMinAggregateOutputType = {
    id: string | null
    nome: string | null
    data_nascimento: Date | null
    sexo: string | null
    cpf: string | null
    telefone: string | null
    email: string | null
  }

  export type PacienteMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    data_nascimento: Date | null
    sexo: string | null
    cpf: string | null
    telefone: string | null
    email: string | null
  }

  export type PacienteCountAggregateOutputType = {
    id: number
    nome: number
    data_nascimento: number
    sexo: number
    cpf: number
    telefone: number
    email: number
    _all: number
  }


  export type PacienteMinAggregateInputType = {
    id?: true
    nome?: true
    data_nascimento?: true
    sexo?: true
    cpf?: true
    telefone?: true
    email?: true
  }

  export type PacienteMaxAggregateInputType = {
    id?: true
    nome?: true
    data_nascimento?: true
    sexo?: true
    cpf?: true
    telefone?: true
    email?: true
  }

  export type PacienteCountAggregateInputType = {
    id?: true
    nome?: true
    data_nascimento?: true
    sexo?: true
    cpf?: true
    telefone?: true
    email?: true
    _all?: true
  }

  export type PacienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which paciente to aggregate.
     */
    where?: pacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pacientes to fetch.
     */
    orderBy?: pacienteOrderByWithRelationInput | pacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pacientes
    **/
    _count?: true | PacienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PacienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PacienteMaxAggregateInputType
  }

  export type GetPacienteAggregateType<T extends PacienteAggregateArgs> = {
        [P in keyof T & keyof AggregatePaciente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaciente[P]>
      : GetScalarType<T[P], AggregatePaciente[P]>
  }




  export type pacienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pacienteWhereInput
    orderBy?: pacienteOrderByWithAggregationInput | pacienteOrderByWithAggregationInput[]
    by: PacienteScalarFieldEnum[] | PacienteScalarFieldEnum
    having?: pacienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PacienteCountAggregateInputType | true
    _min?: PacienteMinAggregateInputType
    _max?: PacienteMaxAggregateInputType
  }

  export type PacienteGroupByOutputType = {
    id: string
    nome: string
    data_nascimento: Date
    sexo: string | null
    cpf: string | null
    telefone: string | null
    email: string | null
    _count: PacienteCountAggregateOutputType | null
    _min: PacienteMinAggregateOutputType | null
    _max: PacienteMaxAggregateOutputType | null
  }

  type GetPacienteGroupByPayload<T extends pacienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PacienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PacienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PacienteGroupByOutputType[P]>
            : GetScalarType<T[P], PacienteGroupByOutputType[P]>
        }
      >
    >


  export type pacienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    data_nascimento?: boolean
    sexo?: boolean
    cpf?: boolean
    telefone?: boolean
    email?: boolean
    consulta?: boolean | paciente$consultaArgs<ExtArgs>
    _count?: boolean | PacienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paciente"]>

  export type pacienteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    data_nascimento?: boolean
    sexo?: boolean
    cpf?: boolean
    telefone?: boolean
    email?: boolean
  }, ExtArgs["result"]["paciente"]>

  export type pacienteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    data_nascimento?: boolean
    sexo?: boolean
    cpf?: boolean
    telefone?: boolean
    email?: boolean
  }, ExtArgs["result"]["paciente"]>

  export type pacienteSelectScalar = {
    id?: boolean
    nome?: boolean
    data_nascimento?: boolean
    sexo?: boolean
    cpf?: boolean
    telefone?: boolean
    email?: boolean
  }

  export type pacienteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "data_nascimento" | "sexo" | "cpf" | "telefone" | "email", ExtArgs["result"]["paciente"]>
  export type pacienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consulta?: boolean | paciente$consultaArgs<ExtArgs>
    _count?: boolean | PacienteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type pacienteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type pacienteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $pacientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "paciente"
    objects: {
      consulta: Prisma.$consultaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      data_nascimento: Date
      sexo: string | null
      cpf: string | null
      telefone: string | null
      email: string | null
    }, ExtArgs["result"]["paciente"]>
    composites: {}
  }

  type pacienteGetPayload<S extends boolean | null | undefined | pacienteDefaultArgs> = $Result.GetResult<Prisma.$pacientePayload, S>

  type pacienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pacienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PacienteCountAggregateInputType | true
    }

  export interface pacienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['paciente'], meta: { name: 'paciente' } }
    /**
     * Find zero or one Paciente that matches the filter.
     * @param {pacienteFindUniqueArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pacienteFindUniqueArgs>(args: SelectSubset<T, pacienteFindUniqueArgs<ExtArgs>>): Prisma__pacienteClient<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Paciente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pacienteFindUniqueOrThrowArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pacienteFindUniqueOrThrowArgs>(args: SelectSubset<T, pacienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pacienteClient<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Paciente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pacienteFindFirstArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pacienteFindFirstArgs>(args?: SelectSubset<T, pacienteFindFirstArgs<ExtArgs>>): Prisma__pacienteClient<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Paciente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pacienteFindFirstOrThrowArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pacienteFindFirstOrThrowArgs>(args?: SelectSubset<T, pacienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__pacienteClient<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pacientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pacienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pacientes
     * const pacientes = await prisma.paciente.findMany()
     * 
     * // Get first 10 Pacientes
     * const pacientes = await prisma.paciente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pacienteWithIdOnly = await prisma.paciente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends pacienteFindManyArgs>(args?: SelectSubset<T, pacienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Paciente.
     * @param {pacienteCreateArgs} args - Arguments to create a Paciente.
     * @example
     * // Create one Paciente
     * const Paciente = await prisma.paciente.create({
     *   data: {
     *     // ... data to create a Paciente
     *   }
     * })
     * 
     */
    create<T extends pacienteCreateArgs>(args: SelectSubset<T, pacienteCreateArgs<ExtArgs>>): Prisma__pacienteClient<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pacientes.
     * @param {pacienteCreateManyArgs} args - Arguments to create many Pacientes.
     * @example
     * // Create many Pacientes
     * const paciente = await prisma.paciente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pacienteCreateManyArgs>(args?: SelectSubset<T, pacienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pacientes and returns the data saved in the database.
     * @param {pacienteCreateManyAndReturnArgs} args - Arguments to create many Pacientes.
     * @example
     * // Create many Pacientes
     * const paciente = await prisma.paciente.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pacientes and only return the `id`
     * const pacienteWithIdOnly = await prisma.paciente.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends pacienteCreateManyAndReturnArgs>(args?: SelectSubset<T, pacienteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Paciente.
     * @param {pacienteDeleteArgs} args - Arguments to delete one Paciente.
     * @example
     * // Delete one Paciente
     * const Paciente = await prisma.paciente.delete({
     *   where: {
     *     // ... filter to delete one Paciente
     *   }
     * })
     * 
     */
    delete<T extends pacienteDeleteArgs>(args: SelectSubset<T, pacienteDeleteArgs<ExtArgs>>): Prisma__pacienteClient<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Paciente.
     * @param {pacienteUpdateArgs} args - Arguments to update one Paciente.
     * @example
     * // Update one Paciente
     * const paciente = await prisma.paciente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pacienteUpdateArgs>(args: SelectSubset<T, pacienteUpdateArgs<ExtArgs>>): Prisma__pacienteClient<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pacientes.
     * @param {pacienteDeleteManyArgs} args - Arguments to filter Pacientes to delete.
     * @example
     * // Delete a few Pacientes
     * const { count } = await prisma.paciente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pacienteDeleteManyArgs>(args?: SelectSubset<T, pacienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pacientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pacienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pacientes
     * const paciente = await prisma.paciente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pacienteUpdateManyArgs>(args: SelectSubset<T, pacienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pacientes and returns the data updated in the database.
     * @param {pacienteUpdateManyAndReturnArgs} args - Arguments to update many Pacientes.
     * @example
     * // Update many Pacientes
     * const paciente = await prisma.paciente.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pacientes and only return the `id`
     * const pacienteWithIdOnly = await prisma.paciente.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends pacienteUpdateManyAndReturnArgs>(args: SelectSubset<T, pacienteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Paciente.
     * @param {pacienteUpsertArgs} args - Arguments to update or create a Paciente.
     * @example
     * // Update or create a Paciente
     * const paciente = await prisma.paciente.upsert({
     *   create: {
     *     // ... data to create a Paciente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Paciente we want to update
     *   }
     * })
     */
    upsert<T extends pacienteUpsertArgs>(args: SelectSubset<T, pacienteUpsertArgs<ExtArgs>>): Prisma__pacienteClient<$Result.GetResult<Prisma.$pacientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pacientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pacienteCountArgs} args - Arguments to filter Pacientes to count.
     * @example
     * // Count the number of Pacientes
     * const count = await prisma.paciente.count({
     *   where: {
     *     // ... the filter for the Pacientes we want to count
     *   }
     * })
    **/
    count<T extends pacienteCountArgs>(
      args?: Subset<T, pacienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PacienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Paciente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PacienteAggregateArgs>(args: Subset<T, PacienteAggregateArgs>): Prisma.PrismaPromise<GetPacienteAggregateType<T>>

    /**
     * Group by Paciente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pacienteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends pacienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pacienteGroupByArgs['orderBy'] }
        : { orderBy?: pacienteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, pacienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPacienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the paciente model
   */
  readonly fields: pacienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for paciente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pacienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consulta<T extends paciente$consultaArgs<ExtArgs> = {}>(args?: Subset<T, paciente$consultaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the paciente model
   */
  interface pacienteFieldRefs {
    readonly id: FieldRef<"paciente", 'String'>
    readonly nome: FieldRef<"paciente", 'String'>
    readonly data_nascimento: FieldRef<"paciente", 'DateTime'>
    readonly sexo: FieldRef<"paciente", 'String'>
    readonly cpf: FieldRef<"paciente", 'String'>
    readonly telefone: FieldRef<"paciente", 'String'>
    readonly email: FieldRef<"paciente", 'String'>
  }
    

  // Custom InputTypes
  /**
   * paciente findUnique
   */
  export type pacienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pacienteInclude<ExtArgs> | null
    /**
     * Filter, which paciente to fetch.
     */
    where: pacienteWhereUniqueInput
  }

  /**
   * paciente findUniqueOrThrow
   */
  export type pacienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pacienteInclude<ExtArgs> | null
    /**
     * Filter, which paciente to fetch.
     */
    where: pacienteWhereUniqueInput
  }

  /**
   * paciente findFirst
   */
  export type pacienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pacienteInclude<ExtArgs> | null
    /**
     * Filter, which paciente to fetch.
     */
    where?: pacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pacientes to fetch.
     */
    orderBy?: pacienteOrderByWithRelationInput | pacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pacientes.
     */
    cursor?: pacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pacientes.
     */
    distinct?: PacienteScalarFieldEnum | PacienteScalarFieldEnum[]
  }

  /**
   * paciente findFirstOrThrow
   */
  export type pacienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pacienteInclude<ExtArgs> | null
    /**
     * Filter, which paciente to fetch.
     */
    where?: pacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pacientes to fetch.
     */
    orderBy?: pacienteOrderByWithRelationInput | pacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pacientes.
     */
    cursor?: pacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pacientes.
     */
    distinct?: PacienteScalarFieldEnum | PacienteScalarFieldEnum[]
  }

  /**
   * paciente findMany
   */
  export type pacienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pacienteInclude<ExtArgs> | null
    /**
     * Filter, which pacientes to fetch.
     */
    where?: pacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pacientes to fetch.
     */
    orderBy?: pacienteOrderByWithRelationInput | pacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pacientes.
     */
    cursor?: pacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pacientes.
     */
    skip?: number
    distinct?: PacienteScalarFieldEnum | PacienteScalarFieldEnum[]
  }

  /**
   * paciente create
   */
  export type pacienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pacienteInclude<ExtArgs> | null
    /**
     * The data needed to create a paciente.
     */
    data: XOR<pacienteCreateInput, pacienteUncheckedCreateInput>
  }

  /**
   * paciente createMany
   */
  export type pacienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pacientes.
     */
    data: pacienteCreateManyInput | pacienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * paciente createManyAndReturn
   */
  export type pacienteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * The data used to create many pacientes.
     */
    data: pacienteCreateManyInput | pacienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * paciente update
   */
  export type pacienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pacienteInclude<ExtArgs> | null
    /**
     * The data needed to update a paciente.
     */
    data: XOR<pacienteUpdateInput, pacienteUncheckedUpdateInput>
    /**
     * Choose, which paciente to update.
     */
    where: pacienteWhereUniqueInput
  }

  /**
   * paciente updateMany
   */
  export type pacienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pacientes.
     */
    data: XOR<pacienteUpdateManyMutationInput, pacienteUncheckedUpdateManyInput>
    /**
     * Filter which pacientes to update
     */
    where?: pacienteWhereInput
    /**
     * Limit how many pacientes to update.
     */
    limit?: number
  }

  /**
   * paciente updateManyAndReturn
   */
  export type pacienteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * The data used to update pacientes.
     */
    data: XOR<pacienteUpdateManyMutationInput, pacienteUncheckedUpdateManyInput>
    /**
     * Filter which pacientes to update
     */
    where?: pacienteWhereInput
    /**
     * Limit how many pacientes to update.
     */
    limit?: number
  }

  /**
   * paciente upsert
   */
  export type pacienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pacienteInclude<ExtArgs> | null
    /**
     * The filter to search for the paciente to update in case it exists.
     */
    where: pacienteWhereUniqueInput
    /**
     * In case the paciente found by the `where` argument doesn't exist, create a new paciente with this data.
     */
    create: XOR<pacienteCreateInput, pacienteUncheckedCreateInput>
    /**
     * In case the paciente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pacienteUpdateInput, pacienteUncheckedUpdateInput>
  }

  /**
   * paciente delete
   */
  export type pacienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pacienteInclude<ExtArgs> | null
    /**
     * Filter which paciente to delete.
     */
    where: pacienteWhereUniqueInput
  }

  /**
   * paciente deleteMany
   */
  export type pacienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pacientes to delete
     */
    where?: pacienteWhereInput
    /**
     * Limit how many pacientes to delete.
     */
    limit?: number
  }

  /**
   * paciente.consulta
   */
  export type paciente$consultaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    where?: consultaWhereInput
    orderBy?: consultaOrderByWithRelationInput | consultaOrderByWithRelationInput[]
    cursor?: consultaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultaScalarFieldEnum | ConsultaScalarFieldEnum[]
  }

  /**
   * paciente without action
   */
  export type pacienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the paciente
     */
    select?: pacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the paciente
     */
    omit?: pacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pacienteInclude<ExtArgs> | null
  }


  /**
   * Model prescricao
   */

  export type AggregatePrescricao = {
    _count: PrescricaoCountAggregateOutputType | null
    _min: PrescricaoMinAggregateOutputType | null
    _max: PrescricaoMaxAggregateOutputType | null
  }

  export type PrescricaoMinAggregateOutputType = {
    id: string | null
    consulta_id: string | null
    medicamento: string | null
    posologia: string | null
    duracao: string | null
  }

  export type PrescricaoMaxAggregateOutputType = {
    id: string | null
    consulta_id: string | null
    medicamento: string | null
    posologia: string | null
    duracao: string | null
  }

  export type PrescricaoCountAggregateOutputType = {
    id: number
    consulta_id: number
    medicamento: number
    posologia: number
    duracao: number
    _all: number
  }


  export type PrescricaoMinAggregateInputType = {
    id?: true
    consulta_id?: true
    medicamento?: true
    posologia?: true
    duracao?: true
  }

  export type PrescricaoMaxAggregateInputType = {
    id?: true
    consulta_id?: true
    medicamento?: true
    posologia?: true
    duracao?: true
  }

  export type PrescricaoCountAggregateInputType = {
    id?: true
    consulta_id?: true
    medicamento?: true
    posologia?: true
    duracao?: true
    _all?: true
  }

  export type PrescricaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which prescricao to aggregate.
     */
    where?: prescricaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prescricaos to fetch.
     */
    orderBy?: prescricaoOrderByWithRelationInput | prescricaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: prescricaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prescricaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prescricaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned prescricaos
    **/
    _count?: true | PrescricaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrescricaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrescricaoMaxAggregateInputType
  }

  export type GetPrescricaoAggregateType<T extends PrescricaoAggregateArgs> = {
        [P in keyof T & keyof AggregatePrescricao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrescricao[P]>
      : GetScalarType<T[P], AggregatePrescricao[P]>
  }




  export type prescricaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: prescricaoWhereInput
    orderBy?: prescricaoOrderByWithAggregationInput | prescricaoOrderByWithAggregationInput[]
    by: PrescricaoScalarFieldEnum[] | PrescricaoScalarFieldEnum
    having?: prescricaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrescricaoCountAggregateInputType | true
    _min?: PrescricaoMinAggregateInputType
    _max?: PrescricaoMaxAggregateInputType
  }

  export type PrescricaoGroupByOutputType = {
    id: string
    consulta_id: string | null
    medicamento: string
    posologia: string | null
    duracao: string | null
    _count: PrescricaoCountAggregateOutputType | null
    _min: PrescricaoMinAggregateOutputType | null
    _max: PrescricaoMaxAggregateOutputType | null
  }

  type GetPrescricaoGroupByPayload<T extends prescricaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrescricaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrescricaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrescricaoGroupByOutputType[P]>
            : GetScalarType<T[P], PrescricaoGroupByOutputType[P]>
        }
      >
    >


  export type prescricaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consulta_id?: boolean
    medicamento?: boolean
    posologia?: boolean
    duracao?: boolean
    consulta?: boolean | prescricao$consultaArgs<ExtArgs>
  }, ExtArgs["result"]["prescricao"]>

  export type prescricaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consulta_id?: boolean
    medicamento?: boolean
    posologia?: boolean
    duracao?: boolean
    consulta?: boolean | prescricao$consultaArgs<ExtArgs>
  }, ExtArgs["result"]["prescricao"]>

  export type prescricaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    consulta_id?: boolean
    medicamento?: boolean
    posologia?: boolean
    duracao?: boolean
    consulta?: boolean | prescricao$consultaArgs<ExtArgs>
  }, ExtArgs["result"]["prescricao"]>

  export type prescricaoSelectScalar = {
    id?: boolean
    consulta_id?: boolean
    medicamento?: boolean
    posologia?: boolean
    duracao?: boolean
  }

  export type prescricaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "consulta_id" | "medicamento" | "posologia" | "duracao", ExtArgs["result"]["prescricao"]>
  export type prescricaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consulta?: boolean | prescricao$consultaArgs<ExtArgs>
  }
  export type prescricaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consulta?: boolean | prescricao$consultaArgs<ExtArgs>
  }
  export type prescricaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consulta?: boolean | prescricao$consultaArgs<ExtArgs>
  }

  export type $prescricaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "prescricao"
    objects: {
      consulta: Prisma.$consultaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      consulta_id: string | null
      medicamento: string
      posologia: string | null
      duracao: string | null
    }, ExtArgs["result"]["prescricao"]>
    composites: {}
  }

  type prescricaoGetPayload<S extends boolean | null | undefined | prescricaoDefaultArgs> = $Result.GetResult<Prisma.$prescricaoPayload, S>

  type prescricaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<prescricaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrescricaoCountAggregateInputType | true
    }

  export interface prescricaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['prescricao'], meta: { name: 'prescricao' } }
    /**
     * Find zero or one Prescricao that matches the filter.
     * @param {prescricaoFindUniqueArgs} args - Arguments to find a Prescricao
     * @example
     * // Get one Prescricao
     * const prescricao = await prisma.prescricao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends prescricaoFindUniqueArgs>(args: SelectSubset<T, prescricaoFindUniqueArgs<ExtArgs>>): Prisma__prescricaoClient<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prescricao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {prescricaoFindUniqueOrThrowArgs} args - Arguments to find a Prescricao
     * @example
     * // Get one Prescricao
     * const prescricao = await prisma.prescricao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends prescricaoFindUniqueOrThrowArgs>(args: SelectSubset<T, prescricaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__prescricaoClient<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescricao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescricaoFindFirstArgs} args - Arguments to find a Prescricao
     * @example
     * // Get one Prescricao
     * const prescricao = await prisma.prescricao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends prescricaoFindFirstArgs>(args?: SelectSubset<T, prescricaoFindFirstArgs<ExtArgs>>): Prisma__prescricaoClient<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescricao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescricaoFindFirstOrThrowArgs} args - Arguments to find a Prescricao
     * @example
     * // Get one Prescricao
     * const prescricao = await prisma.prescricao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends prescricaoFindFirstOrThrowArgs>(args?: SelectSubset<T, prescricaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__prescricaoClient<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prescricaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescricaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prescricaos
     * const prescricaos = await prisma.prescricao.findMany()
     * 
     * // Get first 10 Prescricaos
     * const prescricaos = await prisma.prescricao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prescricaoWithIdOnly = await prisma.prescricao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends prescricaoFindManyArgs>(args?: SelectSubset<T, prescricaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prescricao.
     * @param {prescricaoCreateArgs} args - Arguments to create a Prescricao.
     * @example
     * // Create one Prescricao
     * const Prescricao = await prisma.prescricao.create({
     *   data: {
     *     // ... data to create a Prescricao
     *   }
     * })
     * 
     */
    create<T extends prescricaoCreateArgs>(args: SelectSubset<T, prescricaoCreateArgs<ExtArgs>>): Prisma__prescricaoClient<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prescricaos.
     * @param {prescricaoCreateManyArgs} args - Arguments to create many Prescricaos.
     * @example
     * // Create many Prescricaos
     * const prescricao = await prisma.prescricao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends prescricaoCreateManyArgs>(args?: SelectSubset<T, prescricaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prescricaos and returns the data saved in the database.
     * @param {prescricaoCreateManyAndReturnArgs} args - Arguments to create many Prescricaos.
     * @example
     * // Create many Prescricaos
     * const prescricao = await prisma.prescricao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prescricaos and only return the `id`
     * const prescricaoWithIdOnly = await prisma.prescricao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends prescricaoCreateManyAndReturnArgs>(args?: SelectSubset<T, prescricaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Prescricao.
     * @param {prescricaoDeleteArgs} args - Arguments to delete one Prescricao.
     * @example
     * // Delete one Prescricao
     * const Prescricao = await prisma.prescricao.delete({
     *   where: {
     *     // ... filter to delete one Prescricao
     *   }
     * })
     * 
     */
    delete<T extends prescricaoDeleteArgs>(args: SelectSubset<T, prescricaoDeleteArgs<ExtArgs>>): Prisma__prescricaoClient<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prescricao.
     * @param {prescricaoUpdateArgs} args - Arguments to update one Prescricao.
     * @example
     * // Update one Prescricao
     * const prescricao = await prisma.prescricao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends prescricaoUpdateArgs>(args: SelectSubset<T, prescricaoUpdateArgs<ExtArgs>>): Prisma__prescricaoClient<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prescricaos.
     * @param {prescricaoDeleteManyArgs} args - Arguments to filter Prescricaos to delete.
     * @example
     * // Delete a few Prescricaos
     * const { count } = await prisma.prescricao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends prescricaoDeleteManyArgs>(args?: SelectSubset<T, prescricaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescricaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescricaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prescricaos
     * const prescricao = await prisma.prescricao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends prescricaoUpdateManyArgs>(args: SelectSubset<T, prescricaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescricaos and returns the data updated in the database.
     * @param {prescricaoUpdateManyAndReturnArgs} args - Arguments to update many Prescricaos.
     * @example
     * // Update many Prescricaos
     * const prescricao = await prisma.prescricao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prescricaos and only return the `id`
     * const prescricaoWithIdOnly = await prisma.prescricao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends prescricaoUpdateManyAndReturnArgs>(args: SelectSubset<T, prescricaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Prescricao.
     * @param {prescricaoUpsertArgs} args - Arguments to update or create a Prescricao.
     * @example
     * // Update or create a Prescricao
     * const prescricao = await prisma.prescricao.upsert({
     *   create: {
     *     // ... data to create a Prescricao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prescricao we want to update
     *   }
     * })
     */
    upsert<T extends prescricaoUpsertArgs>(args: SelectSubset<T, prescricaoUpsertArgs<ExtArgs>>): Prisma__prescricaoClient<$Result.GetResult<Prisma.$prescricaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prescricaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescricaoCountArgs} args - Arguments to filter Prescricaos to count.
     * @example
     * // Count the number of Prescricaos
     * const count = await prisma.prescricao.count({
     *   where: {
     *     // ... the filter for the Prescricaos we want to count
     *   }
     * })
    **/
    count<T extends prescricaoCountArgs>(
      args?: Subset<T, prescricaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrescricaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prescricao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescricaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrescricaoAggregateArgs>(args: Subset<T, PrescricaoAggregateArgs>): Prisma.PrismaPromise<GetPrescricaoAggregateType<T>>

    /**
     * Group by Prescricao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {prescricaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends prescricaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: prescricaoGroupByArgs['orderBy'] }
        : { orderBy?: prescricaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, prescricaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrescricaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the prescricao model
   */
  readonly fields: prescricaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for prescricao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__prescricaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consulta<T extends prescricao$consultaArgs<ExtArgs> = {}>(args?: Subset<T, prescricao$consultaArgs<ExtArgs>>): Prisma__consultaClient<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the prescricao model
   */
  interface prescricaoFieldRefs {
    readonly id: FieldRef<"prescricao", 'String'>
    readonly consulta_id: FieldRef<"prescricao", 'String'>
    readonly medicamento: FieldRef<"prescricao", 'String'>
    readonly posologia: FieldRef<"prescricao", 'String'>
    readonly duracao: FieldRef<"prescricao", 'String'>
  }
    

  // Custom InputTypes
  /**
   * prescricao findUnique
   */
  export type prescricaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoInclude<ExtArgs> | null
    /**
     * Filter, which prescricao to fetch.
     */
    where: prescricaoWhereUniqueInput
  }

  /**
   * prescricao findUniqueOrThrow
   */
  export type prescricaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoInclude<ExtArgs> | null
    /**
     * Filter, which prescricao to fetch.
     */
    where: prescricaoWhereUniqueInput
  }

  /**
   * prescricao findFirst
   */
  export type prescricaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoInclude<ExtArgs> | null
    /**
     * Filter, which prescricao to fetch.
     */
    where?: prescricaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prescricaos to fetch.
     */
    orderBy?: prescricaoOrderByWithRelationInput | prescricaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for prescricaos.
     */
    cursor?: prescricaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prescricaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prescricaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of prescricaos.
     */
    distinct?: PrescricaoScalarFieldEnum | PrescricaoScalarFieldEnum[]
  }

  /**
   * prescricao findFirstOrThrow
   */
  export type prescricaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoInclude<ExtArgs> | null
    /**
     * Filter, which prescricao to fetch.
     */
    where?: prescricaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prescricaos to fetch.
     */
    orderBy?: prescricaoOrderByWithRelationInput | prescricaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for prescricaos.
     */
    cursor?: prescricaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prescricaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prescricaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of prescricaos.
     */
    distinct?: PrescricaoScalarFieldEnum | PrescricaoScalarFieldEnum[]
  }

  /**
   * prescricao findMany
   */
  export type prescricaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoInclude<ExtArgs> | null
    /**
     * Filter, which prescricaos to fetch.
     */
    where?: prescricaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of prescricaos to fetch.
     */
    orderBy?: prescricaoOrderByWithRelationInput | prescricaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing prescricaos.
     */
    cursor?: prescricaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` prescricaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` prescricaos.
     */
    skip?: number
    distinct?: PrescricaoScalarFieldEnum | PrescricaoScalarFieldEnum[]
  }

  /**
   * prescricao create
   */
  export type prescricaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoInclude<ExtArgs> | null
    /**
     * The data needed to create a prescricao.
     */
    data: XOR<prescricaoCreateInput, prescricaoUncheckedCreateInput>
  }

  /**
   * prescricao createMany
   */
  export type prescricaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many prescricaos.
     */
    data: prescricaoCreateManyInput | prescricaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * prescricao createManyAndReturn
   */
  export type prescricaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * The data used to create many prescricaos.
     */
    data: prescricaoCreateManyInput | prescricaoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * prescricao update
   */
  export type prescricaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoInclude<ExtArgs> | null
    /**
     * The data needed to update a prescricao.
     */
    data: XOR<prescricaoUpdateInput, prescricaoUncheckedUpdateInput>
    /**
     * Choose, which prescricao to update.
     */
    where: prescricaoWhereUniqueInput
  }

  /**
   * prescricao updateMany
   */
  export type prescricaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update prescricaos.
     */
    data: XOR<prescricaoUpdateManyMutationInput, prescricaoUncheckedUpdateManyInput>
    /**
     * Filter which prescricaos to update
     */
    where?: prescricaoWhereInput
    /**
     * Limit how many prescricaos to update.
     */
    limit?: number
  }

  /**
   * prescricao updateManyAndReturn
   */
  export type prescricaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * The data used to update prescricaos.
     */
    data: XOR<prescricaoUpdateManyMutationInput, prescricaoUncheckedUpdateManyInput>
    /**
     * Filter which prescricaos to update
     */
    where?: prescricaoWhereInput
    /**
     * Limit how many prescricaos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * prescricao upsert
   */
  export type prescricaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoInclude<ExtArgs> | null
    /**
     * The filter to search for the prescricao to update in case it exists.
     */
    where: prescricaoWhereUniqueInput
    /**
     * In case the prescricao found by the `where` argument doesn't exist, create a new prescricao with this data.
     */
    create: XOR<prescricaoCreateInput, prescricaoUncheckedCreateInput>
    /**
     * In case the prescricao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<prescricaoUpdateInput, prescricaoUncheckedUpdateInput>
  }

  /**
   * prescricao delete
   */
  export type prescricaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoInclude<ExtArgs> | null
    /**
     * Filter which prescricao to delete.
     */
    where: prescricaoWhereUniqueInput
  }

  /**
   * prescricao deleteMany
   */
  export type prescricaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which prescricaos to delete
     */
    where?: prescricaoWhereInput
    /**
     * Limit how many prescricaos to delete.
     */
    limit?: number
  }

  /**
   * prescricao.consulta
   */
  export type prescricao$consultaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    where?: consultaWhereInput
  }

  /**
   * prescricao without action
   */
  export type prescricaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the prescricao
     */
    select?: prescricaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the prescricao
     */
    omit?: prescricaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: prescricaoInclude<ExtArgs> | null
  }


  /**
   * Model profissional_saude
   */

  export type AggregateProfissional_saude = {
    _count: Profissional_saudeCountAggregateOutputType | null
    _min: Profissional_saudeMinAggregateOutputType | null
    _max: Profissional_saudeMaxAggregateOutputType | null
  }

  export type Profissional_saudeMinAggregateOutputType = {
    id: string | null
    nome: string | null
    documento_numero: string | null
    tipo_documento_id: string | null
    especialidade_id: string | null
    email: string | null
    senha: string | null
    data_nascimento: Date | null
  }

  export type Profissional_saudeMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    documento_numero: string | null
    tipo_documento_id: string | null
    especialidade_id: string | null
    email: string | null
    senha: string | null
    data_nascimento: Date | null
  }

  export type Profissional_saudeCountAggregateOutputType = {
    id: number
    nome: number
    documento_numero: number
    tipo_documento_id: number
    especialidade_id: number
    email: number
    senha: number
    data_nascimento: number
    _all: number
  }


  export type Profissional_saudeMinAggregateInputType = {
    id?: true
    nome?: true
    documento_numero?: true
    tipo_documento_id?: true
    especialidade_id?: true
    email?: true
    senha?: true
    data_nascimento?: true
  }

  export type Profissional_saudeMaxAggregateInputType = {
    id?: true
    nome?: true
    documento_numero?: true
    tipo_documento_id?: true
    especialidade_id?: true
    email?: true
    senha?: true
    data_nascimento?: true
  }

  export type Profissional_saudeCountAggregateInputType = {
    id?: true
    nome?: true
    documento_numero?: true
    tipo_documento_id?: true
    especialidade_id?: true
    email?: true
    senha?: true
    data_nascimento?: true
    _all?: true
  }

  export type Profissional_saudeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which profissional_saude to aggregate.
     */
    where?: profissional_saudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profissional_saudes to fetch.
     */
    orderBy?: profissional_saudeOrderByWithRelationInput | profissional_saudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: profissional_saudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profissional_saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profissional_saudes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned profissional_saudes
    **/
    _count?: true | Profissional_saudeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Profissional_saudeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Profissional_saudeMaxAggregateInputType
  }

  export type GetProfissional_saudeAggregateType<T extends Profissional_saudeAggregateArgs> = {
        [P in keyof T & keyof AggregateProfissional_saude]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfissional_saude[P]>
      : GetScalarType<T[P], AggregateProfissional_saude[P]>
  }




  export type profissional_saudeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: profissional_saudeWhereInput
    orderBy?: profissional_saudeOrderByWithAggregationInput | profissional_saudeOrderByWithAggregationInput[]
    by: Profissional_saudeScalarFieldEnum[] | Profissional_saudeScalarFieldEnum
    having?: profissional_saudeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Profissional_saudeCountAggregateInputType | true
    _min?: Profissional_saudeMinAggregateInputType
    _max?: Profissional_saudeMaxAggregateInputType
  }

  export type Profissional_saudeGroupByOutputType = {
    id: string
    nome: string
    documento_numero: string | null
    tipo_documento_id: string | null
    especialidade_id: string | null
    email: string | null
    senha: string
    data_nascimento: Date | null
    _count: Profissional_saudeCountAggregateOutputType | null
    _min: Profissional_saudeMinAggregateOutputType | null
    _max: Profissional_saudeMaxAggregateOutputType | null
  }

  type GetProfissional_saudeGroupByPayload<T extends profissional_saudeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Profissional_saudeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Profissional_saudeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Profissional_saudeGroupByOutputType[P]>
            : GetScalarType<T[P], Profissional_saudeGroupByOutputType[P]>
        }
      >
    >


  export type profissional_saudeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    documento_numero?: boolean
    tipo_documento_id?: boolean
    especialidade_id?: boolean
    email?: boolean
    senha?: boolean
    data_nascimento?: boolean
    consulta?: boolean | profissional_saude$consultaArgs<ExtArgs>
    tipo_documento?: boolean | profissional_saude$tipo_documentoArgs<ExtArgs>
    especialidade?: boolean | profissional_saude$especialidadeArgs<ExtArgs>
    _count?: boolean | Profissional_saudeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profissional_saude"]>

  export type profissional_saudeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    documento_numero?: boolean
    tipo_documento_id?: boolean
    especialidade_id?: boolean
    email?: boolean
    senha?: boolean
    data_nascimento?: boolean
    tipo_documento?: boolean | profissional_saude$tipo_documentoArgs<ExtArgs>
    especialidade?: boolean | profissional_saude$especialidadeArgs<ExtArgs>
  }, ExtArgs["result"]["profissional_saude"]>

  export type profissional_saudeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    documento_numero?: boolean
    tipo_documento_id?: boolean
    especialidade_id?: boolean
    email?: boolean
    senha?: boolean
    data_nascimento?: boolean
    tipo_documento?: boolean | profissional_saude$tipo_documentoArgs<ExtArgs>
    especialidade?: boolean | profissional_saude$especialidadeArgs<ExtArgs>
  }, ExtArgs["result"]["profissional_saude"]>

  export type profissional_saudeSelectScalar = {
    id?: boolean
    nome?: boolean
    documento_numero?: boolean
    tipo_documento_id?: boolean
    especialidade_id?: boolean
    email?: boolean
    senha?: boolean
    data_nascimento?: boolean
  }

  export type profissional_saudeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "documento_numero" | "tipo_documento_id" | "especialidade_id" | "email" | "senha" | "data_nascimento", ExtArgs["result"]["profissional_saude"]>
  export type profissional_saudeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consulta?: boolean | profissional_saude$consultaArgs<ExtArgs>
    tipo_documento?: boolean | profissional_saude$tipo_documentoArgs<ExtArgs>
    especialidade?: boolean | profissional_saude$especialidadeArgs<ExtArgs>
    _count?: boolean | Profissional_saudeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type profissional_saudeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tipo_documento?: boolean | profissional_saude$tipo_documentoArgs<ExtArgs>
    especialidade?: boolean | profissional_saude$especialidadeArgs<ExtArgs>
  }
  export type profissional_saudeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tipo_documento?: boolean | profissional_saude$tipo_documentoArgs<ExtArgs>
    especialidade?: boolean | profissional_saude$especialidadeArgs<ExtArgs>
  }

  export type $profissional_saudePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "profissional_saude"
    objects: {
      consulta: Prisma.$consultaPayload<ExtArgs>[]
      tipo_documento: Prisma.$tipo_documentoPayload<ExtArgs> | null
      especialidade: Prisma.$especialidadePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      documento_numero: string | null
      tipo_documento_id: string | null
      especialidade_id: string | null
      email: string | null
      senha: string
      data_nascimento: Date | null
    }, ExtArgs["result"]["profissional_saude"]>
    composites: {}
  }

  type profissional_saudeGetPayload<S extends boolean | null | undefined | profissional_saudeDefaultArgs> = $Result.GetResult<Prisma.$profissional_saudePayload, S>

  type profissional_saudeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<profissional_saudeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Profissional_saudeCountAggregateInputType | true
    }

  export interface profissional_saudeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['profissional_saude'], meta: { name: 'profissional_saude' } }
    /**
     * Find zero or one Profissional_saude that matches the filter.
     * @param {profissional_saudeFindUniqueArgs} args - Arguments to find a Profissional_saude
     * @example
     * // Get one Profissional_saude
     * const profissional_saude = await prisma.profissional_saude.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends profissional_saudeFindUniqueArgs>(args: SelectSubset<T, profissional_saudeFindUniqueArgs<ExtArgs>>): Prisma__profissional_saudeClient<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profissional_saude that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {profissional_saudeFindUniqueOrThrowArgs} args - Arguments to find a Profissional_saude
     * @example
     * // Get one Profissional_saude
     * const profissional_saude = await prisma.profissional_saude.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends profissional_saudeFindUniqueOrThrowArgs>(args: SelectSubset<T, profissional_saudeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__profissional_saudeClient<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profissional_saude that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profissional_saudeFindFirstArgs} args - Arguments to find a Profissional_saude
     * @example
     * // Get one Profissional_saude
     * const profissional_saude = await prisma.profissional_saude.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends profissional_saudeFindFirstArgs>(args?: SelectSubset<T, profissional_saudeFindFirstArgs<ExtArgs>>): Prisma__profissional_saudeClient<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profissional_saude that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profissional_saudeFindFirstOrThrowArgs} args - Arguments to find a Profissional_saude
     * @example
     * // Get one Profissional_saude
     * const profissional_saude = await prisma.profissional_saude.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends profissional_saudeFindFirstOrThrowArgs>(args?: SelectSubset<T, profissional_saudeFindFirstOrThrowArgs<ExtArgs>>): Prisma__profissional_saudeClient<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profissional_saudes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profissional_saudeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profissional_saudes
     * const profissional_saudes = await prisma.profissional_saude.findMany()
     * 
     * // Get first 10 Profissional_saudes
     * const profissional_saudes = await prisma.profissional_saude.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profissional_saudeWithIdOnly = await prisma.profissional_saude.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends profissional_saudeFindManyArgs>(args?: SelectSubset<T, profissional_saudeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profissional_saude.
     * @param {profissional_saudeCreateArgs} args - Arguments to create a Profissional_saude.
     * @example
     * // Create one Profissional_saude
     * const Profissional_saude = await prisma.profissional_saude.create({
     *   data: {
     *     // ... data to create a Profissional_saude
     *   }
     * })
     * 
     */
    create<T extends profissional_saudeCreateArgs>(args: SelectSubset<T, profissional_saudeCreateArgs<ExtArgs>>): Prisma__profissional_saudeClient<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profissional_saudes.
     * @param {profissional_saudeCreateManyArgs} args - Arguments to create many Profissional_saudes.
     * @example
     * // Create many Profissional_saudes
     * const profissional_saude = await prisma.profissional_saude.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends profissional_saudeCreateManyArgs>(args?: SelectSubset<T, profissional_saudeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profissional_saudes and returns the data saved in the database.
     * @param {profissional_saudeCreateManyAndReturnArgs} args - Arguments to create many Profissional_saudes.
     * @example
     * // Create many Profissional_saudes
     * const profissional_saude = await prisma.profissional_saude.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profissional_saudes and only return the `id`
     * const profissional_saudeWithIdOnly = await prisma.profissional_saude.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends profissional_saudeCreateManyAndReturnArgs>(args?: SelectSubset<T, profissional_saudeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profissional_saude.
     * @param {profissional_saudeDeleteArgs} args - Arguments to delete one Profissional_saude.
     * @example
     * // Delete one Profissional_saude
     * const Profissional_saude = await prisma.profissional_saude.delete({
     *   where: {
     *     // ... filter to delete one Profissional_saude
     *   }
     * })
     * 
     */
    delete<T extends profissional_saudeDeleteArgs>(args: SelectSubset<T, profissional_saudeDeleteArgs<ExtArgs>>): Prisma__profissional_saudeClient<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profissional_saude.
     * @param {profissional_saudeUpdateArgs} args - Arguments to update one Profissional_saude.
     * @example
     * // Update one Profissional_saude
     * const profissional_saude = await prisma.profissional_saude.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends profissional_saudeUpdateArgs>(args: SelectSubset<T, profissional_saudeUpdateArgs<ExtArgs>>): Prisma__profissional_saudeClient<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profissional_saudes.
     * @param {profissional_saudeDeleteManyArgs} args - Arguments to filter Profissional_saudes to delete.
     * @example
     * // Delete a few Profissional_saudes
     * const { count } = await prisma.profissional_saude.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends profissional_saudeDeleteManyArgs>(args?: SelectSubset<T, profissional_saudeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profissional_saudes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profissional_saudeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profissional_saudes
     * const profissional_saude = await prisma.profissional_saude.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends profissional_saudeUpdateManyArgs>(args: SelectSubset<T, profissional_saudeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profissional_saudes and returns the data updated in the database.
     * @param {profissional_saudeUpdateManyAndReturnArgs} args - Arguments to update many Profissional_saudes.
     * @example
     * // Update many Profissional_saudes
     * const profissional_saude = await prisma.profissional_saude.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profissional_saudes and only return the `id`
     * const profissional_saudeWithIdOnly = await prisma.profissional_saude.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends profissional_saudeUpdateManyAndReturnArgs>(args: SelectSubset<T, profissional_saudeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profissional_saude.
     * @param {profissional_saudeUpsertArgs} args - Arguments to update or create a Profissional_saude.
     * @example
     * // Update or create a Profissional_saude
     * const profissional_saude = await prisma.profissional_saude.upsert({
     *   create: {
     *     // ... data to create a Profissional_saude
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profissional_saude we want to update
     *   }
     * })
     */
    upsert<T extends profissional_saudeUpsertArgs>(args: SelectSubset<T, profissional_saudeUpsertArgs<ExtArgs>>): Prisma__profissional_saudeClient<$Result.GetResult<Prisma.$profissional_saudePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profissional_saudes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profissional_saudeCountArgs} args - Arguments to filter Profissional_saudes to count.
     * @example
     * // Count the number of Profissional_saudes
     * const count = await prisma.profissional_saude.count({
     *   where: {
     *     // ... the filter for the Profissional_saudes we want to count
     *   }
     * })
    **/
    count<T extends profissional_saudeCountArgs>(
      args?: Subset<T, profissional_saudeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Profissional_saudeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profissional_saude.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Profissional_saudeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Profissional_saudeAggregateArgs>(args: Subset<T, Profissional_saudeAggregateArgs>): Prisma.PrismaPromise<GetProfissional_saudeAggregateType<T>>

    /**
     * Group by Profissional_saude.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profissional_saudeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends profissional_saudeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: profissional_saudeGroupByArgs['orderBy'] }
        : { orderBy?: profissional_saudeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, profissional_saudeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfissional_saudeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the profissional_saude model
   */
  readonly fields: profissional_saudeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for profissional_saude.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__profissional_saudeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consulta<T extends profissional_saude$consultaArgs<ExtArgs> = {}>(args?: Subset<T, profissional_saude$consultaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tipo_documento<T extends profissional_saude$tipo_documentoArgs<ExtArgs> = {}>(args?: Subset<T, profissional_saude$tipo_documentoArgs<ExtArgs>>): Prisma__tipo_documentoClient<$Result.GetResult<Prisma.$tipo_documentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    especialidade<T extends profissional_saude$especialidadeArgs<ExtArgs> = {}>(args?: Subset<T, profissional_saude$especialidadeArgs<ExtArgs>>): Prisma__especialidadeClient<$Result.GetResult<Prisma.$especialidadePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the profissional_saude model
   */
  interface profissional_saudeFieldRefs {
    readonly id: FieldRef<"profissional_saude", 'String'>
    readonly nome: FieldRef<"profissional_saude", 'String'>
    readonly documento_numero: FieldRef<"profissional_saude", 'String'>
    readonly tipo_documento_id: FieldRef<"profissional_saude", 'String'>
    readonly especialidade_id: FieldRef<"profissional_saude", 'String'>
    readonly email: FieldRef<"profissional_saude", 'String'>
    readonly senha: FieldRef<"profissional_saude", 'String'>
    readonly data_nascimento: FieldRef<"profissional_saude", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * profissional_saude findUnique
   */
  export type profissional_saudeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    /**
     * Filter, which profissional_saude to fetch.
     */
    where: profissional_saudeWhereUniqueInput
  }

  /**
   * profissional_saude findUniqueOrThrow
   */
  export type profissional_saudeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    /**
     * Filter, which profissional_saude to fetch.
     */
    where: profissional_saudeWhereUniqueInput
  }

  /**
   * profissional_saude findFirst
   */
  export type profissional_saudeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    /**
     * Filter, which profissional_saude to fetch.
     */
    where?: profissional_saudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profissional_saudes to fetch.
     */
    orderBy?: profissional_saudeOrderByWithRelationInput | profissional_saudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for profissional_saudes.
     */
    cursor?: profissional_saudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profissional_saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profissional_saudes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of profissional_saudes.
     */
    distinct?: Profissional_saudeScalarFieldEnum | Profissional_saudeScalarFieldEnum[]
  }

  /**
   * profissional_saude findFirstOrThrow
   */
  export type profissional_saudeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    /**
     * Filter, which profissional_saude to fetch.
     */
    where?: profissional_saudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profissional_saudes to fetch.
     */
    orderBy?: profissional_saudeOrderByWithRelationInput | profissional_saudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for profissional_saudes.
     */
    cursor?: profissional_saudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profissional_saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profissional_saudes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of profissional_saudes.
     */
    distinct?: Profissional_saudeScalarFieldEnum | Profissional_saudeScalarFieldEnum[]
  }

  /**
   * profissional_saude findMany
   */
  export type profissional_saudeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    /**
     * Filter, which profissional_saudes to fetch.
     */
    where?: profissional_saudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profissional_saudes to fetch.
     */
    orderBy?: profissional_saudeOrderByWithRelationInput | profissional_saudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing profissional_saudes.
     */
    cursor?: profissional_saudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profissional_saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profissional_saudes.
     */
    skip?: number
    distinct?: Profissional_saudeScalarFieldEnum | Profissional_saudeScalarFieldEnum[]
  }

  /**
   * profissional_saude create
   */
  export type profissional_saudeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    /**
     * The data needed to create a profissional_saude.
     */
    data: XOR<profissional_saudeCreateInput, profissional_saudeUncheckedCreateInput>
  }

  /**
   * profissional_saude createMany
   */
  export type profissional_saudeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many profissional_saudes.
     */
    data: profissional_saudeCreateManyInput | profissional_saudeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * profissional_saude createManyAndReturn
   */
  export type profissional_saudeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * The data used to create many profissional_saudes.
     */
    data: profissional_saudeCreateManyInput | profissional_saudeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * profissional_saude update
   */
  export type profissional_saudeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    /**
     * The data needed to update a profissional_saude.
     */
    data: XOR<profissional_saudeUpdateInput, profissional_saudeUncheckedUpdateInput>
    /**
     * Choose, which profissional_saude to update.
     */
    where: profissional_saudeWhereUniqueInput
  }

  /**
   * profissional_saude updateMany
   */
  export type profissional_saudeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update profissional_saudes.
     */
    data: XOR<profissional_saudeUpdateManyMutationInput, profissional_saudeUncheckedUpdateManyInput>
    /**
     * Filter which profissional_saudes to update
     */
    where?: profissional_saudeWhereInput
    /**
     * Limit how many profissional_saudes to update.
     */
    limit?: number
  }

  /**
   * profissional_saude updateManyAndReturn
   */
  export type profissional_saudeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * The data used to update profissional_saudes.
     */
    data: XOR<profissional_saudeUpdateManyMutationInput, profissional_saudeUncheckedUpdateManyInput>
    /**
     * Filter which profissional_saudes to update
     */
    where?: profissional_saudeWhereInput
    /**
     * Limit how many profissional_saudes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * profissional_saude upsert
   */
  export type profissional_saudeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    /**
     * The filter to search for the profissional_saude to update in case it exists.
     */
    where: profissional_saudeWhereUniqueInput
    /**
     * In case the profissional_saude found by the `where` argument doesn't exist, create a new profissional_saude with this data.
     */
    create: XOR<profissional_saudeCreateInput, profissional_saudeUncheckedCreateInput>
    /**
     * In case the profissional_saude was found with the provided `where` argument, update it with this data.
     */
    update: XOR<profissional_saudeUpdateInput, profissional_saudeUncheckedUpdateInput>
  }

  /**
   * profissional_saude delete
   */
  export type profissional_saudeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
    /**
     * Filter which profissional_saude to delete.
     */
    where: profissional_saudeWhereUniqueInput
  }

  /**
   * profissional_saude deleteMany
   */
  export type profissional_saudeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which profissional_saudes to delete
     */
    where?: profissional_saudeWhereInput
    /**
     * Limit how many profissional_saudes to delete.
     */
    limit?: number
  }

  /**
   * profissional_saude.consulta
   */
  export type profissional_saude$consultaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    where?: consultaWhereInput
    orderBy?: consultaOrderByWithRelationInput | consultaOrderByWithRelationInput[]
    cursor?: consultaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultaScalarFieldEnum | ConsultaScalarFieldEnum[]
  }

  /**
   * profissional_saude.tipo_documento
   */
  export type profissional_saude$tipo_documentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_documento
     */
    select?: tipo_documentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_documento
     */
    omit?: tipo_documentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tipo_documentoInclude<ExtArgs> | null
    where?: tipo_documentoWhereInput
  }

  /**
   * profissional_saude.especialidade
   */
  export type profissional_saude$especialidadeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the especialidade
     */
    select?: especialidadeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the especialidade
     */
    omit?: especialidadeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: especialidadeInclude<ExtArgs> | null
    where?: especialidadeWhereInput
  }

  /**
   * profissional_saude without action
   */
  export type profissional_saudeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profissional_saude
     */
    select?: profissional_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profissional_saude
     */
    omit?: profissional_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profissional_saudeInclude<ExtArgs> | null
  }


  /**
   * Model template
   */

  export type AggregateTemplate = {
    _count: TemplateCountAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  export type TemplateMinAggregateOutputType = {
    id: string | null
    titulo: string | null
    sintomas_padrao: string | null
    condutas_sugeridas: string | null
    sazonalidade: string | null
  }

  export type TemplateMaxAggregateOutputType = {
    id: string | null
    titulo: string | null
    sintomas_padrao: string | null
    condutas_sugeridas: string | null
    sazonalidade: string | null
  }

  export type TemplateCountAggregateOutputType = {
    id: number
    titulo: number
    sintomas_padrao: number
    condutas_sugeridas: number
    sazonalidade: number
    _all: number
  }


  export type TemplateMinAggregateInputType = {
    id?: true
    titulo?: true
    sintomas_padrao?: true
    condutas_sugeridas?: true
    sazonalidade?: true
  }

  export type TemplateMaxAggregateInputType = {
    id?: true
    titulo?: true
    sintomas_padrao?: true
    condutas_sugeridas?: true
    sazonalidade?: true
  }

  export type TemplateCountAggregateInputType = {
    id?: true
    titulo?: true
    sintomas_padrao?: true
    condutas_sugeridas?: true
    sazonalidade?: true
    _all?: true
  }

  export type TemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which template to aggregate.
     */
    where?: templateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of templates to fetch.
     */
    orderBy?: templateOrderByWithRelationInput | templateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: templateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned templates
    **/
    _count?: true | TemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateMaxAggregateInputType
  }

  export type GetTemplateAggregateType<T extends TemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplate[P]>
      : GetScalarType<T[P], AggregateTemplate[P]>
  }




  export type templateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: templateWhereInput
    orderBy?: templateOrderByWithAggregationInput | templateOrderByWithAggregationInput[]
    by: TemplateScalarFieldEnum[] | TemplateScalarFieldEnum
    having?: templateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateCountAggregateInputType | true
    _min?: TemplateMinAggregateInputType
    _max?: TemplateMaxAggregateInputType
  }

  export type TemplateGroupByOutputType = {
    id: string
    titulo: string
    sintomas_padrao: string | null
    condutas_sugeridas: string | null
    sazonalidade: string | null
    _count: TemplateCountAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  type GetTemplateGroupByPayload<T extends templateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateGroupByOutputType[P]>
        }
      >
    >


  export type templateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    sintomas_padrao?: boolean
    condutas_sugeridas?: boolean
    sazonalidade?: boolean
  }, ExtArgs["result"]["template"]>

  export type templateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    sintomas_padrao?: boolean
    condutas_sugeridas?: boolean
    sazonalidade?: boolean
  }, ExtArgs["result"]["template"]>

  export type templateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    sintomas_padrao?: boolean
    condutas_sugeridas?: boolean
    sazonalidade?: boolean
  }, ExtArgs["result"]["template"]>

  export type templateSelectScalar = {
    id?: boolean
    titulo?: boolean
    sintomas_padrao?: boolean
    condutas_sugeridas?: boolean
    sazonalidade?: boolean
  }

  export type templateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titulo" | "sintomas_padrao" | "condutas_sugeridas" | "sazonalidade", ExtArgs["result"]["template"]>

  export type $templatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "template"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titulo: string
      sintomas_padrao: string | null
      condutas_sugeridas: string | null
      sazonalidade: string | null
    }, ExtArgs["result"]["template"]>
    composites: {}
  }

  type templateGetPayload<S extends boolean | null | undefined | templateDefaultArgs> = $Result.GetResult<Prisma.$templatePayload, S>

  type templateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<templateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplateCountAggregateInputType | true
    }

  export interface templateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['template'], meta: { name: 'template' } }
    /**
     * Find zero or one Template that matches the filter.
     * @param {templateFindUniqueArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends templateFindUniqueArgs>(args: SelectSubset<T, templateFindUniqueArgs<ExtArgs>>): Prisma__templateClient<$Result.GetResult<Prisma.$templatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Template that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {templateFindUniqueOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends templateFindUniqueOrThrowArgs>(args: SelectSubset<T, templateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__templateClient<$Result.GetResult<Prisma.$templatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templateFindFirstArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends templateFindFirstArgs>(args?: SelectSubset<T, templateFindFirstArgs<ExtArgs>>): Prisma__templateClient<$Result.GetResult<Prisma.$templatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templateFindFirstOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends templateFindFirstOrThrowArgs>(args?: SelectSubset<T, templateFindFirstOrThrowArgs<ExtArgs>>): Prisma__templateClient<$Result.GetResult<Prisma.$templatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Templates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Templates
     * const templates = await prisma.template.findMany()
     * 
     * // Get first 10 Templates
     * const templates = await prisma.template.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateWithIdOnly = await prisma.template.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends templateFindManyArgs>(args?: SelectSubset<T, templateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$templatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Template.
     * @param {templateCreateArgs} args - Arguments to create a Template.
     * @example
     * // Create one Template
     * const Template = await prisma.template.create({
     *   data: {
     *     // ... data to create a Template
     *   }
     * })
     * 
     */
    create<T extends templateCreateArgs>(args: SelectSubset<T, templateCreateArgs<ExtArgs>>): Prisma__templateClient<$Result.GetResult<Prisma.$templatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Templates.
     * @param {templateCreateManyArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends templateCreateManyArgs>(args?: SelectSubset<T, templateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Templates and returns the data saved in the database.
     * @param {templateCreateManyAndReturnArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Templates and only return the `id`
     * const templateWithIdOnly = await prisma.template.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends templateCreateManyAndReturnArgs>(args?: SelectSubset<T, templateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$templatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Template.
     * @param {templateDeleteArgs} args - Arguments to delete one Template.
     * @example
     * // Delete one Template
     * const Template = await prisma.template.delete({
     *   where: {
     *     // ... filter to delete one Template
     *   }
     * })
     * 
     */
    delete<T extends templateDeleteArgs>(args: SelectSubset<T, templateDeleteArgs<ExtArgs>>): Prisma__templateClient<$Result.GetResult<Prisma.$templatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Template.
     * @param {templateUpdateArgs} args - Arguments to update one Template.
     * @example
     * // Update one Template
     * const template = await prisma.template.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends templateUpdateArgs>(args: SelectSubset<T, templateUpdateArgs<ExtArgs>>): Prisma__templateClient<$Result.GetResult<Prisma.$templatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Templates.
     * @param {templateDeleteManyArgs} args - Arguments to filter Templates to delete.
     * @example
     * // Delete a few Templates
     * const { count } = await prisma.template.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends templateDeleteManyArgs>(args?: SelectSubset<T, templateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends templateUpdateManyArgs>(args: SelectSubset<T, templateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates and returns the data updated in the database.
     * @param {templateUpdateManyAndReturnArgs} args - Arguments to update many Templates.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Templates and only return the `id`
     * const templateWithIdOnly = await prisma.template.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends templateUpdateManyAndReturnArgs>(args: SelectSubset<T, templateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$templatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Template.
     * @param {templateUpsertArgs} args - Arguments to update or create a Template.
     * @example
     * // Update or create a Template
     * const template = await prisma.template.upsert({
     *   create: {
     *     // ... data to create a Template
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Template we want to update
     *   }
     * })
     */
    upsert<T extends templateUpsertArgs>(args: SelectSubset<T, templateUpsertArgs<ExtArgs>>): Prisma__templateClient<$Result.GetResult<Prisma.$templatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templateCountArgs} args - Arguments to filter Templates to count.
     * @example
     * // Count the number of Templates
     * const count = await prisma.template.count({
     *   where: {
     *     // ... the filter for the Templates we want to count
     *   }
     * })
    **/
    count<T extends templateCountArgs>(
      args?: Subset<T, templateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplateAggregateArgs>(args: Subset<T, TemplateAggregateArgs>): Prisma.PrismaPromise<GetTemplateAggregateType<T>>

    /**
     * Group by Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {templateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends templateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: templateGroupByArgs['orderBy'] }
        : { orderBy?: templateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, templateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the template model
   */
  readonly fields: templateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for template.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__templateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the template model
   */
  interface templateFieldRefs {
    readonly id: FieldRef<"template", 'String'>
    readonly titulo: FieldRef<"template", 'String'>
    readonly sintomas_padrao: FieldRef<"template", 'String'>
    readonly condutas_sugeridas: FieldRef<"template", 'String'>
    readonly sazonalidade: FieldRef<"template", 'String'>
  }
    

  // Custom InputTypes
  /**
   * template findUnique
   */
  export type templateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
    /**
     * Filter, which template to fetch.
     */
    where: templateWhereUniqueInput
  }

  /**
   * template findUniqueOrThrow
   */
  export type templateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
    /**
     * Filter, which template to fetch.
     */
    where: templateWhereUniqueInput
  }

  /**
   * template findFirst
   */
  export type templateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
    /**
     * Filter, which template to fetch.
     */
    where?: templateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of templates to fetch.
     */
    orderBy?: templateOrderByWithRelationInput | templateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for templates.
     */
    cursor?: templateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * template findFirstOrThrow
   */
  export type templateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
    /**
     * Filter, which template to fetch.
     */
    where?: templateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of templates to fetch.
     */
    orderBy?: templateOrderByWithRelationInput | templateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for templates.
     */
    cursor?: templateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * template findMany
   */
  export type templateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
    /**
     * Filter, which templates to fetch.
     */
    where?: templateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of templates to fetch.
     */
    orderBy?: templateOrderByWithRelationInput | templateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing templates.
     */
    cursor?: templateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` templates.
     */
    skip?: number
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * template create
   */
  export type templateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
    /**
     * The data needed to create a template.
     */
    data: XOR<templateCreateInput, templateUncheckedCreateInput>
  }

  /**
   * template createMany
   */
  export type templateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many templates.
     */
    data: templateCreateManyInput | templateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * template createManyAndReturn
   */
  export type templateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
    /**
     * The data used to create many templates.
     */
    data: templateCreateManyInput | templateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * template update
   */
  export type templateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
    /**
     * The data needed to update a template.
     */
    data: XOR<templateUpdateInput, templateUncheckedUpdateInput>
    /**
     * Choose, which template to update.
     */
    where: templateWhereUniqueInput
  }

  /**
   * template updateMany
   */
  export type templateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update templates.
     */
    data: XOR<templateUpdateManyMutationInput, templateUncheckedUpdateManyInput>
    /**
     * Filter which templates to update
     */
    where?: templateWhereInput
    /**
     * Limit how many templates to update.
     */
    limit?: number
  }

  /**
   * template updateManyAndReturn
   */
  export type templateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
    /**
     * The data used to update templates.
     */
    data: XOR<templateUpdateManyMutationInput, templateUncheckedUpdateManyInput>
    /**
     * Filter which templates to update
     */
    where?: templateWhereInput
    /**
     * Limit how many templates to update.
     */
    limit?: number
  }

  /**
   * template upsert
   */
  export type templateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
    /**
     * The filter to search for the template to update in case it exists.
     */
    where: templateWhereUniqueInput
    /**
     * In case the template found by the `where` argument doesn't exist, create a new template with this data.
     */
    create: XOR<templateCreateInput, templateUncheckedCreateInput>
    /**
     * In case the template was found with the provided `where` argument, update it with this data.
     */
    update: XOR<templateUpdateInput, templateUncheckedUpdateInput>
  }

  /**
   * template delete
   */
  export type templateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
    /**
     * Filter which template to delete.
     */
    where: templateWhereUniqueInput
  }

  /**
   * template deleteMany
   */
  export type templateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which templates to delete
     */
    where?: templateWhereInput
    /**
     * Limit how many templates to delete.
     */
    limit?: number
  }

  /**
   * template without action
   */
  export type templateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the template
     */
    select?: templateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the template
     */
    omit?: templateOmit<ExtArgs> | null
  }


  /**
   * Model unidade_saude
   */

  export type AggregateUnidade_saude = {
    _count: Unidade_saudeCountAggregateOutputType | null
    _min: Unidade_saudeMinAggregateOutputType | null
    _max: Unidade_saudeMaxAggregateOutputType | null
  }

  export type Unidade_saudeMinAggregateOutputType = {
    id: string | null
    nome: string | null
    cnes: string | null
    endereco: string | null
    cidade: string | null
    estado: string | null
  }

  export type Unidade_saudeMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    cnes: string | null
    endereco: string | null
    cidade: string | null
    estado: string | null
  }

  export type Unidade_saudeCountAggregateOutputType = {
    id: number
    nome: number
    cnes: number
    endereco: number
    cidade: number
    estado: number
    _all: number
  }


  export type Unidade_saudeMinAggregateInputType = {
    id?: true
    nome?: true
    cnes?: true
    endereco?: true
    cidade?: true
    estado?: true
  }

  export type Unidade_saudeMaxAggregateInputType = {
    id?: true
    nome?: true
    cnes?: true
    endereco?: true
    cidade?: true
    estado?: true
  }

  export type Unidade_saudeCountAggregateInputType = {
    id?: true
    nome?: true
    cnes?: true
    endereco?: true
    cidade?: true
    estado?: true
    _all?: true
  }

  export type Unidade_saudeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which unidade_saude to aggregate.
     */
    where?: unidade_saudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of unidade_saudes to fetch.
     */
    orderBy?: unidade_saudeOrderByWithRelationInput | unidade_saudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: unidade_saudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` unidade_saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` unidade_saudes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned unidade_saudes
    **/
    _count?: true | Unidade_saudeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Unidade_saudeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Unidade_saudeMaxAggregateInputType
  }

  export type GetUnidade_saudeAggregateType<T extends Unidade_saudeAggregateArgs> = {
        [P in keyof T & keyof AggregateUnidade_saude]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUnidade_saude[P]>
      : GetScalarType<T[P], AggregateUnidade_saude[P]>
  }




  export type unidade_saudeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: unidade_saudeWhereInput
    orderBy?: unidade_saudeOrderByWithAggregationInput | unidade_saudeOrderByWithAggregationInput[]
    by: Unidade_saudeScalarFieldEnum[] | Unidade_saudeScalarFieldEnum
    having?: unidade_saudeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Unidade_saudeCountAggregateInputType | true
    _min?: Unidade_saudeMinAggregateInputType
    _max?: Unidade_saudeMaxAggregateInputType
  }

  export type Unidade_saudeGroupByOutputType = {
    id: string
    nome: string
    cnes: string | null
    endereco: string | null
    cidade: string | null
    estado: string | null
    _count: Unidade_saudeCountAggregateOutputType | null
    _min: Unidade_saudeMinAggregateOutputType | null
    _max: Unidade_saudeMaxAggregateOutputType | null
  }

  type GetUnidade_saudeGroupByPayload<T extends unidade_saudeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Unidade_saudeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Unidade_saudeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Unidade_saudeGroupByOutputType[P]>
            : GetScalarType<T[P], Unidade_saudeGroupByOutputType[P]>
        }
      >
    >


  export type unidade_saudeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnes?: boolean
    endereco?: boolean
    cidade?: boolean
    estado?: boolean
    consulta?: boolean | unidade_saude$consultaArgs<ExtArgs>
    _count?: boolean | Unidade_saudeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unidade_saude"]>

  export type unidade_saudeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnes?: boolean
    endereco?: boolean
    cidade?: boolean
    estado?: boolean
  }, ExtArgs["result"]["unidade_saude"]>

  export type unidade_saudeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnes?: boolean
    endereco?: boolean
    cidade?: boolean
    estado?: boolean
  }, ExtArgs["result"]["unidade_saude"]>

  export type unidade_saudeSelectScalar = {
    id?: boolean
    nome?: boolean
    cnes?: boolean
    endereco?: boolean
    cidade?: boolean
    estado?: boolean
  }

  export type unidade_saudeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "cnes" | "endereco" | "cidade" | "estado", ExtArgs["result"]["unidade_saude"]>
  export type unidade_saudeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consulta?: boolean | unidade_saude$consultaArgs<ExtArgs>
    _count?: boolean | Unidade_saudeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type unidade_saudeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type unidade_saudeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $unidade_saudePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "unidade_saude"
    objects: {
      consulta: Prisma.$consultaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      cnes: string | null
      endereco: string | null
      cidade: string | null
      estado: string | null
    }, ExtArgs["result"]["unidade_saude"]>
    composites: {}
  }

  type unidade_saudeGetPayload<S extends boolean | null | undefined | unidade_saudeDefaultArgs> = $Result.GetResult<Prisma.$unidade_saudePayload, S>

  type unidade_saudeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<unidade_saudeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Unidade_saudeCountAggregateInputType | true
    }

  export interface unidade_saudeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['unidade_saude'], meta: { name: 'unidade_saude' } }
    /**
     * Find zero or one Unidade_saude that matches the filter.
     * @param {unidade_saudeFindUniqueArgs} args - Arguments to find a Unidade_saude
     * @example
     * // Get one Unidade_saude
     * const unidade_saude = await prisma.unidade_saude.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends unidade_saudeFindUniqueArgs>(args: SelectSubset<T, unidade_saudeFindUniqueArgs<ExtArgs>>): Prisma__unidade_saudeClient<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Unidade_saude that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {unidade_saudeFindUniqueOrThrowArgs} args - Arguments to find a Unidade_saude
     * @example
     * // Get one Unidade_saude
     * const unidade_saude = await prisma.unidade_saude.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends unidade_saudeFindUniqueOrThrowArgs>(args: SelectSubset<T, unidade_saudeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__unidade_saudeClient<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unidade_saude that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unidade_saudeFindFirstArgs} args - Arguments to find a Unidade_saude
     * @example
     * // Get one Unidade_saude
     * const unidade_saude = await prisma.unidade_saude.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends unidade_saudeFindFirstArgs>(args?: SelectSubset<T, unidade_saudeFindFirstArgs<ExtArgs>>): Prisma__unidade_saudeClient<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Unidade_saude that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unidade_saudeFindFirstOrThrowArgs} args - Arguments to find a Unidade_saude
     * @example
     * // Get one Unidade_saude
     * const unidade_saude = await prisma.unidade_saude.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends unidade_saudeFindFirstOrThrowArgs>(args?: SelectSubset<T, unidade_saudeFindFirstOrThrowArgs<ExtArgs>>): Prisma__unidade_saudeClient<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Unidade_saudes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unidade_saudeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Unidade_saudes
     * const unidade_saudes = await prisma.unidade_saude.findMany()
     * 
     * // Get first 10 Unidade_saudes
     * const unidade_saudes = await prisma.unidade_saude.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const unidade_saudeWithIdOnly = await prisma.unidade_saude.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends unidade_saudeFindManyArgs>(args?: SelectSubset<T, unidade_saudeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Unidade_saude.
     * @param {unidade_saudeCreateArgs} args - Arguments to create a Unidade_saude.
     * @example
     * // Create one Unidade_saude
     * const Unidade_saude = await prisma.unidade_saude.create({
     *   data: {
     *     // ... data to create a Unidade_saude
     *   }
     * })
     * 
     */
    create<T extends unidade_saudeCreateArgs>(args: SelectSubset<T, unidade_saudeCreateArgs<ExtArgs>>): Prisma__unidade_saudeClient<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Unidade_saudes.
     * @param {unidade_saudeCreateManyArgs} args - Arguments to create many Unidade_saudes.
     * @example
     * // Create many Unidade_saudes
     * const unidade_saude = await prisma.unidade_saude.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends unidade_saudeCreateManyArgs>(args?: SelectSubset<T, unidade_saudeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Unidade_saudes and returns the data saved in the database.
     * @param {unidade_saudeCreateManyAndReturnArgs} args - Arguments to create many Unidade_saudes.
     * @example
     * // Create many Unidade_saudes
     * const unidade_saude = await prisma.unidade_saude.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Unidade_saudes and only return the `id`
     * const unidade_saudeWithIdOnly = await prisma.unidade_saude.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends unidade_saudeCreateManyAndReturnArgs>(args?: SelectSubset<T, unidade_saudeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Unidade_saude.
     * @param {unidade_saudeDeleteArgs} args - Arguments to delete one Unidade_saude.
     * @example
     * // Delete one Unidade_saude
     * const Unidade_saude = await prisma.unidade_saude.delete({
     *   where: {
     *     // ... filter to delete one Unidade_saude
     *   }
     * })
     * 
     */
    delete<T extends unidade_saudeDeleteArgs>(args: SelectSubset<T, unidade_saudeDeleteArgs<ExtArgs>>): Prisma__unidade_saudeClient<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Unidade_saude.
     * @param {unidade_saudeUpdateArgs} args - Arguments to update one Unidade_saude.
     * @example
     * // Update one Unidade_saude
     * const unidade_saude = await prisma.unidade_saude.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends unidade_saudeUpdateArgs>(args: SelectSubset<T, unidade_saudeUpdateArgs<ExtArgs>>): Prisma__unidade_saudeClient<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Unidade_saudes.
     * @param {unidade_saudeDeleteManyArgs} args - Arguments to filter Unidade_saudes to delete.
     * @example
     * // Delete a few Unidade_saudes
     * const { count } = await prisma.unidade_saude.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends unidade_saudeDeleteManyArgs>(args?: SelectSubset<T, unidade_saudeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Unidade_saudes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unidade_saudeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Unidade_saudes
     * const unidade_saude = await prisma.unidade_saude.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends unidade_saudeUpdateManyArgs>(args: SelectSubset<T, unidade_saudeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Unidade_saudes and returns the data updated in the database.
     * @param {unidade_saudeUpdateManyAndReturnArgs} args - Arguments to update many Unidade_saudes.
     * @example
     * // Update many Unidade_saudes
     * const unidade_saude = await prisma.unidade_saude.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Unidade_saudes and only return the `id`
     * const unidade_saudeWithIdOnly = await prisma.unidade_saude.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends unidade_saudeUpdateManyAndReturnArgs>(args: SelectSubset<T, unidade_saudeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Unidade_saude.
     * @param {unidade_saudeUpsertArgs} args - Arguments to update or create a Unidade_saude.
     * @example
     * // Update or create a Unidade_saude
     * const unidade_saude = await prisma.unidade_saude.upsert({
     *   create: {
     *     // ... data to create a Unidade_saude
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Unidade_saude we want to update
     *   }
     * })
     */
    upsert<T extends unidade_saudeUpsertArgs>(args: SelectSubset<T, unidade_saudeUpsertArgs<ExtArgs>>): Prisma__unidade_saudeClient<$Result.GetResult<Prisma.$unidade_saudePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Unidade_saudes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unidade_saudeCountArgs} args - Arguments to filter Unidade_saudes to count.
     * @example
     * // Count the number of Unidade_saudes
     * const count = await prisma.unidade_saude.count({
     *   where: {
     *     // ... the filter for the Unidade_saudes we want to count
     *   }
     * })
    **/
    count<T extends unidade_saudeCountArgs>(
      args?: Subset<T, unidade_saudeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Unidade_saudeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Unidade_saude.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Unidade_saudeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Unidade_saudeAggregateArgs>(args: Subset<T, Unidade_saudeAggregateArgs>): Prisma.PrismaPromise<GetUnidade_saudeAggregateType<T>>

    /**
     * Group by Unidade_saude.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {unidade_saudeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends unidade_saudeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: unidade_saudeGroupByArgs['orderBy'] }
        : { orderBy?: unidade_saudeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, unidade_saudeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnidade_saudeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the unidade_saude model
   */
  readonly fields: unidade_saudeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for unidade_saude.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__unidade_saudeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consulta<T extends unidade_saude$consultaArgs<ExtArgs> = {}>(args?: Subset<T, unidade_saude$consultaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$consultaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the unidade_saude model
   */
  interface unidade_saudeFieldRefs {
    readonly id: FieldRef<"unidade_saude", 'String'>
    readonly nome: FieldRef<"unidade_saude", 'String'>
    readonly cnes: FieldRef<"unidade_saude", 'String'>
    readonly endereco: FieldRef<"unidade_saude", 'String'>
    readonly cidade: FieldRef<"unidade_saude", 'String'>
    readonly estado: FieldRef<"unidade_saude", 'String'>
  }
    

  // Custom InputTypes
  /**
   * unidade_saude findUnique
   */
  export type unidade_saudeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unidade_saudeInclude<ExtArgs> | null
    /**
     * Filter, which unidade_saude to fetch.
     */
    where: unidade_saudeWhereUniqueInput
  }

  /**
   * unidade_saude findUniqueOrThrow
   */
  export type unidade_saudeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unidade_saudeInclude<ExtArgs> | null
    /**
     * Filter, which unidade_saude to fetch.
     */
    where: unidade_saudeWhereUniqueInput
  }

  /**
   * unidade_saude findFirst
   */
  export type unidade_saudeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unidade_saudeInclude<ExtArgs> | null
    /**
     * Filter, which unidade_saude to fetch.
     */
    where?: unidade_saudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of unidade_saudes to fetch.
     */
    orderBy?: unidade_saudeOrderByWithRelationInput | unidade_saudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for unidade_saudes.
     */
    cursor?: unidade_saudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` unidade_saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` unidade_saudes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of unidade_saudes.
     */
    distinct?: Unidade_saudeScalarFieldEnum | Unidade_saudeScalarFieldEnum[]
  }

  /**
   * unidade_saude findFirstOrThrow
   */
  export type unidade_saudeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unidade_saudeInclude<ExtArgs> | null
    /**
     * Filter, which unidade_saude to fetch.
     */
    where?: unidade_saudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of unidade_saudes to fetch.
     */
    orderBy?: unidade_saudeOrderByWithRelationInput | unidade_saudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for unidade_saudes.
     */
    cursor?: unidade_saudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` unidade_saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` unidade_saudes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of unidade_saudes.
     */
    distinct?: Unidade_saudeScalarFieldEnum | Unidade_saudeScalarFieldEnum[]
  }

  /**
   * unidade_saude findMany
   */
  export type unidade_saudeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unidade_saudeInclude<ExtArgs> | null
    /**
     * Filter, which unidade_saudes to fetch.
     */
    where?: unidade_saudeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of unidade_saudes to fetch.
     */
    orderBy?: unidade_saudeOrderByWithRelationInput | unidade_saudeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing unidade_saudes.
     */
    cursor?: unidade_saudeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` unidade_saudes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` unidade_saudes.
     */
    skip?: number
    distinct?: Unidade_saudeScalarFieldEnum | Unidade_saudeScalarFieldEnum[]
  }

  /**
   * unidade_saude create
   */
  export type unidade_saudeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unidade_saudeInclude<ExtArgs> | null
    /**
     * The data needed to create a unidade_saude.
     */
    data: XOR<unidade_saudeCreateInput, unidade_saudeUncheckedCreateInput>
  }

  /**
   * unidade_saude createMany
   */
  export type unidade_saudeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many unidade_saudes.
     */
    data: unidade_saudeCreateManyInput | unidade_saudeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * unidade_saude createManyAndReturn
   */
  export type unidade_saudeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * The data used to create many unidade_saudes.
     */
    data: unidade_saudeCreateManyInput | unidade_saudeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * unidade_saude update
   */
  export type unidade_saudeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unidade_saudeInclude<ExtArgs> | null
    /**
     * The data needed to update a unidade_saude.
     */
    data: XOR<unidade_saudeUpdateInput, unidade_saudeUncheckedUpdateInput>
    /**
     * Choose, which unidade_saude to update.
     */
    where: unidade_saudeWhereUniqueInput
  }

  /**
   * unidade_saude updateMany
   */
  export type unidade_saudeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update unidade_saudes.
     */
    data: XOR<unidade_saudeUpdateManyMutationInput, unidade_saudeUncheckedUpdateManyInput>
    /**
     * Filter which unidade_saudes to update
     */
    where?: unidade_saudeWhereInput
    /**
     * Limit how many unidade_saudes to update.
     */
    limit?: number
  }

  /**
   * unidade_saude updateManyAndReturn
   */
  export type unidade_saudeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * The data used to update unidade_saudes.
     */
    data: XOR<unidade_saudeUpdateManyMutationInput, unidade_saudeUncheckedUpdateManyInput>
    /**
     * Filter which unidade_saudes to update
     */
    where?: unidade_saudeWhereInput
    /**
     * Limit how many unidade_saudes to update.
     */
    limit?: number
  }

  /**
   * unidade_saude upsert
   */
  export type unidade_saudeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unidade_saudeInclude<ExtArgs> | null
    /**
     * The filter to search for the unidade_saude to update in case it exists.
     */
    where: unidade_saudeWhereUniqueInput
    /**
     * In case the unidade_saude found by the `where` argument doesn't exist, create a new unidade_saude with this data.
     */
    create: XOR<unidade_saudeCreateInput, unidade_saudeUncheckedCreateInput>
    /**
     * In case the unidade_saude was found with the provided `where` argument, update it with this data.
     */
    update: XOR<unidade_saudeUpdateInput, unidade_saudeUncheckedUpdateInput>
  }

  /**
   * unidade_saude delete
   */
  export type unidade_saudeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unidade_saudeInclude<ExtArgs> | null
    /**
     * Filter which unidade_saude to delete.
     */
    where: unidade_saudeWhereUniqueInput
  }

  /**
   * unidade_saude deleteMany
   */
  export type unidade_saudeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which unidade_saudes to delete
     */
    where?: unidade_saudeWhereInput
    /**
     * Limit how many unidade_saudes to delete.
     */
    limit?: number
  }

  /**
   * unidade_saude.consulta
   */
  export type unidade_saude$consultaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consulta
     */
    select?: consultaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consulta
     */
    omit?: consultaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: consultaInclude<ExtArgs> | null
    where?: consultaWhereInput
    orderBy?: consultaOrderByWithRelationInput | consultaOrderByWithRelationInput[]
    cursor?: consultaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsultaScalarFieldEnum | ConsultaScalarFieldEnum[]
  }

  /**
   * unidade_saude without action
   */
  export type unidade_saudeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the unidade_saude
     */
    select?: unidade_saudeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the unidade_saude
     */
    omit?: unidade_saudeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: unidade_saudeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Tipo_documentoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    descricao: 'descricao'
  };

  export type Tipo_documentoScalarFieldEnum = (typeof Tipo_documentoScalarFieldEnum)[keyof typeof Tipo_documentoScalarFieldEnum]


  export const EspecialidadeScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    descricao: 'descricao'
  };

  export type EspecialidadeScalarFieldEnum = (typeof EspecialidadeScalarFieldEnum)[keyof typeof EspecialidadeScalarFieldEnum]


  export const ConsultaScalarFieldEnum: {
    id: 'id',
    paciente_id: 'paciente_id',
    profissional_id: 'profissional_id',
    unidade_id: 'unidade_id',
    data: 'data',
    sintomas: 'sintomas',
    diagnostico: 'diagnostico',
    conduta: 'conduta'
  };

  export type ConsultaScalarFieldEnum = (typeof ConsultaScalarFieldEnum)[keyof typeof ConsultaScalarFieldEnum]


  export const PacienteScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    data_nascimento: 'data_nascimento',
    sexo: 'sexo',
    cpf: 'cpf',
    telefone: 'telefone',
    email: 'email'
  };

  export type PacienteScalarFieldEnum = (typeof PacienteScalarFieldEnum)[keyof typeof PacienteScalarFieldEnum]


  export const PrescricaoScalarFieldEnum: {
    id: 'id',
    consulta_id: 'consulta_id',
    medicamento: 'medicamento',
    posologia: 'posologia',
    duracao: 'duracao'
  };

  export type PrescricaoScalarFieldEnum = (typeof PrescricaoScalarFieldEnum)[keyof typeof PrescricaoScalarFieldEnum]


  export const Profissional_saudeScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    documento_numero: 'documento_numero',
    tipo_documento_id: 'tipo_documento_id',
    especialidade_id: 'especialidade_id',
    email: 'email',
    senha: 'senha',
    data_nascimento: 'data_nascimento'
  };

  export type Profissional_saudeScalarFieldEnum = (typeof Profissional_saudeScalarFieldEnum)[keyof typeof Profissional_saudeScalarFieldEnum]


  export const TemplateScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    sintomas_padrao: 'sintomas_padrao',
    condutas_sugeridas: 'condutas_sugeridas',
    sazonalidade: 'sazonalidade'
  };

  export type TemplateScalarFieldEnum = (typeof TemplateScalarFieldEnum)[keyof typeof TemplateScalarFieldEnum]


  export const Unidade_saudeScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    cnes: 'cnes',
    endereco: 'endereco',
    cidade: 'cidade',
    estado: 'estado'
  };

  export type Unidade_saudeScalarFieldEnum = (typeof Unidade_saudeScalarFieldEnum)[keyof typeof Unidade_saudeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type tipo_documentoWhereInput = {
    AND?: tipo_documentoWhereInput | tipo_documentoWhereInput[]
    OR?: tipo_documentoWhereInput[]
    NOT?: tipo_documentoWhereInput | tipo_documentoWhereInput[]
    id?: UuidFilter<"tipo_documento"> | string
    nome?: StringFilter<"tipo_documento"> | string
    descricao?: StringNullableFilter<"tipo_documento"> | string | null
    profissional_saude?: Profissional_saudeListRelationFilter
  }

  export type tipo_documentoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    profissional_saude?: profissional_saudeOrderByRelationAggregateInput
  }

  export type tipo_documentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nome?: string
    AND?: tipo_documentoWhereInput | tipo_documentoWhereInput[]
    OR?: tipo_documentoWhereInput[]
    NOT?: tipo_documentoWhereInput | tipo_documentoWhereInput[]
    descricao?: StringNullableFilter<"tipo_documento"> | string | null
    profissional_saude?: Profissional_saudeListRelationFilter
  }, "id" | "nome">

  export type tipo_documentoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    _count?: tipo_documentoCountOrderByAggregateInput
    _max?: tipo_documentoMaxOrderByAggregateInput
    _min?: tipo_documentoMinOrderByAggregateInput
  }

  export type tipo_documentoScalarWhereWithAggregatesInput = {
    AND?: tipo_documentoScalarWhereWithAggregatesInput | tipo_documentoScalarWhereWithAggregatesInput[]
    OR?: tipo_documentoScalarWhereWithAggregatesInput[]
    NOT?: tipo_documentoScalarWhereWithAggregatesInput | tipo_documentoScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"tipo_documento"> | string
    nome?: StringWithAggregatesFilter<"tipo_documento"> | string
    descricao?: StringNullableWithAggregatesFilter<"tipo_documento"> | string | null
  }

  export type especialidadeWhereInput = {
    AND?: especialidadeWhereInput | especialidadeWhereInput[]
    OR?: especialidadeWhereInput[]
    NOT?: especialidadeWhereInput | especialidadeWhereInput[]
    id?: UuidFilter<"especialidade"> | string
    nome?: StringFilter<"especialidade"> | string
    descricao?: StringNullableFilter<"especialidade"> | string | null
    profissional_saude?: Profissional_saudeListRelationFilter
  }

  export type especialidadeOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    profissional_saude?: profissional_saudeOrderByRelationAggregateInput
  }

  export type especialidadeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nome?: string
    AND?: especialidadeWhereInput | especialidadeWhereInput[]
    OR?: especialidadeWhereInput[]
    NOT?: especialidadeWhereInput | especialidadeWhereInput[]
    descricao?: StringNullableFilter<"especialidade"> | string | null
    profissional_saude?: Profissional_saudeListRelationFilter
  }, "id" | "nome">

  export type especialidadeOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrderInput | SortOrder
    _count?: especialidadeCountOrderByAggregateInput
    _max?: especialidadeMaxOrderByAggregateInput
    _min?: especialidadeMinOrderByAggregateInput
  }

  export type especialidadeScalarWhereWithAggregatesInput = {
    AND?: especialidadeScalarWhereWithAggregatesInput | especialidadeScalarWhereWithAggregatesInput[]
    OR?: especialidadeScalarWhereWithAggregatesInput[]
    NOT?: especialidadeScalarWhereWithAggregatesInput | especialidadeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"especialidade"> | string
    nome?: StringWithAggregatesFilter<"especialidade"> | string
    descricao?: StringNullableWithAggregatesFilter<"especialidade"> | string | null
  }

  export type consultaWhereInput = {
    AND?: consultaWhereInput | consultaWhereInput[]
    OR?: consultaWhereInput[]
    NOT?: consultaWhereInput | consultaWhereInput[]
    id?: UuidFilter<"consulta"> | string
    paciente_id?: UuidNullableFilter<"consulta"> | string | null
    profissional_id?: UuidNullableFilter<"consulta"> | string | null
    unidade_id?: UuidNullableFilter<"consulta"> | string | null
    data?: DateTimeFilter<"consulta"> | Date | string
    sintomas?: StringNullableFilter<"consulta"> | string | null
    diagnostico?: StringNullableFilter<"consulta"> | string | null
    conduta?: StringNullableFilter<"consulta"> | string | null
    paciente?: XOR<PacienteNullableScalarRelationFilter, pacienteWhereInput> | null
    profissional_saude?: XOR<Profissional_saudeNullableScalarRelationFilter, profissional_saudeWhereInput> | null
    unidade_saude?: XOR<Unidade_saudeNullableScalarRelationFilter, unidade_saudeWhereInput> | null
    prescricao?: PrescricaoListRelationFilter
  }

  export type consultaOrderByWithRelationInput = {
    id?: SortOrder
    paciente_id?: SortOrderInput | SortOrder
    profissional_id?: SortOrderInput | SortOrder
    unidade_id?: SortOrderInput | SortOrder
    data?: SortOrder
    sintomas?: SortOrderInput | SortOrder
    diagnostico?: SortOrderInput | SortOrder
    conduta?: SortOrderInput | SortOrder
    paciente?: pacienteOrderByWithRelationInput
    profissional_saude?: profissional_saudeOrderByWithRelationInput
    unidade_saude?: unidade_saudeOrderByWithRelationInput
    prescricao?: prescricaoOrderByRelationAggregateInput
  }

  export type consultaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: consultaWhereInput | consultaWhereInput[]
    OR?: consultaWhereInput[]
    NOT?: consultaWhereInput | consultaWhereInput[]
    paciente_id?: UuidNullableFilter<"consulta"> | string | null
    profissional_id?: UuidNullableFilter<"consulta"> | string | null
    unidade_id?: UuidNullableFilter<"consulta"> | string | null
    data?: DateTimeFilter<"consulta"> | Date | string
    sintomas?: StringNullableFilter<"consulta"> | string | null
    diagnostico?: StringNullableFilter<"consulta"> | string | null
    conduta?: StringNullableFilter<"consulta"> | string | null
    paciente?: XOR<PacienteNullableScalarRelationFilter, pacienteWhereInput> | null
    profissional_saude?: XOR<Profissional_saudeNullableScalarRelationFilter, profissional_saudeWhereInput> | null
    unidade_saude?: XOR<Unidade_saudeNullableScalarRelationFilter, unidade_saudeWhereInput> | null
    prescricao?: PrescricaoListRelationFilter
  }, "id">

  export type consultaOrderByWithAggregationInput = {
    id?: SortOrder
    paciente_id?: SortOrderInput | SortOrder
    profissional_id?: SortOrderInput | SortOrder
    unidade_id?: SortOrderInput | SortOrder
    data?: SortOrder
    sintomas?: SortOrderInput | SortOrder
    diagnostico?: SortOrderInput | SortOrder
    conduta?: SortOrderInput | SortOrder
    _count?: consultaCountOrderByAggregateInput
    _max?: consultaMaxOrderByAggregateInput
    _min?: consultaMinOrderByAggregateInput
  }

  export type consultaScalarWhereWithAggregatesInput = {
    AND?: consultaScalarWhereWithAggregatesInput | consultaScalarWhereWithAggregatesInput[]
    OR?: consultaScalarWhereWithAggregatesInput[]
    NOT?: consultaScalarWhereWithAggregatesInput | consultaScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"consulta"> | string
    paciente_id?: UuidNullableWithAggregatesFilter<"consulta"> | string | null
    profissional_id?: UuidNullableWithAggregatesFilter<"consulta"> | string | null
    unidade_id?: UuidNullableWithAggregatesFilter<"consulta"> | string | null
    data?: DateTimeWithAggregatesFilter<"consulta"> | Date | string
    sintomas?: StringNullableWithAggregatesFilter<"consulta"> | string | null
    diagnostico?: StringNullableWithAggregatesFilter<"consulta"> | string | null
    conduta?: StringNullableWithAggregatesFilter<"consulta"> | string | null
  }

  export type pacienteWhereInput = {
    AND?: pacienteWhereInput | pacienteWhereInput[]
    OR?: pacienteWhereInput[]
    NOT?: pacienteWhereInput | pacienteWhereInput[]
    id?: UuidFilter<"paciente"> | string
    nome?: StringFilter<"paciente"> | string
    data_nascimento?: DateTimeFilter<"paciente"> | Date | string
    sexo?: StringNullableFilter<"paciente"> | string | null
    cpf?: StringNullableFilter<"paciente"> | string | null
    telefone?: StringNullableFilter<"paciente"> | string | null
    email?: StringNullableFilter<"paciente"> | string | null
    consulta?: ConsultaListRelationFilter
  }

  export type pacienteOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    data_nascimento?: SortOrder
    sexo?: SortOrderInput | SortOrder
    cpf?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    consulta?: consultaOrderByRelationAggregateInput
  }

  export type pacienteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cpf?: string
    AND?: pacienteWhereInput | pacienteWhereInput[]
    OR?: pacienteWhereInput[]
    NOT?: pacienteWhereInput | pacienteWhereInput[]
    nome?: StringFilter<"paciente"> | string
    data_nascimento?: DateTimeFilter<"paciente"> | Date | string
    sexo?: StringNullableFilter<"paciente"> | string | null
    telefone?: StringNullableFilter<"paciente"> | string | null
    email?: StringNullableFilter<"paciente"> | string | null
    consulta?: ConsultaListRelationFilter
  }, "id" | "cpf">

  export type pacienteOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    data_nascimento?: SortOrder
    sexo?: SortOrderInput | SortOrder
    cpf?: SortOrderInput | SortOrder
    telefone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    _count?: pacienteCountOrderByAggregateInput
    _max?: pacienteMaxOrderByAggregateInput
    _min?: pacienteMinOrderByAggregateInput
  }

  export type pacienteScalarWhereWithAggregatesInput = {
    AND?: pacienteScalarWhereWithAggregatesInput | pacienteScalarWhereWithAggregatesInput[]
    OR?: pacienteScalarWhereWithAggregatesInput[]
    NOT?: pacienteScalarWhereWithAggregatesInput | pacienteScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"paciente"> | string
    nome?: StringWithAggregatesFilter<"paciente"> | string
    data_nascimento?: DateTimeWithAggregatesFilter<"paciente"> | Date | string
    sexo?: StringNullableWithAggregatesFilter<"paciente"> | string | null
    cpf?: StringNullableWithAggregatesFilter<"paciente"> | string | null
    telefone?: StringNullableWithAggregatesFilter<"paciente"> | string | null
    email?: StringNullableWithAggregatesFilter<"paciente"> | string | null
  }

  export type prescricaoWhereInput = {
    AND?: prescricaoWhereInput | prescricaoWhereInput[]
    OR?: prescricaoWhereInput[]
    NOT?: prescricaoWhereInput | prescricaoWhereInput[]
    id?: UuidFilter<"prescricao"> | string
    consulta_id?: UuidNullableFilter<"prescricao"> | string | null
    medicamento?: StringFilter<"prescricao"> | string
    posologia?: StringNullableFilter<"prescricao"> | string | null
    duracao?: StringNullableFilter<"prescricao"> | string | null
    consulta?: XOR<ConsultaNullableScalarRelationFilter, consultaWhereInput> | null
  }

  export type prescricaoOrderByWithRelationInput = {
    id?: SortOrder
    consulta_id?: SortOrderInput | SortOrder
    medicamento?: SortOrder
    posologia?: SortOrderInput | SortOrder
    duracao?: SortOrderInput | SortOrder
    consulta?: consultaOrderByWithRelationInput
  }

  export type prescricaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: prescricaoWhereInput | prescricaoWhereInput[]
    OR?: prescricaoWhereInput[]
    NOT?: prescricaoWhereInput | prescricaoWhereInput[]
    consulta_id?: UuidNullableFilter<"prescricao"> | string | null
    medicamento?: StringFilter<"prescricao"> | string
    posologia?: StringNullableFilter<"prescricao"> | string | null
    duracao?: StringNullableFilter<"prescricao"> | string | null
    consulta?: XOR<ConsultaNullableScalarRelationFilter, consultaWhereInput> | null
  }, "id">

  export type prescricaoOrderByWithAggregationInput = {
    id?: SortOrder
    consulta_id?: SortOrderInput | SortOrder
    medicamento?: SortOrder
    posologia?: SortOrderInput | SortOrder
    duracao?: SortOrderInput | SortOrder
    _count?: prescricaoCountOrderByAggregateInput
    _max?: prescricaoMaxOrderByAggregateInput
    _min?: prescricaoMinOrderByAggregateInput
  }

  export type prescricaoScalarWhereWithAggregatesInput = {
    AND?: prescricaoScalarWhereWithAggregatesInput | prescricaoScalarWhereWithAggregatesInput[]
    OR?: prescricaoScalarWhereWithAggregatesInput[]
    NOT?: prescricaoScalarWhereWithAggregatesInput | prescricaoScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"prescricao"> | string
    consulta_id?: UuidNullableWithAggregatesFilter<"prescricao"> | string | null
    medicamento?: StringWithAggregatesFilter<"prescricao"> | string
    posologia?: StringNullableWithAggregatesFilter<"prescricao"> | string | null
    duracao?: StringNullableWithAggregatesFilter<"prescricao"> | string | null
  }

  export type profissional_saudeWhereInput = {
    AND?: profissional_saudeWhereInput | profissional_saudeWhereInput[]
    OR?: profissional_saudeWhereInput[]
    NOT?: profissional_saudeWhereInput | profissional_saudeWhereInput[]
    id?: UuidFilter<"profissional_saude"> | string
    nome?: StringFilter<"profissional_saude"> | string
    documento_numero?: StringNullableFilter<"profissional_saude"> | string | null
    tipo_documento_id?: UuidNullableFilter<"profissional_saude"> | string | null
    especialidade_id?: UuidNullableFilter<"profissional_saude"> | string | null
    email?: StringNullableFilter<"profissional_saude"> | string | null
    senha?: StringFilter<"profissional_saude"> | string
    data_nascimento?: DateTimeNullableFilter<"profissional_saude"> | Date | string | null
    consulta?: ConsultaListRelationFilter
    tipo_documento?: XOR<Tipo_documentoNullableScalarRelationFilter, tipo_documentoWhereInput> | null
    especialidade?: XOR<EspecialidadeNullableScalarRelationFilter, especialidadeWhereInput> | null
  }

  export type profissional_saudeOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    documento_numero?: SortOrderInput | SortOrder
    tipo_documento_id?: SortOrderInput | SortOrder
    especialidade_id?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    senha?: SortOrder
    data_nascimento?: SortOrderInput | SortOrder
    consulta?: consultaOrderByRelationAggregateInput
    tipo_documento?: tipo_documentoOrderByWithRelationInput
    especialidade?: especialidadeOrderByWithRelationInput
  }

  export type profissional_saudeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: profissional_saudeWhereInput | profissional_saudeWhereInput[]
    OR?: profissional_saudeWhereInput[]
    NOT?: profissional_saudeWhereInput | profissional_saudeWhereInput[]
    nome?: StringFilter<"profissional_saude"> | string
    documento_numero?: StringNullableFilter<"profissional_saude"> | string | null
    tipo_documento_id?: UuidNullableFilter<"profissional_saude"> | string | null
    especialidade_id?: UuidNullableFilter<"profissional_saude"> | string | null
    senha?: StringFilter<"profissional_saude"> | string
    data_nascimento?: DateTimeNullableFilter<"profissional_saude"> | Date | string | null
    consulta?: ConsultaListRelationFilter
    tipo_documento?: XOR<Tipo_documentoNullableScalarRelationFilter, tipo_documentoWhereInput> | null
    especialidade?: XOR<EspecialidadeNullableScalarRelationFilter, especialidadeWhereInput> | null
  }, "id" | "email">

  export type profissional_saudeOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    documento_numero?: SortOrderInput | SortOrder
    tipo_documento_id?: SortOrderInput | SortOrder
    especialidade_id?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    senha?: SortOrder
    data_nascimento?: SortOrderInput | SortOrder
    _count?: profissional_saudeCountOrderByAggregateInput
    _max?: profissional_saudeMaxOrderByAggregateInput
    _min?: profissional_saudeMinOrderByAggregateInput
  }

  export type profissional_saudeScalarWhereWithAggregatesInput = {
    AND?: profissional_saudeScalarWhereWithAggregatesInput | profissional_saudeScalarWhereWithAggregatesInput[]
    OR?: profissional_saudeScalarWhereWithAggregatesInput[]
    NOT?: profissional_saudeScalarWhereWithAggregatesInput | profissional_saudeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"profissional_saude"> | string
    nome?: StringWithAggregatesFilter<"profissional_saude"> | string
    documento_numero?: StringNullableWithAggregatesFilter<"profissional_saude"> | string | null
    tipo_documento_id?: UuidNullableWithAggregatesFilter<"profissional_saude"> | string | null
    especialidade_id?: UuidNullableWithAggregatesFilter<"profissional_saude"> | string | null
    email?: StringNullableWithAggregatesFilter<"profissional_saude"> | string | null
    senha?: StringWithAggregatesFilter<"profissional_saude"> | string
    data_nascimento?: DateTimeNullableWithAggregatesFilter<"profissional_saude"> | Date | string | null
  }

  export type templateWhereInput = {
    AND?: templateWhereInput | templateWhereInput[]
    OR?: templateWhereInput[]
    NOT?: templateWhereInput | templateWhereInput[]
    id?: UuidFilter<"template"> | string
    titulo?: StringFilter<"template"> | string
    sintomas_padrao?: StringNullableFilter<"template"> | string | null
    condutas_sugeridas?: StringNullableFilter<"template"> | string | null
    sazonalidade?: StringNullableFilter<"template"> | string | null
  }

  export type templateOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    sintomas_padrao?: SortOrderInput | SortOrder
    condutas_sugeridas?: SortOrderInput | SortOrder
    sazonalidade?: SortOrderInput | SortOrder
  }

  export type templateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: templateWhereInput | templateWhereInput[]
    OR?: templateWhereInput[]
    NOT?: templateWhereInput | templateWhereInput[]
    titulo?: StringFilter<"template"> | string
    sintomas_padrao?: StringNullableFilter<"template"> | string | null
    condutas_sugeridas?: StringNullableFilter<"template"> | string | null
    sazonalidade?: StringNullableFilter<"template"> | string | null
  }, "id">

  export type templateOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    sintomas_padrao?: SortOrderInput | SortOrder
    condutas_sugeridas?: SortOrderInput | SortOrder
    sazonalidade?: SortOrderInput | SortOrder
    _count?: templateCountOrderByAggregateInput
    _max?: templateMaxOrderByAggregateInput
    _min?: templateMinOrderByAggregateInput
  }

  export type templateScalarWhereWithAggregatesInput = {
    AND?: templateScalarWhereWithAggregatesInput | templateScalarWhereWithAggregatesInput[]
    OR?: templateScalarWhereWithAggregatesInput[]
    NOT?: templateScalarWhereWithAggregatesInput | templateScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"template"> | string
    titulo?: StringWithAggregatesFilter<"template"> | string
    sintomas_padrao?: StringNullableWithAggregatesFilter<"template"> | string | null
    condutas_sugeridas?: StringNullableWithAggregatesFilter<"template"> | string | null
    sazonalidade?: StringNullableWithAggregatesFilter<"template"> | string | null
  }

  export type unidade_saudeWhereInput = {
    AND?: unidade_saudeWhereInput | unidade_saudeWhereInput[]
    OR?: unidade_saudeWhereInput[]
    NOT?: unidade_saudeWhereInput | unidade_saudeWhereInput[]
    id?: UuidFilter<"unidade_saude"> | string
    nome?: StringFilter<"unidade_saude"> | string
    cnes?: StringNullableFilter<"unidade_saude"> | string | null
    endereco?: StringNullableFilter<"unidade_saude"> | string | null
    cidade?: StringNullableFilter<"unidade_saude"> | string | null
    estado?: StringNullableFilter<"unidade_saude"> | string | null
    consulta?: ConsultaListRelationFilter
  }

  export type unidade_saudeOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    cnes?: SortOrderInput | SortOrder
    endereco?: SortOrderInput | SortOrder
    cidade?: SortOrderInput | SortOrder
    estado?: SortOrderInput | SortOrder
    consulta?: consultaOrderByRelationAggregateInput
  }

  export type unidade_saudeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cnes?: string
    AND?: unidade_saudeWhereInput | unidade_saudeWhereInput[]
    OR?: unidade_saudeWhereInput[]
    NOT?: unidade_saudeWhereInput | unidade_saudeWhereInput[]
    nome?: StringFilter<"unidade_saude"> | string
    endereco?: StringNullableFilter<"unidade_saude"> | string | null
    cidade?: StringNullableFilter<"unidade_saude"> | string | null
    estado?: StringNullableFilter<"unidade_saude"> | string | null
    consulta?: ConsultaListRelationFilter
  }, "id" | "cnes">

  export type unidade_saudeOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    cnes?: SortOrderInput | SortOrder
    endereco?: SortOrderInput | SortOrder
    cidade?: SortOrderInput | SortOrder
    estado?: SortOrderInput | SortOrder
    _count?: unidade_saudeCountOrderByAggregateInput
    _max?: unidade_saudeMaxOrderByAggregateInput
    _min?: unidade_saudeMinOrderByAggregateInput
  }

  export type unidade_saudeScalarWhereWithAggregatesInput = {
    AND?: unidade_saudeScalarWhereWithAggregatesInput | unidade_saudeScalarWhereWithAggregatesInput[]
    OR?: unidade_saudeScalarWhereWithAggregatesInput[]
    NOT?: unidade_saudeScalarWhereWithAggregatesInput | unidade_saudeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"unidade_saude"> | string
    nome?: StringWithAggregatesFilter<"unidade_saude"> | string
    cnes?: StringNullableWithAggregatesFilter<"unidade_saude"> | string | null
    endereco?: StringNullableWithAggregatesFilter<"unidade_saude"> | string | null
    cidade?: StringNullableWithAggregatesFilter<"unidade_saude"> | string | null
    estado?: StringNullableWithAggregatesFilter<"unidade_saude"> | string | null
  }

  export type tipo_documentoCreateInput = {
    id?: string
    nome: string
    descricao?: string | null
    profissional_saude?: profissional_saudeCreateNestedManyWithoutTipo_documentoInput
  }

  export type tipo_documentoUncheckedCreateInput = {
    id?: string
    nome: string
    descricao?: string | null
    profissional_saude?: profissional_saudeUncheckedCreateNestedManyWithoutTipo_documentoInput
  }

  export type tipo_documentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    profissional_saude?: profissional_saudeUpdateManyWithoutTipo_documentoNestedInput
  }

  export type tipo_documentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    profissional_saude?: profissional_saudeUncheckedUpdateManyWithoutTipo_documentoNestedInput
  }

  export type tipo_documentoCreateManyInput = {
    id?: string
    nome: string
    descricao?: string | null
  }

  export type tipo_documentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tipo_documentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type especialidadeCreateInput = {
    id?: string
    nome: string
    descricao?: string | null
    profissional_saude?: profissional_saudeCreateNestedManyWithoutEspecialidadeInput
  }

  export type especialidadeUncheckedCreateInput = {
    id?: string
    nome: string
    descricao?: string | null
    profissional_saude?: profissional_saudeUncheckedCreateNestedManyWithoutEspecialidadeInput
  }

  export type especialidadeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    profissional_saude?: profissional_saudeUpdateManyWithoutEspecialidadeNestedInput
  }

  export type especialidadeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    profissional_saude?: profissional_saudeUncheckedUpdateManyWithoutEspecialidadeNestedInput
  }

  export type especialidadeCreateManyInput = {
    id?: string
    nome: string
    descricao?: string | null
  }

  export type especialidadeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type especialidadeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type consultaCreateInput = {
    id?: string
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
    paciente?: pacienteCreateNestedOneWithoutConsultaInput
    profissional_saude?: profissional_saudeCreateNestedOneWithoutConsultaInput
    unidade_saude?: unidade_saudeCreateNestedOneWithoutConsultaInput
    prescricao?: prescricaoCreateNestedManyWithoutConsultaInput
  }

  export type consultaUncheckedCreateInput = {
    id?: string
    paciente_id?: string | null
    profissional_id?: string | null
    unidade_id?: string | null
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
    prescricao?: prescricaoUncheckedCreateNestedManyWithoutConsultaInput
  }

  export type consultaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
    paciente?: pacienteUpdateOneWithoutConsultaNestedInput
    profissional_saude?: profissional_saudeUpdateOneWithoutConsultaNestedInput
    unidade_saude?: unidade_saudeUpdateOneWithoutConsultaNestedInput
    prescricao?: prescricaoUpdateManyWithoutConsultaNestedInput
  }

  export type consultaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paciente_id?: NullableStringFieldUpdateOperationsInput | string | null
    profissional_id?: NullableStringFieldUpdateOperationsInput | string | null
    unidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
    prescricao?: prescricaoUncheckedUpdateManyWithoutConsultaNestedInput
  }

  export type consultaCreateManyInput = {
    id?: string
    paciente_id?: string | null
    profissional_id?: string | null
    unidade_id?: string | null
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
  }

  export type consultaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type consultaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paciente_id?: NullableStringFieldUpdateOperationsInput | string | null
    profissional_id?: NullableStringFieldUpdateOperationsInput | string | null
    unidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pacienteCreateInput = {
    id?: string
    nome: string
    data_nascimento: Date | string
    sexo?: string | null
    cpf?: string | null
    telefone?: string | null
    email?: string | null
    consulta?: consultaCreateNestedManyWithoutPacienteInput
  }

  export type pacienteUncheckedCreateInput = {
    id?: string
    nome: string
    data_nascimento: Date | string
    sexo?: string | null
    cpf?: string | null
    telefone?: string | null
    email?: string | null
    consulta?: consultaUncheckedCreateNestedManyWithoutPacienteInput
  }

  export type pacienteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    sexo?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    consulta?: consultaUpdateManyWithoutPacienteNestedInput
  }

  export type pacienteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    sexo?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    consulta?: consultaUncheckedUpdateManyWithoutPacienteNestedInput
  }

  export type pacienteCreateManyInput = {
    id?: string
    nome: string
    data_nascimento: Date | string
    sexo?: string | null
    cpf?: string | null
    telefone?: string | null
    email?: string | null
  }

  export type pacienteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    sexo?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pacienteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    sexo?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type prescricaoCreateInput = {
    id?: string
    medicamento: string
    posologia?: string | null
    duracao?: string | null
    consulta?: consultaCreateNestedOneWithoutPrescricaoInput
  }

  export type prescricaoUncheckedCreateInput = {
    id?: string
    consulta_id?: string | null
    medicamento: string
    posologia?: string | null
    duracao?: string | null
  }

  export type prescricaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    posologia?: NullableStringFieldUpdateOperationsInput | string | null
    duracao?: NullableStringFieldUpdateOperationsInput | string | null
    consulta?: consultaUpdateOneWithoutPrescricaoNestedInput
  }

  export type prescricaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    consulta_id?: NullableStringFieldUpdateOperationsInput | string | null
    medicamento?: StringFieldUpdateOperationsInput | string
    posologia?: NullableStringFieldUpdateOperationsInput | string | null
    duracao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type prescricaoCreateManyInput = {
    id?: string
    consulta_id?: string | null
    medicamento: string
    posologia?: string | null
    duracao?: string | null
  }

  export type prescricaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    posologia?: NullableStringFieldUpdateOperationsInput | string | null
    duracao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type prescricaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    consulta_id?: NullableStringFieldUpdateOperationsInput | string | null
    medicamento?: StringFieldUpdateOperationsInput | string
    posologia?: NullableStringFieldUpdateOperationsInput | string | null
    duracao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type profissional_saudeCreateInput = {
    id?: string
    nome: string
    documento_numero?: string | null
    email?: string | null
    senha: string
    data_nascimento?: Date | string | null
    consulta?: consultaCreateNestedManyWithoutProfissional_saudeInput
    tipo_documento?: tipo_documentoCreateNestedOneWithoutProfissional_saudeInput
    especialidade?: especialidadeCreateNestedOneWithoutProfissional_saudeInput
  }

  export type profissional_saudeUncheckedCreateInput = {
    id?: string
    nome: string
    documento_numero?: string | null
    tipo_documento_id?: string | null
    especialidade_id?: string | null
    email?: string | null
    senha: string
    data_nascimento?: Date | string | null
    consulta?: consultaUncheckedCreateNestedManyWithoutProfissional_saudeInput
  }

  export type profissional_saudeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consulta?: consultaUpdateManyWithoutProfissional_saudeNestedInput
    tipo_documento?: tipo_documentoUpdateOneWithoutProfissional_saudeNestedInput
    especialidade?: especialidadeUpdateOneWithoutProfissional_saudeNestedInput
  }

  export type profissional_saudeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento_id?: NullableStringFieldUpdateOperationsInput | string | null
    especialidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consulta?: consultaUncheckedUpdateManyWithoutProfissional_saudeNestedInput
  }

  export type profissional_saudeCreateManyInput = {
    id?: string
    nome: string
    documento_numero?: string | null
    tipo_documento_id?: string | null
    especialidade_id?: string | null
    email?: string | null
    senha: string
    data_nascimento?: Date | string | null
  }

  export type profissional_saudeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type profissional_saudeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento_id?: NullableStringFieldUpdateOperationsInput | string | null
    especialidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type templateCreateInput = {
    id?: string
    titulo: string
    sintomas_padrao?: string | null
    condutas_sugeridas?: string | null
    sazonalidade?: string | null
  }

  export type templateUncheckedCreateInput = {
    id?: string
    titulo: string
    sintomas_padrao?: string | null
    condutas_sugeridas?: string | null
    sazonalidade?: string | null
  }

  export type templateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    sintomas_padrao?: NullableStringFieldUpdateOperationsInput | string | null
    condutas_sugeridas?: NullableStringFieldUpdateOperationsInput | string | null
    sazonalidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type templateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    sintomas_padrao?: NullableStringFieldUpdateOperationsInput | string | null
    condutas_sugeridas?: NullableStringFieldUpdateOperationsInput | string | null
    sazonalidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type templateCreateManyInput = {
    id?: string
    titulo: string
    sintomas_padrao?: string | null
    condutas_sugeridas?: string | null
    sazonalidade?: string | null
  }

  export type templateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    sintomas_padrao?: NullableStringFieldUpdateOperationsInput | string | null
    condutas_sugeridas?: NullableStringFieldUpdateOperationsInput | string | null
    sazonalidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type templateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    sintomas_padrao?: NullableStringFieldUpdateOperationsInput | string | null
    condutas_sugeridas?: NullableStringFieldUpdateOperationsInput | string | null
    sazonalidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type unidade_saudeCreateInput = {
    id?: string
    nome: string
    cnes?: string | null
    endereco?: string | null
    cidade?: string | null
    estado?: string | null
    consulta?: consultaCreateNestedManyWithoutUnidade_saudeInput
  }

  export type unidade_saudeUncheckedCreateInput = {
    id?: string
    nome: string
    cnes?: string | null
    endereco?: string | null
    cidade?: string | null
    estado?: string | null
    consulta?: consultaUncheckedCreateNestedManyWithoutUnidade_saudeInput
  }

  export type unidade_saudeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnes?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    consulta?: consultaUpdateManyWithoutUnidade_saudeNestedInput
  }

  export type unidade_saudeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnes?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    consulta?: consultaUncheckedUpdateManyWithoutUnidade_saudeNestedInput
  }

  export type unidade_saudeCreateManyInput = {
    id?: string
    nome: string
    cnes?: string | null
    endereco?: string | null
    cidade?: string | null
    estado?: string | null
  }

  export type unidade_saudeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnes?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type unidade_saudeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnes?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Profissional_saudeListRelationFilter = {
    every?: profissional_saudeWhereInput
    some?: profissional_saudeWhereInput
    none?: profissional_saudeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type profissional_saudeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tipo_documentoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type tipo_documentoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type tipo_documentoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type especialidadeCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type especialidadeMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type especialidadeMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    descricao?: SortOrder
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PacienteNullableScalarRelationFilter = {
    is?: pacienteWhereInput | null
    isNot?: pacienteWhereInput | null
  }

  export type Profissional_saudeNullableScalarRelationFilter = {
    is?: profissional_saudeWhereInput | null
    isNot?: profissional_saudeWhereInput | null
  }

  export type Unidade_saudeNullableScalarRelationFilter = {
    is?: unidade_saudeWhereInput | null
    isNot?: unidade_saudeWhereInput | null
  }

  export type PrescricaoListRelationFilter = {
    every?: prescricaoWhereInput
    some?: prescricaoWhereInput
    none?: prescricaoWhereInput
  }

  export type prescricaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type consultaCountOrderByAggregateInput = {
    id?: SortOrder
    paciente_id?: SortOrder
    profissional_id?: SortOrder
    unidade_id?: SortOrder
    data?: SortOrder
    sintomas?: SortOrder
    diagnostico?: SortOrder
    conduta?: SortOrder
  }

  export type consultaMaxOrderByAggregateInput = {
    id?: SortOrder
    paciente_id?: SortOrder
    profissional_id?: SortOrder
    unidade_id?: SortOrder
    data?: SortOrder
    sintomas?: SortOrder
    diagnostico?: SortOrder
    conduta?: SortOrder
  }

  export type consultaMinOrderByAggregateInput = {
    id?: SortOrder
    paciente_id?: SortOrder
    profissional_id?: SortOrder
    unidade_id?: SortOrder
    data?: SortOrder
    sintomas?: SortOrder
    diagnostico?: SortOrder
    conduta?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ConsultaListRelationFilter = {
    every?: consultaWhereInput
    some?: consultaWhereInput
    none?: consultaWhereInput
  }

  export type consultaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type pacienteCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    data_nascimento?: SortOrder
    sexo?: SortOrder
    cpf?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
  }

  export type pacienteMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    data_nascimento?: SortOrder
    sexo?: SortOrder
    cpf?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
  }

  export type pacienteMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    data_nascimento?: SortOrder
    sexo?: SortOrder
    cpf?: SortOrder
    telefone?: SortOrder
    email?: SortOrder
  }

  export type ConsultaNullableScalarRelationFilter = {
    is?: consultaWhereInput | null
    isNot?: consultaWhereInput | null
  }

  export type prescricaoCountOrderByAggregateInput = {
    id?: SortOrder
    consulta_id?: SortOrder
    medicamento?: SortOrder
    posologia?: SortOrder
    duracao?: SortOrder
  }

  export type prescricaoMaxOrderByAggregateInput = {
    id?: SortOrder
    consulta_id?: SortOrder
    medicamento?: SortOrder
    posologia?: SortOrder
    duracao?: SortOrder
  }

  export type prescricaoMinOrderByAggregateInput = {
    id?: SortOrder
    consulta_id?: SortOrder
    medicamento?: SortOrder
    posologia?: SortOrder
    duracao?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type Tipo_documentoNullableScalarRelationFilter = {
    is?: tipo_documentoWhereInput | null
    isNot?: tipo_documentoWhereInput | null
  }

  export type EspecialidadeNullableScalarRelationFilter = {
    is?: especialidadeWhereInput | null
    isNot?: especialidadeWhereInput | null
  }

  export type profissional_saudeCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    documento_numero?: SortOrder
    tipo_documento_id?: SortOrder
    especialidade_id?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    data_nascimento?: SortOrder
  }

  export type profissional_saudeMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    documento_numero?: SortOrder
    tipo_documento_id?: SortOrder
    especialidade_id?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    data_nascimento?: SortOrder
  }

  export type profissional_saudeMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    documento_numero?: SortOrder
    tipo_documento_id?: SortOrder
    especialidade_id?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    data_nascimento?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type templateCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    sintomas_padrao?: SortOrder
    condutas_sugeridas?: SortOrder
    sazonalidade?: SortOrder
  }

  export type templateMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    sintomas_padrao?: SortOrder
    condutas_sugeridas?: SortOrder
    sazonalidade?: SortOrder
  }

  export type templateMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    sintomas_padrao?: SortOrder
    condutas_sugeridas?: SortOrder
    sazonalidade?: SortOrder
  }

  export type unidade_saudeCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnes?: SortOrder
    endereco?: SortOrder
    cidade?: SortOrder
    estado?: SortOrder
  }

  export type unidade_saudeMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnes?: SortOrder
    endereco?: SortOrder
    cidade?: SortOrder
    estado?: SortOrder
  }

  export type unidade_saudeMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnes?: SortOrder
    endereco?: SortOrder
    cidade?: SortOrder
    estado?: SortOrder
  }

  export type profissional_saudeCreateNestedManyWithoutTipo_documentoInput = {
    create?: XOR<profissional_saudeCreateWithoutTipo_documentoInput, profissional_saudeUncheckedCreateWithoutTipo_documentoInput> | profissional_saudeCreateWithoutTipo_documentoInput[] | profissional_saudeUncheckedCreateWithoutTipo_documentoInput[]
    connectOrCreate?: profissional_saudeCreateOrConnectWithoutTipo_documentoInput | profissional_saudeCreateOrConnectWithoutTipo_documentoInput[]
    createMany?: profissional_saudeCreateManyTipo_documentoInputEnvelope
    connect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
  }

  export type profissional_saudeUncheckedCreateNestedManyWithoutTipo_documentoInput = {
    create?: XOR<profissional_saudeCreateWithoutTipo_documentoInput, profissional_saudeUncheckedCreateWithoutTipo_documentoInput> | profissional_saudeCreateWithoutTipo_documentoInput[] | profissional_saudeUncheckedCreateWithoutTipo_documentoInput[]
    connectOrCreate?: profissional_saudeCreateOrConnectWithoutTipo_documentoInput | profissional_saudeCreateOrConnectWithoutTipo_documentoInput[]
    createMany?: profissional_saudeCreateManyTipo_documentoInputEnvelope
    connect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type profissional_saudeUpdateManyWithoutTipo_documentoNestedInput = {
    create?: XOR<profissional_saudeCreateWithoutTipo_documentoInput, profissional_saudeUncheckedCreateWithoutTipo_documentoInput> | profissional_saudeCreateWithoutTipo_documentoInput[] | profissional_saudeUncheckedCreateWithoutTipo_documentoInput[]
    connectOrCreate?: profissional_saudeCreateOrConnectWithoutTipo_documentoInput | profissional_saudeCreateOrConnectWithoutTipo_documentoInput[]
    upsert?: profissional_saudeUpsertWithWhereUniqueWithoutTipo_documentoInput | profissional_saudeUpsertWithWhereUniqueWithoutTipo_documentoInput[]
    createMany?: profissional_saudeCreateManyTipo_documentoInputEnvelope
    set?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    disconnect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    delete?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    connect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    update?: profissional_saudeUpdateWithWhereUniqueWithoutTipo_documentoInput | profissional_saudeUpdateWithWhereUniqueWithoutTipo_documentoInput[]
    updateMany?: profissional_saudeUpdateManyWithWhereWithoutTipo_documentoInput | profissional_saudeUpdateManyWithWhereWithoutTipo_documentoInput[]
    deleteMany?: profissional_saudeScalarWhereInput | profissional_saudeScalarWhereInput[]
  }

  export type profissional_saudeUncheckedUpdateManyWithoutTipo_documentoNestedInput = {
    create?: XOR<profissional_saudeCreateWithoutTipo_documentoInput, profissional_saudeUncheckedCreateWithoutTipo_documentoInput> | profissional_saudeCreateWithoutTipo_documentoInput[] | profissional_saudeUncheckedCreateWithoutTipo_documentoInput[]
    connectOrCreate?: profissional_saudeCreateOrConnectWithoutTipo_documentoInput | profissional_saudeCreateOrConnectWithoutTipo_documentoInput[]
    upsert?: profissional_saudeUpsertWithWhereUniqueWithoutTipo_documentoInput | profissional_saudeUpsertWithWhereUniqueWithoutTipo_documentoInput[]
    createMany?: profissional_saudeCreateManyTipo_documentoInputEnvelope
    set?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    disconnect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    delete?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    connect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    update?: profissional_saudeUpdateWithWhereUniqueWithoutTipo_documentoInput | profissional_saudeUpdateWithWhereUniqueWithoutTipo_documentoInput[]
    updateMany?: profissional_saudeUpdateManyWithWhereWithoutTipo_documentoInput | profissional_saudeUpdateManyWithWhereWithoutTipo_documentoInput[]
    deleteMany?: profissional_saudeScalarWhereInput | profissional_saudeScalarWhereInput[]
  }

  export type profissional_saudeCreateNestedManyWithoutEspecialidadeInput = {
    create?: XOR<profissional_saudeCreateWithoutEspecialidadeInput, profissional_saudeUncheckedCreateWithoutEspecialidadeInput> | profissional_saudeCreateWithoutEspecialidadeInput[] | profissional_saudeUncheckedCreateWithoutEspecialidadeInput[]
    connectOrCreate?: profissional_saudeCreateOrConnectWithoutEspecialidadeInput | profissional_saudeCreateOrConnectWithoutEspecialidadeInput[]
    createMany?: profissional_saudeCreateManyEspecialidadeInputEnvelope
    connect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
  }

  export type profissional_saudeUncheckedCreateNestedManyWithoutEspecialidadeInput = {
    create?: XOR<profissional_saudeCreateWithoutEspecialidadeInput, profissional_saudeUncheckedCreateWithoutEspecialidadeInput> | profissional_saudeCreateWithoutEspecialidadeInput[] | profissional_saudeUncheckedCreateWithoutEspecialidadeInput[]
    connectOrCreate?: profissional_saudeCreateOrConnectWithoutEspecialidadeInput | profissional_saudeCreateOrConnectWithoutEspecialidadeInput[]
    createMany?: profissional_saudeCreateManyEspecialidadeInputEnvelope
    connect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
  }

  export type profissional_saudeUpdateManyWithoutEspecialidadeNestedInput = {
    create?: XOR<profissional_saudeCreateWithoutEspecialidadeInput, profissional_saudeUncheckedCreateWithoutEspecialidadeInput> | profissional_saudeCreateWithoutEspecialidadeInput[] | profissional_saudeUncheckedCreateWithoutEspecialidadeInput[]
    connectOrCreate?: profissional_saudeCreateOrConnectWithoutEspecialidadeInput | profissional_saudeCreateOrConnectWithoutEspecialidadeInput[]
    upsert?: profissional_saudeUpsertWithWhereUniqueWithoutEspecialidadeInput | profissional_saudeUpsertWithWhereUniqueWithoutEspecialidadeInput[]
    createMany?: profissional_saudeCreateManyEspecialidadeInputEnvelope
    set?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    disconnect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    delete?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    connect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    update?: profissional_saudeUpdateWithWhereUniqueWithoutEspecialidadeInput | profissional_saudeUpdateWithWhereUniqueWithoutEspecialidadeInput[]
    updateMany?: profissional_saudeUpdateManyWithWhereWithoutEspecialidadeInput | profissional_saudeUpdateManyWithWhereWithoutEspecialidadeInput[]
    deleteMany?: profissional_saudeScalarWhereInput | profissional_saudeScalarWhereInput[]
  }

  export type profissional_saudeUncheckedUpdateManyWithoutEspecialidadeNestedInput = {
    create?: XOR<profissional_saudeCreateWithoutEspecialidadeInput, profissional_saudeUncheckedCreateWithoutEspecialidadeInput> | profissional_saudeCreateWithoutEspecialidadeInput[] | profissional_saudeUncheckedCreateWithoutEspecialidadeInput[]
    connectOrCreate?: profissional_saudeCreateOrConnectWithoutEspecialidadeInput | profissional_saudeCreateOrConnectWithoutEspecialidadeInput[]
    upsert?: profissional_saudeUpsertWithWhereUniqueWithoutEspecialidadeInput | profissional_saudeUpsertWithWhereUniqueWithoutEspecialidadeInput[]
    createMany?: profissional_saudeCreateManyEspecialidadeInputEnvelope
    set?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    disconnect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    delete?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    connect?: profissional_saudeWhereUniqueInput | profissional_saudeWhereUniqueInput[]
    update?: profissional_saudeUpdateWithWhereUniqueWithoutEspecialidadeInput | profissional_saudeUpdateWithWhereUniqueWithoutEspecialidadeInput[]
    updateMany?: profissional_saudeUpdateManyWithWhereWithoutEspecialidadeInput | profissional_saudeUpdateManyWithWhereWithoutEspecialidadeInput[]
    deleteMany?: profissional_saudeScalarWhereInput | profissional_saudeScalarWhereInput[]
  }

  export type pacienteCreateNestedOneWithoutConsultaInput = {
    create?: XOR<pacienteCreateWithoutConsultaInput, pacienteUncheckedCreateWithoutConsultaInput>
    connectOrCreate?: pacienteCreateOrConnectWithoutConsultaInput
    connect?: pacienteWhereUniqueInput
  }

  export type profissional_saudeCreateNestedOneWithoutConsultaInput = {
    create?: XOR<profissional_saudeCreateWithoutConsultaInput, profissional_saudeUncheckedCreateWithoutConsultaInput>
    connectOrCreate?: profissional_saudeCreateOrConnectWithoutConsultaInput
    connect?: profissional_saudeWhereUniqueInput
  }

  export type unidade_saudeCreateNestedOneWithoutConsultaInput = {
    create?: XOR<unidade_saudeCreateWithoutConsultaInput, unidade_saudeUncheckedCreateWithoutConsultaInput>
    connectOrCreate?: unidade_saudeCreateOrConnectWithoutConsultaInput
    connect?: unidade_saudeWhereUniqueInput
  }

  export type prescricaoCreateNestedManyWithoutConsultaInput = {
    create?: XOR<prescricaoCreateWithoutConsultaInput, prescricaoUncheckedCreateWithoutConsultaInput> | prescricaoCreateWithoutConsultaInput[] | prescricaoUncheckedCreateWithoutConsultaInput[]
    connectOrCreate?: prescricaoCreateOrConnectWithoutConsultaInput | prescricaoCreateOrConnectWithoutConsultaInput[]
    createMany?: prescricaoCreateManyConsultaInputEnvelope
    connect?: prescricaoWhereUniqueInput | prescricaoWhereUniqueInput[]
  }

  export type prescricaoUncheckedCreateNestedManyWithoutConsultaInput = {
    create?: XOR<prescricaoCreateWithoutConsultaInput, prescricaoUncheckedCreateWithoutConsultaInput> | prescricaoCreateWithoutConsultaInput[] | prescricaoUncheckedCreateWithoutConsultaInput[]
    connectOrCreate?: prescricaoCreateOrConnectWithoutConsultaInput | prescricaoCreateOrConnectWithoutConsultaInput[]
    createMany?: prescricaoCreateManyConsultaInputEnvelope
    connect?: prescricaoWhereUniqueInput | prescricaoWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type pacienteUpdateOneWithoutConsultaNestedInput = {
    create?: XOR<pacienteCreateWithoutConsultaInput, pacienteUncheckedCreateWithoutConsultaInput>
    connectOrCreate?: pacienteCreateOrConnectWithoutConsultaInput
    upsert?: pacienteUpsertWithoutConsultaInput
    disconnect?: pacienteWhereInput | boolean
    delete?: pacienteWhereInput | boolean
    connect?: pacienteWhereUniqueInput
    update?: XOR<XOR<pacienteUpdateToOneWithWhereWithoutConsultaInput, pacienteUpdateWithoutConsultaInput>, pacienteUncheckedUpdateWithoutConsultaInput>
  }

  export type profissional_saudeUpdateOneWithoutConsultaNestedInput = {
    create?: XOR<profissional_saudeCreateWithoutConsultaInput, profissional_saudeUncheckedCreateWithoutConsultaInput>
    connectOrCreate?: profissional_saudeCreateOrConnectWithoutConsultaInput
    upsert?: profissional_saudeUpsertWithoutConsultaInput
    disconnect?: profissional_saudeWhereInput | boolean
    delete?: profissional_saudeWhereInput | boolean
    connect?: profissional_saudeWhereUniqueInput
    update?: XOR<XOR<profissional_saudeUpdateToOneWithWhereWithoutConsultaInput, profissional_saudeUpdateWithoutConsultaInput>, profissional_saudeUncheckedUpdateWithoutConsultaInput>
  }

  export type unidade_saudeUpdateOneWithoutConsultaNestedInput = {
    create?: XOR<unidade_saudeCreateWithoutConsultaInput, unidade_saudeUncheckedCreateWithoutConsultaInput>
    connectOrCreate?: unidade_saudeCreateOrConnectWithoutConsultaInput
    upsert?: unidade_saudeUpsertWithoutConsultaInput
    disconnect?: unidade_saudeWhereInput | boolean
    delete?: unidade_saudeWhereInput | boolean
    connect?: unidade_saudeWhereUniqueInput
    update?: XOR<XOR<unidade_saudeUpdateToOneWithWhereWithoutConsultaInput, unidade_saudeUpdateWithoutConsultaInput>, unidade_saudeUncheckedUpdateWithoutConsultaInput>
  }

  export type prescricaoUpdateManyWithoutConsultaNestedInput = {
    create?: XOR<prescricaoCreateWithoutConsultaInput, prescricaoUncheckedCreateWithoutConsultaInput> | prescricaoCreateWithoutConsultaInput[] | prescricaoUncheckedCreateWithoutConsultaInput[]
    connectOrCreate?: prescricaoCreateOrConnectWithoutConsultaInput | prescricaoCreateOrConnectWithoutConsultaInput[]
    upsert?: prescricaoUpsertWithWhereUniqueWithoutConsultaInput | prescricaoUpsertWithWhereUniqueWithoutConsultaInput[]
    createMany?: prescricaoCreateManyConsultaInputEnvelope
    set?: prescricaoWhereUniqueInput | prescricaoWhereUniqueInput[]
    disconnect?: prescricaoWhereUniqueInput | prescricaoWhereUniqueInput[]
    delete?: prescricaoWhereUniqueInput | prescricaoWhereUniqueInput[]
    connect?: prescricaoWhereUniqueInput | prescricaoWhereUniqueInput[]
    update?: prescricaoUpdateWithWhereUniqueWithoutConsultaInput | prescricaoUpdateWithWhereUniqueWithoutConsultaInput[]
    updateMany?: prescricaoUpdateManyWithWhereWithoutConsultaInput | prescricaoUpdateManyWithWhereWithoutConsultaInput[]
    deleteMany?: prescricaoScalarWhereInput | prescricaoScalarWhereInput[]
  }

  export type prescricaoUncheckedUpdateManyWithoutConsultaNestedInput = {
    create?: XOR<prescricaoCreateWithoutConsultaInput, prescricaoUncheckedCreateWithoutConsultaInput> | prescricaoCreateWithoutConsultaInput[] | prescricaoUncheckedCreateWithoutConsultaInput[]
    connectOrCreate?: prescricaoCreateOrConnectWithoutConsultaInput | prescricaoCreateOrConnectWithoutConsultaInput[]
    upsert?: prescricaoUpsertWithWhereUniqueWithoutConsultaInput | prescricaoUpsertWithWhereUniqueWithoutConsultaInput[]
    createMany?: prescricaoCreateManyConsultaInputEnvelope
    set?: prescricaoWhereUniqueInput | prescricaoWhereUniqueInput[]
    disconnect?: prescricaoWhereUniqueInput | prescricaoWhereUniqueInput[]
    delete?: prescricaoWhereUniqueInput | prescricaoWhereUniqueInput[]
    connect?: prescricaoWhereUniqueInput | prescricaoWhereUniqueInput[]
    update?: prescricaoUpdateWithWhereUniqueWithoutConsultaInput | prescricaoUpdateWithWhereUniqueWithoutConsultaInput[]
    updateMany?: prescricaoUpdateManyWithWhereWithoutConsultaInput | prescricaoUpdateManyWithWhereWithoutConsultaInput[]
    deleteMany?: prescricaoScalarWhereInput | prescricaoScalarWhereInput[]
  }

  export type consultaCreateNestedManyWithoutPacienteInput = {
    create?: XOR<consultaCreateWithoutPacienteInput, consultaUncheckedCreateWithoutPacienteInput> | consultaCreateWithoutPacienteInput[] | consultaUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutPacienteInput | consultaCreateOrConnectWithoutPacienteInput[]
    createMany?: consultaCreateManyPacienteInputEnvelope
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
  }

  export type consultaUncheckedCreateNestedManyWithoutPacienteInput = {
    create?: XOR<consultaCreateWithoutPacienteInput, consultaUncheckedCreateWithoutPacienteInput> | consultaCreateWithoutPacienteInput[] | consultaUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutPacienteInput | consultaCreateOrConnectWithoutPacienteInput[]
    createMany?: consultaCreateManyPacienteInputEnvelope
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
  }

  export type consultaUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<consultaCreateWithoutPacienteInput, consultaUncheckedCreateWithoutPacienteInput> | consultaCreateWithoutPacienteInput[] | consultaUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutPacienteInput | consultaCreateOrConnectWithoutPacienteInput[]
    upsert?: consultaUpsertWithWhereUniqueWithoutPacienteInput | consultaUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: consultaCreateManyPacienteInputEnvelope
    set?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    disconnect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    delete?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    update?: consultaUpdateWithWhereUniqueWithoutPacienteInput | consultaUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: consultaUpdateManyWithWhereWithoutPacienteInput | consultaUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: consultaScalarWhereInput | consultaScalarWhereInput[]
  }

  export type consultaUncheckedUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<consultaCreateWithoutPacienteInput, consultaUncheckedCreateWithoutPacienteInput> | consultaCreateWithoutPacienteInput[] | consultaUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutPacienteInput | consultaCreateOrConnectWithoutPacienteInput[]
    upsert?: consultaUpsertWithWhereUniqueWithoutPacienteInput | consultaUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: consultaCreateManyPacienteInputEnvelope
    set?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    disconnect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    delete?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    update?: consultaUpdateWithWhereUniqueWithoutPacienteInput | consultaUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: consultaUpdateManyWithWhereWithoutPacienteInput | consultaUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: consultaScalarWhereInput | consultaScalarWhereInput[]
  }

  export type consultaCreateNestedOneWithoutPrescricaoInput = {
    create?: XOR<consultaCreateWithoutPrescricaoInput, consultaUncheckedCreateWithoutPrescricaoInput>
    connectOrCreate?: consultaCreateOrConnectWithoutPrescricaoInput
    connect?: consultaWhereUniqueInput
  }

  export type consultaUpdateOneWithoutPrescricaoNestedInput = {
    create?: XOR<consultaCreateWithoutPrescricaoInput, consultaUncheckedCreateWithoutPrescricaoInput>
    connectOrCreate?: consultaCreateOrConnectWithoutPrescricaoInput
    upsert?: consultaUpsertWithoutPrescricaoInput
    disconnect?: consultaWhereInput | boolean
    delete?: consultaWhereInput | boolean
    connect?: consultaWhereUniqueInput
    update?: XOR<XOR<consultaUpdateToOneWithWhereWithoutPrescricaoInput, consultaUpdateWithoutPrescricaoInput>, consultaUncheckedUpdateWithoutPrescricaoInput>
  }

  export type consultaCreateNestedManyWithoutProfissional_saudeInput = {
    create?: XOR<consultaCreateWithoutProfissional_saudeInput, consultaUncheckedCreateWithoutProfissional_saudeInput> | consultaCreateWithoutProfissional_saudeInput[] | consultaUncheckedCreateWithoutProfissional_saudeInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutProfissional_saudeInput | consultaCreateOrConnectWithoutProfissional_saudeInput[]
    createMany?: consultaCreateManyProfissional_saudeInputEnvelope
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
  }

  export type tipo_documentoCreateNestedOneWithoutProfissional_saudeInput = {
    create?: XOR<tipo_documentoCreateWithoutProfissional_saudeInput, tipo_documentoUncheckedCreateWithoutProfissional_saudeInput>
    connectOrCreate?: tipo_documentoCreateOrConnectWithoutProfissional_saudeInput
    connect?: tipo_documentoWhereUniqueInput
  }

  export type especialidadeCreateNestedOneWithoutProfissional_saudeInput = {
    create?: XOR<especialidadeCreateWithoutProfissional_saudeInput, especialidadeUncheckedCreateWithoutProfissional_saudeInput>
    connectOrCreate?: especialidadeCreateOrConnectWithoutProfissional_saudeInput
    connect?: especialidadeWhereUniqueInput
  }

  export type consultaUncheckedCreateNestedManyWithoutProfissional_saudeInput = {
    create?: XOR<consultaCreateWithoutProfissional_saudeInput, consultaUncheckedCreateWithoutProfissional_saudeInput> | consultaCreateWithoutProfissional_saudeInput[] | consultaUncheckedCreateWithoutProfissional_saudeInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutProfissional_saudeInput | consultaCreateOrConnectWithoutProfissional_saudeInput[]
    createMany?: consultaCreateManyProfissional_saudeInputEnvelope
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type consultaUpdateManyWithoutProfissional_saudeNestedInput = {
    create?: XOR<consultaCreateWithoutProfissional_saudeInput, consultaUncheckedCreateWithoutProfissional_saudeInput> | consultaCreateWithoutProfissional_saudeInput[] | consultaUncheckedCreateWithoutProfissional_saudeInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutProfissional_saudeInput | consultaCreateOrConnectWithoutProfissional_saudeInput[]
    upsert?: consultaUpsertWithWhereUniqueWithoutProfissional_saudeInput | consultaUpsertWithWhereUniqueWithoutProfissional_saudeInput[]
    createMany?: consultaCreateManyProfissional_saudeInputEnvelope
    set?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    disconnect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    delete?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    update?: consultaUpdateWithWhereUniqueWithoutProfissional_saudeInput | consultaUpdateWithWhereUniqueWithoutProfissional_saudeInput[]
    updateMany?: consultaUpdateManyWithWhereWithoutProfissional_saudeInput | consultaUpdateManyWithWhereWithoutProfissional_saudeInput[]
    deleteMany?: consultaScalarWhereInput | consultaScalarWhereInput[]
  }

  export type tipo_documentoUpdateOneWithoutProfissional_saudeNestedInput = {
    create?: XOR<tipo_documentoCreateWithoutProfissional_saudeInput, tipo_documentoUncheckedCreateWithoutProfissional_saudeInput>
    connectOrCreate?: tipo_documentoCreateOrConnectWithoutProfissional_saudeInput
    upsert?: tipo_documentoUpsertWithoutProfissional_saudeInput
    disconnect?: tipo_documentoWhereInput | boolean
    delete?: tipo_documentoWhereInput | boolean
    connect?: tipo_documentoWhereUniqueInput
    update?: XOR<XOR<tipo_documentoUpdateToOneWithWhereWithoutProfissional_saudeInput, tipo_documentoUpdateWithoutProfissional_saudeInput>, tipo_documentoUncheckedUpdateWithoutProfissional_saudeInput>
  }

  export type especialidadeUpdateOneWithoutProfissional_saudeNestedInput = {
    create?: XOR<especialidadeCreateWithoutProfissional_saudeInput, especialidadeUncheckedCreateWithoutProfissional_saudeInput>
    connectOrCreate?: especialidadeCreateOrConnectWithoutProfissional_saudeInput
    upsert?: especialidadeUpsertWithoutProfissional_saudeInput
    disconnect?: especialidadeWhereInput | boolean
    delete?: especialidadeWhereInput | boolean
    connect?: especialidadeWhereUniqueInput
    update?: XOR<XOR<especialidadeUpdateToOneWithWhereWithoutProfissional_saudeInput, especialidadeUpdateWithoutProfissional_saudeInput>, especialidadeUncheckedUpdateWithoutProfissional_saudeInput>
  }

  export type consultaUncheckedUpdateManyWithoutProfissional_saudeNestedInput = {
    create?: XOR<consultaCreateWithoutProfissional_saudeInput, consultaUncheckedCreateWithoutProfissional_saudeInput> | consultaCreateWithoutProfissional_saudeInput[] | consultaUncheckedCreateWithoutProfissional_saudeInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutProfissional_saudeInput | consultaCreateOrConnectWithoutProfissional_saudeInput[]
    upsert?: consultaUpsertWithWhereUniqueWithoutProfissional_saudeInput | consultaUpsertWithWhereUniqueWithoutProfissional_saudeInput[]
    createMany?: consultaCreateManyProfissional_saudeInputEnvelope
    set?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    disconnect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    delete?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    update?: consultaUpdateWithWhereUniqueWithoutProfissional_saudeInput | consultaUpdateWithWhereUniqueWithoutProfissional_saudeInput[]
    updateMany?: consultaUpdateManyWithWhereWithoutProfissional_saudeInput | consultaUpdateManyWithWhereWithoutProfissional_saudeInput[]
    deleteMany?: consultaScalarWhereInput | consultaScalarWhereInput[]
  }

  export type consultaCreateNestedManyWithoutUnidade_saudeInput = {
    create?: XOR<consultaCreateWithoutUnidade_saudeInput, consultaUncheckedCreateWithoutUnidade_saudeInput> | consultaCreateWithoutUnidade_saudeInput[] | consultaUncheckedCreateWithoutUnidade_saudeInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutUnidade_saudeInput | consultaCreateOrConnectWithoutUnidade_saudeInput[]
    createMany?: consultaCreateManyUnidade_saudeInputEnvelope
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
  }

  export type consultaUncheckedCreateNestedManyWithoutUnidade_saudeInput = {
    create?: XOR<consultaCreateWithoutUnidade_saudeInput, consultaUncheckedCreateWithoutUnidade_saudeInput> | consultaCreateWithoutUnidade_saudeInput[] | consultaUncheckedCreateWithoutUnidade_saudeInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutUnidade_saudeInput | consultaCreateOrConnectWithoutUnidade_saudeInput[]
    createMany?: consultaCreateManyUnidade_saudeInputEnvelope
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
  }

  export type consultaUpdateManyWithoutUnidade_saudeNestedInput = {
    create?: XOR<consultaCreateWithoutUnidade_saudeInput, consultaUncheckedCreateWithoutUnidade_saudeInput> | consultaCreateWithoutUnidade_saudeInput[] | consultaUncheckedCreateWithoutUnidade_saudeInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutUnidade_saudeInput | consultaCreateOrConnectWithoutUnidade_saudeInput[]
    upsert?: consultaUpsertWithWhereUniqueWithoutUnidade_saudeInput | consultaUpsertWithWhereUniqueWithoutUnidade_saudeInput[]
    createMany?: consultaCreateManyUnidade_saudeInputEnvelope
    set?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    disconnect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    delete?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    update?: consultaUpdateWithWhereUniqueWithoutUnidade_saudeInput | consultaUpdateWithWhereUniqueWithoutUnidade_saudeInput[]
    updateMany?: consultaUpdateManyWithWhereWithoutUnidade_saudeInput | consultaUpdateManyWithWhereWithoutUnidade_saudeInput[]
    deleteMany?: consultaScalarWhereInput | consultaScalarWhereInput[]
  }

  export type consultaUncheckedUpdateManyWithoutUnidade_saudeNestedInput = {
    create?: XOR<consultaCreateWithoutUnidade_saudeInput, consultaUncheckedCreateWithoutUnidade_saudeInput> | consultaCreateWithoutUnidade_saudeInput[] | consultaUncheckedCreateWithoutUnidade_saudeInput[]
    connectOrCreate?: consultaCreateOrConnectWithoutUnidade_saudeInput | consultaCreateOrConnectWithoutUnidade_saudeInput[]
    upsert?: consultaUpsertWithWhereUniqueWithoutUnidade_saudeInput | consultaUpsertWithWhereUniqueWithoutUnidade_saudeInput[]
    createMany?: consultaCreateManyUnidade_saudeInputEnvelope
    set?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    disconnect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    delete?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    connect?: consultaWhereUniqueInput | consultaWhereUniqueInput[]
    update?: consultaUpdateWithWhereUniqueWithoutUnidade_saudeInput | consultaUpdateWithWhereUniqueWithoutUnidade_saudeInput[]
    updateMany?: consultaUpdateManyWithWhereWithoutUnidade_saudeInput | consultaUpdateManyWithWhereWithoutUnidade_saudeInput[]
    deleteMany?: consultaScalarWhereInput | consultaScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type profissional_saudeCreateWithoutTipo_documentoInput = {
    id?: string
    nome: string
    documento_numero?: string | null
    email?: string | null
    senha: string
    data_nascimento?: Date | string | null
    consulta?: consultaCreateNestedManyWithoutProfissional_saudeInput
    especialidade?: especialidadeCreateNestedOneWithoutProfissional_saudeInput
  }

  export type profissional_saudeUncheckedCreateWithoutTipo_documentoInput = {
    id?: string
    nome: string
    documento_numero?: string | null
    especialidade_id?: string | null
    email?: string | null
    senha: string
    data_nascimento?: Date | string | null
    consulta?: consultaUncheckedCreateNestedManyWithoutProfissional_saudeInput
  }

  export type profissional_saudeCreateOrConnectWithoutTipo_documentoInput = {
    where: profissional_saudeWhereUniqueInput
    create: XOR<profissional_saudeCreateWithoutTipo_documentoInput, profissional_saudeUncheckedCreateWithoutTipo_documentoInput>
  }

  export type profissional_saudeCreateManyTipo_documentoInputEnvelope = {
    data: profissional_saudeCreateManyTipo_documentoInput | profissional_saudeCreateManyTipo_documentoInput[]
    skipDuplicates?: boolean
  }

  export type profissional_saudeUpsertWithWhereUniqueWithoutTipo_documentoInput = {
    where: profissional_saudeWhereUniqueInput
    update: XOR<profissional_saudeUpdateWithoutTipo_documentoInput, profissional_saudeUncheckedUpdateWithoutTipo_documentoInput>
    create: XOR<profissional_saudeCreateWithoutTipo_documentoInput, profissional_saudeUncheckedCreateWithoutTipo_documentoInput>
  }

  export type profissional_saudeUpdateWithWhereUniqueWithoutTipo_documentoInput = {
    where: profissional_saudeWhereUniqueInput
    data: XOR<profissional_saudeUpdateWithoutTipo_documentoInput, profissional_saudeUncheckedUpdateWithoutTipo_documentoInput>
  }

  export type profissional_saudeUpdateManyWithWhereWithoutTipo_documentoInput = {
    where: profissional_saudeScalarWhereInput
    data: XOR<profissional_saudeUpdateManyMutationInput, profissional_saudeUncheckedUpdateManyWithoutTipo_documentoInput>
  }

  export type profissional_saudeScalarWhereInput = {
    AND?: profissional_saudeScalarWhereInput | profissional_saudeScalarWhereInput[]
    OR?: profissional_saudeScalarWhereInput[]
    NOT?: profissional_saudeScalarWhereInput | profissional_saudeScalarWhereInput[]
    id?: UuidFilter<"profissional_saude"> | string
    nome?: StringFilter<"profissional_saude"> | string
    documento_numero?: StringNullableFilter<"profissional_saude"> | string | null
    tipo_documento_id?: UuidNullableFilter<"profissional_saude"> | string | null
    especialidade_id?: UuidNullableFilter<"profissional_saude"> | string | null
    email?: StringNullableFilter<"profissional_saude"> | string | null
    senha?: StringFilter<"profissional_saude"> | string
    data_nascimento?: DateTimeNullableFilter<"profissional_saude"> | Date | string | null
  }

  export type profissional_saudeCreateWithoutEspecialidadeInput = {
    id?: string
    nome: string
    documento_numero?: string | null
    email?: string | null
    senha: string
    data_nascimento?: Date | string | null
    consulta?: consultaCreateNestedManyWithoutProfissional_saudeInput
    tipo_documento?: tipo_documentoCreateNestedOneWithoutProfissional_saudeInput
  }

  export type profissional_saudeUncheckedCreateWithoutEspecialidadeInput = {
    id?: string
    nome: string
    documento_numero?: string | null
    tipo_documento_id?: string | null
    email?: string | null
    senha: string
    data_nascimento?: Date | string | null
    consulta?: consultaUncheckedCreateNestedManyWithoutProfissional_saudeInput
  }

  export type profissional_saudeCreateOrConnectWithoutEspecialidadeInput = {
    where: profissional_saudeWhereUniqueInput
    create: XOR<profissional_saudeCreateWithoutEspecialidadeInput, profissional_saudeUncheckedCreateWithoutEspecialidadeInput>
  }

  export type profissional_saudeCreateManyEspecialidadeInputEnvelope = {
    data: profissional_saudeCreateManyEspecialidadeInput | profissional_saudeCreateManyEspecialidadeInput[]
    skipDuplicates?: boolean
  }

  export type profissional_saudeUpsertWithWhereUniqueWithoutEspecialidadeInput = {
    where: profissional_saudeWhereUniqueInput
    update: XOR<profissional_saudeUpdateWithoutEspecialidadeInput, profissional_saudeUncheckedUpdateWithoutEspecialidadeInput>
    create: XOR<profissional_saudeCreateWithoutEspecialidadeInput, profissional_saudeUncheckedCreateWithoutEspecialidadeInput>
  }

  export type profissional_saudeUpdateWithWhereUniqueWithoutEspecialidadeInput = {
    where: profissional_saudeWhereUniqueInput
    data: XOR<profissional_saudeUpdateWithoutEspecialidadeInput, profissional_saudeUncheckedUpdateWithoutEspecialidadeInput>
  }

  export type profissional_saudeUpdateManyWithWhereWithoutEspecialidadeInput = {
    where: profissional_saudeScalarWhereInput
    data: XOR<profissional_saudeUpdateManyMutationInput, profissional_saudeUncheckedUpdateManyWithoutEspecialidadeInput>
  }

  export type pacienteCreateWithoutConsultaInput = {
    id?: string
    nome: string
    data_nascimento: Date | string
    sexo?: string | null
    cpf?: string | null
    telefone?: string | null
    email?: string | null
  }

  export type pacienteUncheckedCreateWithoutConsultaInput = {
    id?: string
    nome: string
    data_nascimento: Date | string
    sexo?: string | null
    cpf?: string | null
    telefone?: string | null
    email?: string | null
  }

  export type pacienteCreateOrConnectWithoutConsultaInput = {
    where: pacienteWhereUniqueInput
    create: XOR<pacienteCreateWithoutConsultaInput, pacienteUncheckedCreateWithoutConsultaInput>
  }

  export type profissional_saudeCreateWithoutConsultaInput = {
    id?: string
    nome: string
    documento_numero?: string | null
    email?: string | null
    senha: string
    data_nascimento?: Date | string | null
    tipo_documento?: tipo_documentoCreateNestedOneWithoutProfissional_saudeInput
    especialidade?: especialidadeCreateNestedOneWithoutProfissional_saudeInput
  }

  export type profissional_saudeUncheckedCreateWithoutConsultaInput = {
    id?: string
    nome: string
    documento_numero?: string | null
    tipo_documento_id?: string | null
    especialidade_id?: string | null
    email?: string | null
    senha: string
    data_nascimento?: Date | string | null
  }

  export type profissional_saudeCreateOrConnectWithoutConsultaInput = {
    where: profissional_saudeWhereUniqueInput
    create: XOR<profissional_saudeCreateWithoutConsultaInput, profissional_saudeUncheckedCreateWithoutConsultaInput>
  }

  export type unidade_saudeCreateWithoutConsultaInput = {
    id?: string
    nome: string
    cnes?: string | null
    endereco?: string | null
    cidade?: string | null
    estado?: string | null
  }

  export type unidade_saudeUncheckedCreateWithoutConsultaInput = {
    id?: string
    nome: string
    cnes?: string | null
    endereco?: string | null
    cidade?: string | null
    estado?: string | null
  }

  export type unidade_saudeCreateOrConnectWithoutConsultaInput = {
    where: unidade_saudeWhereUniqueInput
    create: XOR<unidade_saudeCreateWithoutConsultaInput, unidade_saudeUncheckedCreateWithoutConsultaInput>
  }

  export type prescricaoCreateWithoutConsultaInput = {
    id?: string
    medicamento: string
    posologia?: string | null
    duracao?: string | null
  }

  export type prescricaoUncheckedCreateWithoutConsultaInput = {
    id?: string
    medicamento: string
    posologia?: string | null
    duracao?: string | null
  }

  export type prescricaoCreateOrConnectWithoutConsultaInput = {
    where: prescricaoWhereUniqueInput
    create: XOR<prescricaoCreateWithoutConsultaInput, prescricaoUncheckedCreateWithoutConsultaInput>
  }

  export type prescricaoCreateManyConsultaInputEnvelope = {
    data: prescricaoCreateManyConsultaInput | prescricaoCreateManyConsultaInput[]
    skipDuplicates?: boolean
  }

  export type pacienteUpsertWithoutConsultaInput = {
    update: XOR<pacienteUpdateWithoutConsultaInput, pacienteUncheckedUpdateWithoutConsultaInput>
    create: XOR<pacienteCreateWithoutConsultaInput, pacienteUncheckedCreateWithoutConsultaInput>
    where?: pacienteWhereInput
  }

  export type pacienteUpdateToOneWithWhereWithoutConsultaInput = {
    where?: pacienteWhereInput
    data: XOR<pacienteUpdateWithoutConsultaInput, pacienteUncheckedUpdateWithoutConsultaInput>
  }

  export type pacienteUpdateWithoutConsultaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    sexo?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pacienteUncheckedUpdateWithoutConsultaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    sexo?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type profissional_saudeUpsertWithoutConsultaInput = {
    update: XOR<profissional_saudeUpdateWithoutConsultaInput, profissional_saudeUncheckedUpdateWithoutConsultaInput>
    create: XOR<profissional_saudeCreateWithoutConsultaInput, profissional_saudeUncheckedCreateWithoutConsultaInput>
    where?: profissional_saudeWhereInput
  }

  export type profissional_saudeUpdateToOneWithWhereWithoutConsultaInput = {
    where?: profissional_saudeWhereInput
    data: XOR<profissional_saudeUpdateWithoutConsultaInput, profissional_saudeUncheckedUpdateWithoutConsultaInput>
  }

  export type profissional_saudeUpdateWithoutConsultaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tipo_documento?: tipo_documentoUpdateOneWithoutProfissional_saudeNestedInput
    especialidade?: especialidadeUpdateOneWithoutProfissional_saudeNestedInput
  }

  export type profissional_saudeUncheckedUpdateWithoutConsultaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento_id?: NullableStringFieldUpdateOperationsInput | string | null
    especialidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type unidade_saudeUpsertWithoutConsultaInput = {
    update: XOR<unidade_saudeUpdateWithoutConsultaInput, unidade_saudeUncheckedUpdateWithoutConsultaInput>
    create: XOR<unidade_saudeCreateWithoutConsultaInput, unidade_saudeUncheckedCreateWithoutConsultaInput>
    where?: unidade_saudeWhereInput
  }

  export type unidade_saudeUpdateToOneWithWhereWithoutConsultaInput = {
    where?: unidade_saudeWhereInput
    data: XOR<unidade_saudeUpdateWithoutConsultaInput, unidade_saudeUncheckedUpdateWithoutConsultaInput>
  }

  export type unidade_saudeUpdateWithoutConsultaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnes?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type unidade_saudeUncheckedUpdateWithoutConsultaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnes?: NullableStringFieldUpdateOperationsInput | string | null
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type prescricaoUpsertWithWhereUniqueWithoutConsultaInput = {
    where: prescricaoWhereUniqueInput
    update: XOR<prescricaoUpdateWithoutConsultaInput, prescricaoUncheckedUpdateWithoutConsultaInput>
    create: XOR<prescricaoCreateWithoutConsultaInput, prescricaoUncheckedCreateWithoutConsultaInput>
  }

  export type prescricaoUpdateWithWhereUniqueWithoutConsultaInput = {
    where: prescricaoWhereUniqueInput
    data: XOR<prescricaoUpdateWithoutConsultaInput, prescricaoUncheckedUpdateWithoutConsultaInput>
  }

  export type prescricaoUpdateManyWithWhereWithoutConsultaInput = {
    where: prescricaoScalarWhereInput
    data: XOR<prescricaoUpdateManyMutationInput, prescricaoUncheckedUpdateManyWithoutConsultaInput>
  }

  export type prescricaoScalarWhereInput = {
    AND?: prescricaoScalarWhereInput | prescricaoScalarWhereInput[]
    OR?: prescricaoScalarWhereInput[]
    NOT?: prescricaoScalarWhereInput | prescricaoScalarWhereInput[]
    id?: UuidFilter<"prescricao"> | string
    consulta_id?: UuidNullableFilter<"prescricao"> | string | null
    medicamento?: StringFilter<"prescricao"> | string
    posologia?: StringNullableFilter<"prescricao"> | string | null
    duracao?: StringNullableFilter<"prescricao"> | string | null
  }

  export type consultaCreateWithoutPacienteInput = {
    id?: string
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
    profissional_saude?: profissional_saudeCreateNestedOneWithoutConsultaInput
    unidade_saude?: unidade_saudeCreateNestedOneWithoutConsultaInput
    prescricao?: prescricaoCreateNestedManyWithoutConsultaInput
  }

  export type consultaUncheckedCreateWithoutPacienteInput = {
    id?: string
    profissional_id?: string | null
    unidade_id?: string | null
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
    prescricao?: prescricaoUncheckedCreateNestedManyWithoutConsultaInput
  }

  export type consultaCreateOrConnectWithoutPacienteInput = {
    where: consultaWhereUniqueInput
    create: XOR<consultaCreateWithoutPacienteInput, consultaUncheckedCreateWithoutPacienteInput>
  }

  export type consultaCreateManyPacienteInputEnvelope = {
    data: consultaCreateManyPacienteInput | consultaCreateManyPacienteInput[]
    skipDuplicates?: boolean
  }

  export type consultaUpsertWithWhereUniqueWithoutPacienteInput = {
    where: consultaWhereUniqueInput
    update: XOR<consultaUpdateWithoutPacienteInput, consultaUncheckedUpdateWithoutPacienteInput>
    create: XOR<consultaCreateWithoutPacienteInput, consultaUncheckedCreateWithoutPacienteInput>
  }

  export type consultaUpdateWithWhereUniqueWithoutPacienteInput = {
    where: consultaWhereUniqueInput
    data: XOR<consultaUpdateWithoutPacienteInput, consultaUncheckedUpdateWithoutPacienteInput>
  }

  export type consultaUpdateManyWithWhereWithoutPacienteInput = {
    where: consultaScalarWhereInput
    data: XOR<consultaUpdateManyMutationInput, consultaUncheckedUpdateManyWithoutPacienteInput>
  }

  export type consultaScalarWhereInput = {
    AND?: consultaScalarWhereInput | consultaScalarWhereInput[]
    OR?: consultaScalarWhereInput[]
    NOT?: consultaScalarWhereInput | consultaScalarWhereInput[]
    id?: UuidFilter<"consulta"> | string
    paciente_id?: UuidNullableFilter<"consulta"> | string | null
    profissional_id?: UuidNullableFilter<"consulta"> | string | null
    unidade_id?: UuidNullableFilter<"consulta"> | string | null
    data?: DateTimeFilter<"consulta"> | Date | string
    sintomas?: StringNullableFilter<"consulta"> | string | null
    diagnostico?: StringNullableFilter<"consulta"> | string | null
    conduta?: StringNullableFilter<"consulta"> | string | null
  }

  export type consultaCreateWithoutPrescricaoInput = {
    id?: string
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
    paciente?: pacienteCreateNestedOneWithoutConsultaInput
    profissional_saude?: profissional_saudeCreateNestedOneWithoutConsultaInput
    unidade_saude?: unidade_saudeCreateNestedOneWithoutConsultaInput
  }

  export type consultaUncheckedCreateWithoutPrescricaoInput = {
    id?: string
    paciente_id?: string | null
    profissional_id?: string | null
    unidade_id?: string | null
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
  }

  export type consultaCreateOrConnectWithoutPrescricaoInput = {
    where: consultaWhereUniqueInput
    create: XOR<consultaCreateWithoutPrescricaoInput, consultaUncheckedCreateWithoutPrescricaoInput>
  }

  export type consultaUpsertWithoutPrescricaoInput = {
    update: XOR<consultaUpdateWithoutPrescricaoInput, consultaUncheckedUpdateWithoutPrescricaoInput>
    create: XOR<consultaCreateWithoutPrescricaoInput, consultaUncheckedCreateWithoutPrescricaoInput>
    where?: consultaWhereInput
  }

  export type consultaUpdateToOneWithWhereWithoutPrescricaoInput = {
    where?: consultaWhereInput
    data: XOR<consultaUpdateWithoutPrescricaoInput, consultaUncheckedUpdateWithoutPrescricaoInput>
  }

  export type consultaUpdateWithoutPrescricaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
    paciente?: pacienteUpdateOneWithoutConsultaNestedInput
    profissional_saude?: profissional_saudeUpdateOneWithoutConsultaNestedInput
    unidade_saude?: unidade_saudeUpdateOneWithoutConsultaNestedInput
  }

  export type consultaUncheckedUpdateWithoutPrescricaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    paciente_id?: NullableStringFieldUpdateOperationsInput | string | null
    profissional_id?: NullableStringFieldUpdateOperationsInput | string | null
    unidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type consultaCreateWithoutProfissional_saudeInput = {
    id?: string
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
    paciente?: pacienteCreateNestedOneWithoutConsultaInput
    unidade_saude?: unidade_saudeCreateNestedOneWithoutConsultaInput
    prescricao?: prescricaoCreateNestedManyWithoutConsultaInput
  }

  export type consultaUncheckedCreateWithoutProfissional_saudeInput = {
    id?: string
    paciente_id?: string | null
    unidade_id?: string | null
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
    prescricao?: prescricaoUncheckedCreateNestedManyWithoutConsultaInput
  }

  export type consultaCreateOrConnectWithoutProfissional_saudeInput = {
    where: consultaWhereUniqueInput
    create: XOR<consultaCreateWithoutProfissional_saudeInput, consultaUncheckedCreateWithoutProfissional_saudeInput>
  }

  export type consultaCreateManyProfissional_saudeInputEnvelope = {
    data: consultaCreateManyProfissional_saudeInput | consultaCreateManyProfissional_saudeInput[]
    skipDuplicates?: boolean
  }

  export type tipo_documentoCreateWithoutProfissional_saudeInput = {
    id?: string
    nome: string
    descricao?: string | null
  }

  export type tipo_documentoUncheckedCreateWithoutProfissional_saudeInput = {
    id?: string
    nome: string
    descricao?: string | null
  }

  export type tipo_documentoCreateOrConnectWithoutProfissional_saudeInput = {
    where: tipo_documentoWhereUniqueInput
    create: XOR<tipo_documentoCreateWithoutProfissional_saudeInput, tipo_documentoUncheckedCreateWithoutProfissional_saudeInput>
  }

  export type especialidadeCreateWithoutProfissional_saudeInput = {
    id?: string
    nome: string
    descricao?: string | null
  }

  export type especialidadeUncheckedCreateWithoutProfissional_saudeInput = {
    id?: string
    nome: string
    descricao?: string | null
  }

  export type especialidadeCreateOrConnectWithoutProfissional_saudeInput = {
    where: especialidadeWhereUniqueInput
    create: XOR<especialidadeCreateWithoutProfissional_saudeInput, especialidadeUncheckedCreateWithoutProfissional_saudeInput>
  }

  export type consultaUpsertWithWhereUniqueWithoutProfissional_saudeInput = {
    where: consultaWhereUniqueInput
    update: XOR<consultaUpdateWithoutProfissional_saudeInput, consultaUncheckedUpdateWithoutProfissional_saudeInput>
    create: XOR<consultaCreateWithoutProfissional_saudeInput, consultaUncheckedCreateWithoutProfissional_saudeInput>
  }

  export type consultaUpdateWithWhereUniqueWithoutProfissional_saudeInput = {
    where: consultaWhereUniqueInput
    data: XOR<consultaUpdateWithoutProfissional_saudeInput, consultaUncheckedUpdateWithoutProfissional_saudeInput>
  }

  export type consultaUpdateManyWithWhereWithoutProfissional_saudeInput = {
    where: consultaScalarWhereInput
    data: XOR<consultaUpdateManyMutationInput, consultaUncheckedUpdateManyWithoutProfissional_saudeInput>
  }

  export type tipo_documentoUpsertWithoutProfissional_saudeInput = {
    update: XOR<tipo_documentoUpdateWithoutProfissional_saudeInput, tipo_documentoUncheckedUpdateWithoutProfissional_saudeInput>
    create: XOR<tipo_documentoCreateWithoutProfissional_saudeInput, tipo_documentoUncheckedCreateWithoutProfissional_saudeInput>
    where?: tipo_documentoWhereInput
  }

  export type tipo_documentoUpdateToOneWithWhereWithoutProfissional_saudeInput = {
    where?: tipo_documentoWhereInput
    data: XOR<tipo_documentoUpdateWithoutProfissional_saudeInput, tipo_documentoUncheckedUpdateWithoutProfissional_saudeInput>
  }

  export type tipo_documentoUpdateWithoutProfissional_saudeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type tipo_documentoUncheckedUpdateWithoutProfissional_saudeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type especialidadeUpsertWithoutProfissional_saudeInput = {
    update: XOR<especialidadeUpdateWithoutProfissional_saudeInput, especialidadeUncheckedUpdateWithoutProfissional_saudeInput>
    create: XOR<especialidadeCreateWithoutProfissional_saudeInput, especialidadeUncheckedCreateWithoutProfissional_saudeInput>
    where?: especialidadeWhereInput
  }

  export type especialidadeUpdateToOneWithWhereWithoutProfissional_saudeInput = {
    where?: especialidadeWhereInput
    data: XOR<especialidadeUpdateWithoutProfissional_saudeInput, especialidadeUncheckedUpdateWithoutProfissional_saudeInput>
  }

  export type especialidadeUpdateWithoutProfissional_saudeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type especialidadeUncheckedUpdateWithoutProfissional_saudeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type consultaCreateWithoutUnidade_saudeInput = {
    id?: string
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
    paciente?: pacienteCreateNestedOneWithoutConsultaInput
    profissional_saude?: profissional_saudeCreateNestedOneWithoutConsultaInput
    prescricao?: prescricaoCreateNestedManyWithoutConsultaInput
  }

  export type consultaUncheckedCreateWithoutUnidade_saudeInput = {
    id?: string
    paciente_id?: string | null
    profissional_id?: string | null
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
    prescricao?: prescricaoUncheckedCreateNestedManyWithoutConsultaInput
  }

  export type consultaCreateOrConnectWithoutUnidade_saudeInput = {
    where: consultaWhereUniqueInput
    create: XOR<consultaCreateWithoutUnidade_saudeInput, consultaUncheckedCreateWithoutUnidade_saudeInput>
  }

  export type consultaCreateManyUnidade_saudeInputEnvelope = {
    data: consultaCreateManyUnidade_saudeInput | consultaCreateManyUnidade_saudeInput[]
    skipDuplicates?: boolean
  }

  export type consultaUpsertWithWhereUniqueWithoutUnidade_saudeInput = {
    where: consultaWhereUniqueInput
    update: XOR<consultaUpdateWithoutUnidade_saudeInput, consultaUncheckedUpdateWithoutUnidade_saudeInput>
    create: XOR<consultaCreateWithoutUnidade_saudeInput, consultaUncheckedCreateWithoutUnidade_saudeInput>
  }

  export type consultaUpdateWithWhereUniqueWithoutUnidade_saudeInput = {
    where: consultaWhereUniqueInput
    data: XOR<consultaUpdateWithoutUnidade_saudeInput, consultaUncheckedUpdateWithoutUnidade_saudeInput>
  }

  export type consultaUpdateManyWithWhereWithoutUnidade_saudeInput = {
    where: consultaScalarWhereInput
    data: XOR<consultaUpdateManyMutationInput, consultaUncheckedUpdateManyWithoutUnidade_saudeInput>
  }

  export type profissional_saudeCreateManyTipo_documentoInput = {
    id?: string
    nome: string
    documento_numero?: string | null
    especialidade_id?: string | null
    email?: string | null
    senha: string
    data_nascimento?: Date | string | null
  }

  export type profissional_saudeUpdateWithoutTipo_documentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consulta?: consultaUpdateManyWithoutProfissional_saudeNestedInput
    especialidade?: especialidadeUpdateOneWithoutProfissional_saudeNestedInput
  }

  export type profissional_saudeUncheckedUpdateWithoutTipo_documentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    especialidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consulta?: consultaUncheckedUpdateManyWithoutProfissional_saudeNestedInput
  }

  export type profissional_saudeUncheckedUpdateManyWithoutTipo_documentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    especialidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type profissional_saudeCreateManyEspecialidadeInput = {
    id?: string
    nome: string
    documento_numero?: string | null
    tipo_documento_id?: string | null
    email?: string | null
    senha: string
    data_nascimento?: Date | string | null
  }

  export type profissional_saudeUpdateWithoutEspecialidadeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consulta?: consultaUpdateManyWithoutProfissional_saudeNestedInput
    tipo_documento?: tipo_documentoUpdateOneWithoutProfissional_saudeNestedInput
  }

  export type profissional_saudeUncheckedUpdateWithoutEspecialidadeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consulta?: consultaUncheckedUpdateManyWithoutProfissional_saudeNestedInput
  }

  export type profissional_saudeUncheckedUpdateManyWithoutEspecialidadeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    documento_numero?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento_id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type prescricaoCreateManyConsultaInput = {
    id?: string
    medicamento: string
    posologia?: string | null
    duracao?: string | null
  }

  export type prescricaoUpdateWithoutConsultaInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    posologia?: NullableStringFieldUpdateOperationsInput | string | null
    duracao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type prescricaoUncheckedUpdateWithoutConsultaInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    posologia?: NullableStringFieldUpdateOperationsInput | string | null
    duracao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type prescricaoUncheckedUpdateManyWithoutConsultaInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicamento?: StringFieldUpdateOperationsInput | string
    posologia?: NullableStringFieldUpdateOperationsInput | string | null
    duracao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type consultaCreateManyPacienteInput = {
    id?: string
    profissional_id?: string | null
    unidade_id?: string | null
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
  }

  export type consultaUpdateWithoutPacienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
    profissional_saude?: profissional_saudeUpdateOneWithoutConsultaNestedInput
    unidade_saude?: unidade_saudeUpdateOneWithoutConsultaNestedInput
    prescricao?: prescricaoUpdateManyWithoutConsultaNestedInput
  }

  export type consultaUncheckedUpdateWithoutPacienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    profissional_id?: NullableStringFieldUpdateOperationsInput | string | null
    unidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
    prescricao?: prescricaoUncheckedUpdateManyWithoutConsultaNestedInput
  }

  export type consultaUncheckedUpdateManyWithoutPacienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    profissional_id?: NullableStringFieldUpdateOperationsInput | string | null
    unidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type consultaCreateManyProfissional_saudeInput = {
    id?: string
    paciente_id?: string | null
    unidade_id?: string | null
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
  }

  export type consultaUpdateWithoutProfissional_saudeInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
    paciente?: pacienteUpdateOneWithoutConsultaNestedInput
    unidade_saude?: unidade_saudeUpdateOneWithoutConsultaNestedInput
    prescricao?: prescricaoUpdateManyWithoutConsultaNestedInput
  }

  export type consultaUncheckedUpdateWithoutProfissional_saudeInput = {
    id?: StringFieldUpdateOperationsInput | string
    paciente_id?: NullableStringFieldUpdateOperationsInput | string | null
    unidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
    prescricao?: prescricaoUncheckedUpdateManyWithoutConsultaNestedInput
  }

  export type consultaUncheckedUpdateManyWithoutProfissional_saudeInput = {
    id?: StringFieldUpdateOperationsInput | string
    paciente_id?: NullableStringFieldUpdateOperationsInput | string | null
    unidade_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type consultaCreateManyUnidade_saudeInput = {
    id?: string
    paciente_id?: string | null
    profissional_id?: string | null
    data?: Date | string
    sintomas?: string | null
    diagnostico?: string | null
    conduta?: string | null
  }

  export type consultaUpdateWithoutUnidade_saudeInput = {
    id?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
    paciente?: pacienteUpdateOneWithoutConsultaNestedInput
    profissional_saude?: profissional_saudeUpdateOneWithoutConsultaNestedInput
    prescricao?: prescricaoUpdateManyWithoutConsultaNestedInput
  }

  export type consultaUncheckedUpdateWithoutUnidade_saudeInput = {
    id?: StringFieldUpdateOperationsInput | string
    paciente_id?: NullableStringFieldUpdateOperationsInput | string | null
    profissional_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
    prescricao?: prescricaoUncheckedUpdateManyWithoutConsultaNestedInput
  }

  export type consultaUncheckedUpdateManyWithoutUnidade_saudeInput = {
    id?: StringFieldUpdateOperationsInput | string
    paciente_id?: NullableStringFieldUpdateOperationsInput | string | null
    profissional_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    sintomas?: NullableStringFieldUpdateOperationsInput | string | null
    diagnostico?: NullableStringFieldUpdateOperationsInput | string | null
    conduta?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}