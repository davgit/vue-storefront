import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'

export function beforeRegistration ({ Vue, config, store, isServer }) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''

  StorageManager.set('compareCollection', new UniversalStorage(localForage.createInstance({
    name: dbNamePrefix + 'shop',
    storeName: 'compare',
    driver: localForage[config.localForage.defaultDrivers['compare']]
  })))
}