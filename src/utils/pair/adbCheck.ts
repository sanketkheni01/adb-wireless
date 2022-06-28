import { isAdbInstalled, isAdbVersionSupported } from './adbService.js'

export default function adbCheck() {
  if (!isAdbInstalled()) {
    throw new Error('ADB is not installed or PATH is not Configured')
  } else if (!isAdbVersionSupported()) {
    throw new Error('ADB is not updated. Please update to version 32 or later')
  }
}
