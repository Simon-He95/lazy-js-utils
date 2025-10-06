// 通用工具类型
// @description EN: Common utility TypeScript types used across the project (Nullable, Optional, DeepPartial, etc.).

/** 允许为 null 的类型 */
export type Nullable<T> = T | null

/** 允许为 undefined 的类型 */
export type Optional<T> = T | undefined

/** 允许为 null 或 undefined 的类型 */
export type Maybe<T> = T | null | undefined

/** 获取对象所有 value 的联合类型 */
export type ValueOf<T> = T[keyof T]

/** 递归地将对象所有属性变为可选 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

/** 原始类型的联合 */
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined

/** 合并两个类型，U 的属性会覆盖 T 的同名属性 */
export type Merge<T, U> = Omit<T, keyof U> & U

/** 从对象类型 T 中排除指定属性 K */
export type Without<T, K extends keyof T> = Omit<T, K>

/** 只保留对象类型 T 的指定属性 K */
export type WithOnly<T, K extends keyof T> = Pick<T, K>

/** 递归地将对象所有属性变为只读 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

/** 递归地将对象所有属性变为可选 */
export type DeepOptional<T> = {
  [P in keyof T]?: DeepOptional<T[P]>
}

/** 递归地将对象所有属性变为必选 */
export type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>
}

/** 递归地将对象所有属性变为可变（非 readonly） */
export type DeepMutable<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]>
}

/** 获取函数参数类型组成的元组 */
export type ArgumentsType<T extends (...args: any) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never

/** 获取函数返回值类型 */
export type ReturnTypeOf<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any

/** 将联合类型转为交叉类型 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

/** 判断类型是否为 any */
export type IsAny<T> = 0 extends 1 & T ? true : false

// 你可以根据需要继续添加更多类型
