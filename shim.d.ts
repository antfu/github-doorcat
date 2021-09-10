import { Options } from './src/types'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    // define message protocol types
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    'get-options': null
    'set-options': Options
  }
}
