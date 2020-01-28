
/**
 * "config" store module
 */
import apiCall from '@/utils/api'
import duration from '@/utils/duration'
import i18n from '@/utils/locale'
import acl from '@/utils/acl'

const api = {
  getAdminRoles () {
    return apiCall({ url: 'config/admin_roles', method: 'get' })
  },
  getBaseActiveActive () {
    return apiCall({ url: 'config/base/active_active', method: 'get' })
  },
  getBaseAdvanced () {
    return apiCall({ url: 'config/base/advanced', method: 'get' })
  },
  getBaseAlerting () {
    return apiCall({ url: 'config/base/alerting', method: 'get' })
  },
  getBaseCaptivePortal () {
    return apiCall({ url: 'config/base/captive_portal', method: 'get' })
  },
  getBaseDatabase () {
    return apiCall({ url: 'config/base/database', method: 'get' })
  },
  getBaseDatabaseAdvanced () {
    return apiCall({ url: 'config/base/database_advanced', method: 'get' })
  },
  getBaseDatabaseEncryption () {
    return apiCall({ url: 'config/base/database_encryption', method: 'get' })
  },
  getBaseFencing () {
    return apiCall({ url: 'config/base/fencing', method: 'get' })
  },
  getBaseFingerbankDeviceChange () {
    return apiCall({ url: 'config/base/fingerbank_device_change', method: 'get' })
  },
  getBaseGeneral () {
    return apiCall({ url: 'config/base/general', method: 'get' })
  },
  getBaseGuestsAdminRegistration () {
    return apiCall({ url: 'config/base/guests_admin_registration', method: 'get' })
  },
  getBaseInline () {
    return apiCall({ url: 'config/base/inline', method: 'get' })
  },
  getBaseMseTab () {
    return apiCall({ url: 'config/base/mse_tab', method: 'get' })
  },
  getBaseNetwork () {
    return apiCall({ url: 'config/base/network', method: 'get' })
  },
  getBaseNodeImport () {
    return apiCall({ url: 'config/base/node_import', method: 'get' })
  },
  getBaseParking () {
    return apiCall({ url: 'config/base/parking', method: 'get' })
  },
  getBasePFDHCP () {
    return apiCall({ url: 'config/base/pfdhcp', method: 'get' })
  },
  getBasePorts () {
    return apiCall({ url: 'config/base/ports', method: 'get' })
  },
  getBaseProvisioning () {
    return apiCall({ url: 'config/base/provisioning', method: 'get' })
  },
  getBaseRadiusConfiguration () {
    return apiCall({ url: 'config/base/radius_configuration', method: 'get' })
  },
  getBaseDnsConfiguration () {
    return apiCall({ url: 'config/base/dns_configuration', method: 'get' })
  },
  getBaseServices () {
    return apiCall({ url: 'config/base/services', method: 'get' })
  },
  getBaseSNMPTraps () {
    return apiCall({ url: 'config/base/snmp_traps', method: 'get' })
  },
  getBaseWebServices () {
    return apiCall({ url: 'config/base/web_services', method: 'get' })
  },
  getBillingTiers () {
    return apiCall({ url: 'config/billing_tiers', method: 'get' })
  },
  getCheckup () {
    return apiCall({ url: 'config/checkup', method: 'get' })
  },
  getConnectionProfiles () {
    return apiCall({ url: 'config/connection_profiles', method: 'get' })
  },
  getSelfServices () {
    return apiCall({ url: 'config/self_services', method: 'get' })
  },
  getDomains () {
    return apiCall({ url: 'config/domains', method: 'get' })
  },
  getFirewalls () {
    return apiCall({ url: 'config/firewalls', method: 'get' })
  },
  getFloatingDevices () {
    return apiCall({ url: 'config/floating_devices', method: 'get' })
  },
  getInterfaces () {
    return apiCall({ url: 'config/interfaces', method: 'get' })
  },
  getLayer2Networks () {
    return apiCall({ url: 'config/l2_networks', method: 'get', params: { limit: 1000 } })
  },
  getMaintenanceTasks () {
    return apiCall({ url: 'config/maintenance_tasks', method: 'get' })
  },
  getPkiCas () {
    return apiCall({ url: 'pki/ca', method: 'get' })
  },
  getPkiProfiles () {
    return apiCall({ url: 'pki/profile', method: 'get' })
  },
  getPkiCerts () {
    return apiCall({ url: 'pki/cert', method: 'get' })
  },
  getPkiProviders () {
    return apiCall({ url: 'config/pki_providers', method: 'get' })
  },
  getPortalModules () {
    return apiCall({ url: 'config/portal_modules', method: 'get', params: { limit: 1000 } })
  },
  getProvisionings () {
    return apiCall({ url: 'config/provisionings', method: 'get' })
  },
  getRealms () {
    return apiCall({ url: 'config/realms', method: 'get' })
  },
  getRoles () {
    return apiCall({ url: 'node_categories', method: 'get', params: { limit: 1000 } })
  },
  getRoutedNetworks () {
    return apiCall({ url: 'config/routed_networks', method: 'get', params: { limit: 1000 } })
  },
  getScans () {
    return apiCall({ url: 'config/scans', method: 'get' })
  },
  getSecurityEvents () {
    return apiCall({ url: 'config/security_events', method: 'get', params: { limit: 1000 } })
  },
  getSources () {
    return apiCall({ url: 'config/sources', method: 'get' })
  },
  getSsids () {
    return apiCall({ url: 'reports/ssid', method: 'get' })
  },
  getSwitches () {
    return apiCall({ url: 'config/switches', method: 'get', params: { limit: 1000 } })
  },
  getSwitchGroups () {
    return apiCall({ url: 'config/switch_groups', method: 'get' })
  },
  getSyslogForwarders () {
    return apiCall({ url: 'config/syslog_forwarders', method: 'get' })
  },
  getSyslogParsers () {
    return apiCall({ url: 'config/syslog_parsers', method: 'get' })
  },
  getTenants () {
    return apiCall({ url: 'tenants', method: 'get' })
  },
  getTrafficShapingPolicies () {
    return apiCall({ url: 'config/traffic_shaping_policies', method: 'get' })
  },
  getWmiRules () {
    return apiCall({ url: 'config/wmi_rules', method: 'get' })
  },
  getWrixLocations () {
    return apiCall({ url: 'wrix_locations', method: 'get' })
  },
  postFixPermissions () {
    return apiCall({ url: 'config/fix_permissions', method: 'post' })
  }
}

const types = {
  LOADING: 'loading',
  DELETING: 'deleting',
  SUCCESS: 'success',
  ERROR: 'error'
}

const initialState = () => { // set intitial states to `false` (not `[]` or `{}`) to avoid infinite loop when response is empty.
  return {
    adminRoles: false,
    adminRolesStatus: '',
    baseActiveActive: false,
    baseActiveActiveStatus: '',
    baseAdvanced: false,
    baseAdvancedStatus: '',
    baseAlerting: false,
    baseAlertingStatus: '',
    baseCaptivePortal: false,
    baseCaptivePortalStatus: '',
    baseDatabase: false,
    baseDatabaseAdvanced: false,
    baseDatabaseAdvancedStatus: '',
    baseDatabaseEncryption: false,
    baseDatabaseEncryptionStatus: '',
    baseDatabaseStatus: '',
    baseFencing: false,
    baseFencingStatus: '',
    baseFingerbankDeviceChange: false,
    baseFingerbankDeviceChangeStatus: '',
    baseGeneral: false,
    baseGeneralStatus: '',
    baseGuestsAdminRegistration: false,
    baseGuestsAdminRegistrationStatus: '',
    baseInline: false,
    baseInlineStatus: '',
    baseMseTab: false,
    baseMseTabStatus: '',
    baseNetwork: false,
    baseNetworkStatus: '',
    baseNodeImport: false,
    baseNodeImportStatus: '',
    basePFDHCP: false,
    basePFDHCPStatus: '',
    baseParking: false,
    baseParkingStatus: '',
    basePorts: false,
    basePortsStatus: '',
    baseProvisioning: false,
    baseProvisioningStatus: '',
    baseRadiusConfiguration: false,
    baseRadiusConfigurationStatus: '',
    baseDnsConfiguration: false,
    baseDnsConfigurationStatus: '',
    baseSNMPTraps: false,
    baseSNMPTrapsStatus: '',
    baseServices: false,
    baseServicesStatus: '',
    baseWebServices: false,
    baseWebServicesStatus: '',
    billingTiers: false,
    billingTiersStatus: '',
    checkupStatus: '',
    connectionProfiles: false,
    connectionProfilesStatus: '',
    domains: false,
    domainsStatus: '',
    firewalls: false,
    firewallsStatus: '',
    fixPermissionsStatus: '',
    floatingDevices: false,
    floatingDevicesStatus: '',
    interfaces: false,
    interfacesStatus: '',
    layer2Networks: false,
    layer2NetworksStatus: '',
    maintenanceTasks: false,
    maintenanceTasksStatus: '',
    pkiCas: false,
    pkiCasStatus: '',
    pkiProfiles: false,
    pkiProfilesStatus: '',
    pkiCerts: false,
    pkiCertsStatus: '',
    pkiProviders: false,
    pkiProvidersStatus: '',
    portalModules: false,
    portalModulesStatus: '',
    provisionings: false,
    provisioningsStatus: '',
    realms: false,
    realmsStatus: '',
    roles: false,
    rolesStatus: '',
    routedNetworks: false,
    routedNetworksStatus: '',
    scans: false,
    scansStatus: '',
    securityEvents: false,
    securityEventsStatus: '',
    selfServices: false,
    selfServicesStatus: '',
    sources: false,
    sourcesStatus: '',
    ssids: false,
    ssidsStatus: '',
    switchGroups: false,
    switchGroupsStatus: '',
    switches: false,
    switchesStatus: '',
    syslogForwarders: false,
    syslogForwardersStatus: '',
    syslogParsers: false,
    syslogParsersStatus: '',
    tenants: false,
    tenantsStatus: '',
    trafficShapingPolicies: false,
    trafficShapingPoliciesStatus: '',
    wmiRules: false,
    wmiRulesStatus: '',
    wrixLocations: false,
    wrixLocationsStatus: ''
  }
}

const helpers = {
  sortSecurityEvents: (securityEvents) => {
    let sortedIds = Object.keys(securityEvents).sort((a, b) => {
      if (a === 'defaults') {
        return a
      } else if (!securityEvents[a].desc && !securityEvents[b].desc) {
        return a.localeCompare(b)
      } else if (!securityEvents[b].desc) {
        return a
      } else if (!securityEvents[a].desc) {
        return b
      } else {
        return securityEvents[a].desc.localeCompare(securityEvents[b].desc)
      }
    })
    let sortedSecurityEvents = []
    for (let id of sortedIds) {
      sortedSecurityEvents.push(securityEvents[id])
    }
    return sortedSecurityEvents
  },
  groupSwitches: (switches) => {
    let ret = []
    if (switches) {
      let groups = [...new Set(switches.map(sw => sw.group))]
      groups.forEach(function (group) {
        ret.push({ group: group, switches: switches.filter(sw => sw.group === group) })
      })
    }
    return ret
  }
}

const getters = {
  isLoadingAdminRoles: state => {
    return state.adminRolesStatus === types.LOADING
  },
  isLoadingBaseActiveActive: state => {
    return state.baseActiveActiveStatus === types.LOADING
  },
  isLoadingBaseAdvanced: state => {
    return state.baseAdvancedStatus === types.LOADING
  },
  isLoadingBaseAlerting: state => {
    return state.baseAlertingStatus === types.LOADING
  },
  isLoadingBaseCaptivePortal: state => {
    return state.baseCaptivePortalStatus === types.LOADING
  },
  isLoadingBaseDatabase: state => {
    return state.baseDatabaseStatus === types.LOADING
  },
  isLoadingBaseDatabaseAdvanced: state => {
    return state.baseDatabaseAdvancedStatus === types.LOADING
  },
  isLoadingBaseDatabaseEncryption: state => {
    return state.baseDatabaseEncryptionStatus === types.LOADING
  },
  isLoadingBaseFencing: state => {
    return state.baseFencingStatus === types.LOADING
  },
  isLoadingBaseFingerbankDeviceChange: state => {
    return state.baseFingerbankDeviceChangeStatus === types.LOADING
  },
  isLoadingBaseGeneral: state => {
    return state.baseGeneralStatus === types.LOADING
  },
  isLoadingBaseGuestsAdminRegistration: state => {
    return state.baseGuestsAdminRegistrationStatus === types.LOADING
  },
  isLoadingBaseInline: state => {
    return state.baseInlineStatus === types.LOADING
  },
  isLoadingBaseMseTab: state => {
    return state.baseMseTabStatus === types.LOADING
  },
  isLoadingBaseNetwork: state => {
    return state.baseNetworkStatus === types.LOADING
  },
  isLoadingBaseNodeImport: state => {
    return state.baseNodeImportStatus === types.LOADING
  },
  isLoadingBaseParking: state => {
    return state.baseParkingStatus === types.LOADING
  },
  isLoadingBasePFDHCP: state => {
    return state.basePFDHCPStatus === types.LOADING
  },
  isLoadingBasePorts: state => {
    return state.basePortsStatus === types.LOADING
  },
  isLoadingBaseProvisioning: state => {
    return state.baseProvisioningStatus === types.LOADING
  },
  isLoadingBaseRadiusConfiguration: state => {
    return state.baseRadiusConfigurationStatus === types.LOADING
  },
  isLoadingBaseServices: state => {
    return state.baseServicesStatus === types.LOADING
  },
  isLoadingBaseSNMPTraps: state => {
    return state.baseSNMPTrapsStatus === types.LOADING
  },
  isLoadingBaseWebServices: state => {
    return state.baseWebServicesStatus === types.LOADING
  },
  isLoadingBillingTiers: state => {
    return state.billingTiersStatus === types.LOADING
  },
  isLoadingCheckup: state => {
    return state.checkupStatus === types.LOADING
  },
  isLoadingConnectionProfiles: state => {
    return state.connectionProfilesStatus === types.LOADING
  },
  isLoadingSelfServices: state => {
    return state.selfServicesStatus === types.LOADING
  },
  isLoadingDomains: state => {
    return state.domainsStatus === types.LOADING
  },
  isLoadingFirewalls: state => {
    return state.firewallsStatus === types.LOADING
  },
  isLoadingFixPermissions: state => {
    return state.fixPermissionsStatus === types.LOADING
  },
  isLoadingFloatingDevices: state => {
    return state.floatingDevicesStatus === types.LOADING
  },
  isLoadingInterfaces: state => {
    return state.interfacesStatus === types.LOADING
  },
  isLoadingLayer2Networks: state => {
    return state.layer2NetworksStatus === types.LOADING
  },
  isLoadingMaintenanceTasks: state => {
    return state.maintenanceTasksStatus === types.LOADING
  },
  isLoadingPkiCas: state => {
    return state.pkiCasStatus === types.LOADING
  },
  isLoadingPkiProfiles: state => {
    return state.pkiProfilesStatus === types.LOADING
  },
  isLoadingPkiCerts: state => {
    return state.pkiCertsStatus === types.LOADING
  },
  isLoadingPkiProviders: state => {
    return state.pkiProvidersStatus === types.LOADING
  },
  isLoadingPortalModules: state => {
    return state.portalModulesStatus === types.LOADING
  },
  isLoadingProvisionings: state => {
    return state.provisioningsStatus === types.LOADING
  },
  isLoadingRealms: state => {
    return state.realmsStatus === types.LOADING
  },
  isLoadingRoles: state => {
    return state.rolesStatus === types.LOADING
  },
  isLoadingRoutedNetworks: state => {
    return state.routedNetworksStatus === types.LOADING
  },
  isLoadingScans: state => {
    return state.scansStatus === types.LOADING
  },
  isLoadingSecurityEvents: state => {
    return state.securityEventsStatus === types.LOADING
  },
  isLoadingSources: state => {
    return state.sourcesStatus === types.LOADING
  },
  isLoadingSsids: state => {
    return state.ssidsStatus === types.LOADING
  },
  isLoadingSwitches: state => {
    return state.switchesStatus === types.LOADING
  },
  isLoadingSwitchGroups: state => {
    return state.switchGroupsStatus === types.LOADING
  },
  isLoadingSyslogForwarders: state => {
    return state.syslogForwardersStatus === types.LOADING
  },
  isLoadingSyslogParsers: state => {
    return state.syslogParsersStatus === types.LOADING
  },
  isLoadingTenants: state => {
    return state.tenantsStatus === types.LOADING
  },
  isLoadingTrafficShapingPolicies: state => {
    return state.trafficShapingPoliciesStatus === types.LOADING
  },
  isLoadingWmiRules: state => {
    return state.wmiRulesStatus === types.LOADING
  },
  isLoadingWrixLocations: state => {
    return state.wrixLocationsStatus === types.LOADING
  },
  accessDurationsList: state => {
    if (!state.baseGuestsAdminRegistration) return []
    return state.baseGuestsAdminRegistration.access_duration_choices.split(',').map((accessDuration) => {
      return duration.deserialize(accessDuration)
    }).sort((a, b) => {
      return (a.sort > b.sort) ? 1 : -1
    })
  },
  adminRolesList: state => {
    if (!state.adminRoles) return []
    return state.adminRoles.map((item) => {
      return { value: item.id, name: item.id }
    })
  },
  domainsList: state => {
    if (!state.domains) return []
    return state.domains.map((item) => {
      return { value: item.id, name: item.id }
    })
  },
  connectionProfilesList: state => {
    if (!state.connectionProfiles) return []
    return state.connectionProfiles.map((item) => {
      return { value: item.id, name: item.id, text: ((item.description) ? `${item.id} - ${item.description}` : `${item.id}`) }
    })
  },
  portalModulesList: state => {
    if (!state.portalModules) return []
    return state.portalModules.map((item) => {
      return { value: item.id, name: item.description }
    })
  },
  realmsList: state => {
    if (!state.realms) return []
    return state.realms.map((item) => {
      return { value: item.id, name: item.id, text: item.id }
    })
  },
  rolesList: state => {
    if (!state.roles) return []
    return [
      ...[{ value: null, name: i18n.t('empty - None'), text: i18n.t('empty - None') }],
      ...state.roles.map((item) => {
        return { value: item.category_id, name: item.name, text: ((item.notes) ? `${item.name} - ${item.notes}` : `${item.name}`) }
      })
    ]
  },
  rootPortalModulesList: state => {
    if (!state.portalModules) return []
    return state.portalModules.filter(item => item.type === 'Root').map((item) => {
      return { value: item.id, name: item.description }
    })
  },
  sourcesList: state => {
    if (!state.sources) return []
    return state.sources.map((item) => {
      return { value: item.id, name: item.description, text: ((item.description) ? `${item.id} - ${item.description}` : `${item.id}`) }
    })
  },
  ssidsList: state => { // TODO - replace once `config/ssid` endpoint is available
    if (!state.ssids) return []
    return state.ssids.filter(item => item.ssid !== 'Total').map((item) => {
      return { value: item.ssid, name: item.ssid, text: item.ssid }
    })
  },
  switchGroupsList: state => {
    if (!state.switchGroups) return []
    return state.switchGroups.map((item) => {
      return { value: item.id, name: item.description }
    })
  },
  switchesList: state => {
    if (!state.switches) return []
    return state.switches.map((item) => {
      return { value: item.id, name: item.description }
    })
  },
  tenantsList: state => {
    if (!state.tenants) return []
    return state.tenants.map((item) => {
      return { value: item.id, name: item.name }
    })
  },
  securityEventsList: state => {
    return helpers.sortSecurityEvents(state.securityEvents).filter(securityEvent => securityEvent.enabled === 'Y').map((item) => {
      return { value: item.id, text: item.desc }
    })
  },
  sortedSecurityEvents: state => {
    return helpers.sortSecurityEvents(state.securityEvents)
  },
  groupedSwitches: state => {
    return helpers.groupSwitches(state.switches)
  }
}

const actions = {
  checkup: ({ getters, commit }) => {
    if (getters.isLoadingCheckup) {
      return
    }
    commit('CHECKUP_UPDATED', types.LOADING)
    return api.getCheckup().then(response => {
      commit('CHECKUP_UPDATED', types.SUCCESS)
      return response.data.items
    }).catch((err) => {
      commit('CHECKUP_UPDATED', types.ERROR)
      throw err
    })
  },
  fixPermissions: ({ getters, commit }) => {
    if (getters.isLoadingFixPermissions) {
      return
    }
    commit('FIX_PERMISSIONS_UPDATED', types.LOADING)
    return api.postFixPermissions().then(response => {
      commit('FIX_PERMISSIONS_UPDATED', types.SUCCESS)
      return response.data
    }).catch((err) => {
      commit('FIX_PERMISSIONS_UPDATED', types.ERROR)
      throw err
    })
  },
  getAdminRoles: ({ state, getters, commit }) => {
    if (getters.isLoadingAdminRoles) {
      return Promise.resolve(state.adminRoles)
    }
    if (!state.adminRoles) {
      commit('ADMIN_ROLES_REQUEST')
      return api.getAdminRoles().then(response => {
        commit('ADMIN_ROLES_UPDATED', response.data.items)
        return state.adminRoles
      })
    } else {
      return Promise.resolve(state.adminRoles)
    }
  },
  getBaseActiveActive: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseActiveActive) {
      return Promise.resolve(state.baseActiveActive)
    }
    if (!state.baseActiveActive) {
      commit('BASE_ACTIVE_ACTIVE_REQUEST')
      return api.getBaseActiveActive().then(response => {
        commit('BASE_ACTIVE_ACTIVE_UPDATED', response.data.item)
        return state.baseActiveActive
      })
    } else {
      return Promise.resolve(state.baseActiveActive)
    }
  },
  getBaseAdvanced: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseAdvanced) {
      return Promise.resolve(state.baseAdvanced)
    }
    if (!state.baseAdvanced) {
      commit('BASE_ADVANCED_REQUEST')
      return api.getBaseAdvanced().then(response => {
        commit('BASE_ADVANCED_UPDATED', response.data.item)
        return state.baseAdvanced
      })
    } else {
      return Promise.resolve(state.baseAdvanced)
    }
  },
  getBaseAlerting: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseAlerting) {
      return Promise.resolve(state.baseAlerting)
    }
    if (!state.baseAlerting) {
      commit('BASE_ALERTING_REQUEST')
      return api.getBaseAlerting().then(response => {
        commit('BASE_ALERTING_UPDATED', response.data.item)
        return state.baseAlerting
      })
    } else {
      return Promise.resolve(state.baseAlerting)
    }
  },
  getBaseCaptivePortal: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseCaptivePortal) {
      return Promise.resolve(state.baseCaptivePortal)
    }
    if (!state.baseCaptivePortal) {
      commit('BASE_CAPTIVE_PORTAL_REQUEST')
      return api.getBaseCaptivePortal().then(response => {
        commit('BASE_CAPTIVE_PORTAL_UPDATED', response.data.item)
        return state.baseCaptivePortal
      })
    } else {
      return Promise.resolve(state.baseCaptivePortal)
    }
  },
  getBaseDatabase: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseDatabase) {
      return Promise.resolve(state.baseDatabase)
    }
    if (!state.baseDatabase) {
      commit('BASE_DATABASE_REQUEST')
      return api.getBaseDatabase().then(response => {
        commit('BASE_DATABASE_UPDATED', response.data.item)
        return state.baseDatabase
      })
    } else {
      return Promise.resolve(state.baseDatabase)
    }
  },
  getBaseDatabaseAdvanced: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseDatabaseAdvanced) {
      return Promise.resolve(state.baseDatabaseAdvanced)
    }
    if (!state.baseDatabaseAdvanced) {
      commit('BASE_DATABASE_ADVANCED_REQUEST')
      return api.getBaseDatabaseAdvanced().then(response => {
        commit('BASE_DATABASE_ADVANCED_UPDATED', response.data.item)
        return state.baseDatabaseAdvanced
      })
    } else {
      return Promise.resolve(state.baseDatabaseAdvanced)
    }
  },
  getBaseDatabaseEncryption: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseDatabaseEncryption) {
      return Promise.resolve(state.baseDatabaseEncryption)
    }
    if (!state.baseDatabaseEncryption) {
      commit('BASE_DATABASE_ENCRYPTION_REQUEST')
      return api.getBaseDatabaseEncryption().then(response => {
        commit('BASE_DATABASE_ENCRYPTION_UPDATED', response.data.item)
        return state.baseDatabaseEncryption
      })
    } else {
      return Promise.resolve(state.baseDatabaseEncryption)
    }
  },
  getBaseFencing: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseFencing) {
      return Promise.resolve(state.baseFencing)
    }
    if (!state.baseFencing) {
      commit('BASE_FENCING_REQUEST')
      return api.getBaseFencing().then(response => {
        commit('BASE_FENCING_UPDATED', response.data.item)
        return state.baseFencing
      })
    } else {
      return Promise.resolve(state.baseFencing)
    }
  },
  getBaseFingerbankDeviceChange: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseFingerbankDeviceChange) {
      return Promise.resolve(state.baseFingerbankDeviceChange)
    }
    if (!state.baseFingerbankDeviceChange) {
      commit('BASE_FINGERBANK_DEVICE_CHANGE_REQUEST')
      return api.getBaseFingerbankDeviceChange().then(response => {
        commit('BASE_FINGERBANK_DEVICE_CHANGE_UPDATED', response.data.item)
        return state.baseFingerbankDeviceChange
      })
    } else {
      return Promise.resolve(state.baseFingerbankDeviceChange)
    }
  },
  getBaseGeneral: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseGeneral) {
      return Promise.resolve(state.baseGeneral)
    }
    if (!state.baseGeneral) {
      commit('BASE_GENERAL_REQUEST')
      return api.getBaseGeneral().then(response => {
        commit('BASE_GENERAL_UPDATED', response.data.item)
        return state.baseGeneral
      })
    } else {
      return Promise.resolve(state.baseGeneral)
    }
  },
  getBaseGuestsAdminRegistration: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseGuestsAdminRegistration) {
      return Promise.resolve(state.baseGuestsAdminRegistration)
    }
    if (!state.baseGuestsAdminRegistration) {
      commit('BASE_GUESTS_ADMIN_REGISTRATION_REQUEST')
      return api.getBaseGuestsAdminRegistration().then(response => {
        commit('BASE_GUESTS_ADMIN_REGISTRATION_UPDATED', response.data.item)
        return state.baseGuestsAdminRegistration
      })
    } else {
      return Promise.resolve(state.baseGuestsAdminRegistration)
    }
  },
  getBaseInline: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseInline) {
      return Promise.resolve(state.baseInline)
    }
    if (!state.baseInline) {
      commit('BASE_INLINE_REQUEST')
      return api.getBaseInline().then(response => {
        commit('BASE_INLINE_UPDATED', response.data.item)
        return state.baseInline
      })
    } else {
      return Promise.resolve(state.baseInline)
    }
  },
  getBaseMseTab: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseMseTab) {
      return Promise.resolve(state.baseMseTab)
    }
    if (!state.baseMseTab) {
      commit('BASE_MSE_TAB_REQUEST')
      return api.getBaseMseTab().then(response => {
        commit('BASE_MSE_TAB_UPDATED', response.data.item)
        return state.baseMseTab
      })
    } else {
      return Promise.resolve(state.baseMseTab)
    }
  },
  getBaseNetwork: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseNetwork) {
      return Promise.resolve(state.baseNetwork)
    }
    if (!state.baseNetwork) {
      commit('BASE_NETWORK_REQUEST')
      return api.getBaseNetwork().then(response => {
        commit('BASE_NETWORK_UPDATED', response.data.item)
        return state.baseNetwork
      })
    } else {
      return Promise.resolve(state.baseNetwork)
    }
  },
  getBaseNodeImport: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseNodeImport) {
      return Promise.resolve(state.baseNodeImport)
    }
    if (!state.baseNodeImport) {
      commit('BASE_NODE_IMPORT_REQUEST')
      return api.getBaseNodeImport().then(response => {
        commit('BASE_NODE_IMPORT_UPDATED', response.data.item)
        return state.baseNodeImport
      })
    } else {
      return Promise.resolve(state.baseNodeImport)
    }
  },
  getBaseParking: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseParking) {
      return Promise.resolve(state.baseParking)
    }
    if (!state.baseParking) {
      commit('BASE_PARKING_REQUEST')
      return api.getBaseParking().then(response => {
        commit('BASE_PARKING_UPDATED', response.data.item)
        return state.baseParking
      })
    } else {
      return Promise.resolve(state.baseParking)
    }
  },
  getBasePFDHCP: ({ state, getters, commit }) => {
    if (getters.isLoadingBasePFDHCP) {
      return Promise.resolve(state.basePFDHCP)
    }
    if (!state.basePFDHCP) {
      commit('BASE_PFDHCP_REQUEST')
      return api.getBasePFDHCP().then(response => {
        commit('BASE_PFDHCP_UPDATED', response.data.item)
        return state.basePFDHCP
      })
    } else {
      return Promise.resolve(state.basePFDHCP)
    }
  },
  getBasePorts: ({ state, getters, commit }) => {
    if (getters.isLoadingBasePorts) {
      return Promise.resolve(state.basePorts)
    }
    if (!state.basePorts) {
      commit('BASE_PORTS_REQUEST')
      return api.getBasePorts().then(response => {
        commit('BASE_PORTS_UPDATED', response.data.item)
        return state.basePorts
      })
    } else {
      return Promise.resolve(state.basePorts)
    }
  },
  getBaseProvisioning: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseProvisioning) {
      return Promise.resolve(state.baseProvisioning)
    }
    if (!state.baseProvisioning) {
      commit('BASE_PROVISIONING_REQUEST')
      return api.getBaseProvisioning().then(response => {
        commit('BASE_PROVISIONING_UPDATED', response.data.item)
        return state.baseProvisioning
      })
    } else {
      return Promise.resolve(state.baseProvisioning)
    }
  },
  getBaseRadiusConfiguration: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseRadiusConfiguration) {
      return Promise.resolve(state.baseRadiusConfiguration)
    }
    if (!state.baseRadiusConfiguration) {
      commit('BASE_RADIUS_CONFIGURATION_REQUEST')
      return api.getBaseRadiusConfiguration().then(response => {
        commit('BASE_RADIUS_CONFIGURATION_UPDATED', response.data.item)
        return state.baseRadiusConfiguration
      })
    } else {
      return Promise.resolve(state.baseRadiusConfiguration)
    }
  },
  getBaseDnsConfiguration: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseDnsConfiguration) {
      return Promise.resolve(state.baseDnsConfiguration)
    }
    if (!state.baseDnsConfiguration) {
      commit('BASE_DNS_CONFIGURATION_REQUEST')
      return api.getBaseDnsConfiguration().then(response => {
        commit('BASE_DNS_CONFIGURATION_UPDATED', response.data.item)
        return state.baseDnsConfiguration
      })
    } else {
      return Promise.resolve(state.baseDnsConfiguration)
    }
  },
  getBaseServices: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseServices) {
      return Promise.resolve(state.baseServices)
    }
    if (!state.baseServices) {
      commit('BASE_SERVICES_REQUEST')
      return api.getBaseServices().then(response => {
        commit('BASE_SERVICES_UPDATED', response.data.item)
        return state.baseServices
      })
    } else {
      return Promise.resolve(state.baseServices)
    }
  },
  getBaseSNMPTraps: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseSNMPTraps) {
      return Promise.resolve(state.baseSNMPTraps)
    }
    if (!state.baseSNMPTraps) {
      commit('BASE_SNMP_TRAPS_REQUEST')
      return api.getBaseSNMPTraps().then(response => {
        commit('BASE_SNMP_TRAPS_UPDATED', response.data.item)
        return state.baseSNMPTraps
      })
    } else {
      return Promise.resolve(state.baseSNMPTraps)
    }
  },
  getBaseWebServices: ({ state, getters, commit }) => {
    if (getters.isLoadingBaseWebServices) {
      return Promise.resolve(state.baseWebServices)
    }
    if (!state.baseWebServices) {
      commit('BASE_WEB_SERVICES_REQUEST')
      return api.getBaseWebServices().then(response => {
        commit('BASE_WEB_SERVICES_UPDATED', response.data.item)
        return state.baseWebServices
      })
    } else {
      return Promise.resolve(state.baseWebServices)
    }
  },
  getBillingTiers: ({ state, getters, commit }) => {
    if (getters.isLoadingBillingTiers) {
      return Promise.resolve(state.billingTiers)
    }
    if (!state.billingTiers) {
      commit('BILLING_TIERS_REQUEST')
      return api.getBillingTiers().then(response => {
        commit('BILLING_TIERS_UPDATED', response.data.items)
        return state.billingTiers
      })
    } else {
      return Promise.resolve(state.billingTiers)
    }
  },
  getConnectionProfiles: ({ state, getters, commit }) => {
    if (getters.isLoadingConnectionProfiles) {
      return Promise.resolve(state.connectionProfiles)
    }
    if (!state.connectionProfiles) {
      commit('CONNECTION_PROFILES_REQUEST')
      return api.getConnectionProfiles().then(response => {
        commit('CONNECTION_PROFILES_UPDATED', response.data.items)
        return state.connectionProfiles
      })
    } else {
      return Promise.resolve(state.connectionProfiles)
    }
  },
  getSelfServices: ({ state, getters, commit }) => {
    if (getters.isLoadingSelfServices) {
      return Promise.resolve(state.selfServices)
    }
    if (!state.selfServices) {
      commit('SELF_SERVICES_REQUEST')
      return api.getSelfServices().then(response => {
        commit('SELF_SERVICES_UPDATED', response.data.items)
        return state.selfServices
      })
    } else {
      return Promise.resolve(state.selfServices)
    }
  },
  getDomains: ({ state, getters, commit }) => {
    if (getters.isLoadingDomains) {
      return Promise.resolve(state.domains)
    }
    if (!state.domains) {
      commit('DOMAINS_REQUEST')
      return api.getDomains().then(response => {
        commit('DOMAINS_UPDATED', response.data.items)
        return state.domains
      })
    } else {
      return Promise.resolve(state.domains)
    }
  },
  getFirewalls: ({ state, getters, commit }) => {
    if (getters.isLoadingFirewalls) {
      return Promise.resolve(state.firewalls)
    }
    if (!state.firewalls) {
      commit('FIREWALLS_REQUEST')
      return api.getFirewalls().then(response => {
        commit('FIREWALLS_UPDATED', response.data.items)
        return state.firewalls
      })
    } else {
      return Promise.resolve(state.firewalls)
    }
  },
  getFloatingDevices: ({ state, getters, commit }) => {
    if (getters.isLoadingFloatingDevices) {
      return Promise.resolve(state.floatingDevices)
    }
    if (!state.floatingDevices) {
      commit('FLOATING_DEVICES_REQUEST')
      return api.getFloatingDevices().then(response => {
        commit('FLOATING_DEVICES_UPDATED', response.data.items)
        return state.floatingDevices
      })
    } else {
      return Promise.resolve(state.floatingDevices)
    }
  },
  getInterfaces: ({ state, getters, commit }) => {
    if (getters.isLoadingInterfaces) {
      return Promise.resolve(state.interfaces)
    }
    if (!state.interfaces) {
      commit('INTERFACES_REQUEST')
      return api.getInterfaces().then(response => {
        commit('INTERFACES_UPDATED', response.data.items)
        return state.interfaces
      })
    } else {
      return Promise.resolve(state.interfaces)
    }
  },
  getLayer2Networks: ({ state, getters, commit }) => {
    if (getters.isLoadingLayer2Networks) {
      return Promise.resolve(state.layer2Networks)
    }
    if (!state.layer2Networks) {
      commit('LAYER2_NETWORKS_REQUEST')
      return api.getLayer2Networks().then(response => {
        commit('LAYER2_NETWORKS_UPDATED', response.data.items)
        return state.layer2Networks
      })
    } else {
      return Promise.resolve(state.layer2Networks)
    }
  },
  getMaintenanceTasks: ({ state, getters, commit }) => {
    if (getters.isLoadingMaintenanceTasks) {
      return Promise.resolve(state.maintenanceTasks)
    }
    if (!state.maintenanceTasks) {
      commit('MAINTENANCE_TASKS_REQUEST')
      return api.getMaintenanceTasks().then(response => {
        commit('MAINTENANCE_TASKS_UPDATED', response.data.items)
        return state.maintenanceTasks
      })
    } else {
      return Promise.resolve(state.maintenanceTasks)
    }
  },
  getPkiCas: ({ state, getters, commit }) => {
    if (getters.isLoadingPkiCas) {
      return Promise.resolve(state.pkiCas)
    }
    if (!state.pkiCas) {
      commit('PKI_CAS_REQUEST')
      return api.getPkiCas().then(response => {
        const { data: { result: { 0: { Entries: items = [] } = {} } = {} } = {} } = response
        commit('PKI_CAS_UPDATED', items)
        return state.pkiCas
      })
    } else {
      return Promise.resolve(state.pkiCas)
    }
  },
  getPkiProfiles: ({ state, getters, commit }) => {
    if (getters.isLoadingPkiProfiles) {
      return Promise.resolve(state.pkiProfiles)
    }
    if (!state.pkiProfiles) {
      commit('PKI_PROFILES_REQUEST')
      return api.getPkiProfiles().then(response => {
        const { data: { result: { 0: { Entries: items = [] } = {} } = {} } = {} } = response
        commit('PKI_PROFILES_UPDATED', items)
        return state.pkiProfiles
      })
    } else {
      return Promise.resolve(state.pkiProfiles)
    }
  },
  getPkiCerts: ({ state, getters, commit }) => {
    if (getters.isLoadingPkiCerts) {
      return Promise.resolve(state.pkiCerts)
    }
    if (!state.pkiCerts) {
      commit('PKI_CERTS_REQUEST')
      return api.getPkiCerts().then(response => {
        const { data: { result: { 0: { Entries: items = [] } = {} } = {} } = {} } = response
        commit('PKI_CERTS_UPDATED', items)
        return state.pkiCerts
      })
    } else {
      return Promise.resolve(state.pkiCerts)
    }
  },
  getPkiProviders: ({ state, getters, commit }) => {
    if (getters.isLoadingPkiProviders) {
      return Promise.resolve(state.pkiProviders)
    }
    if (!state.pkiProviders) {
      commit('PKI_PROVIDERS_REQUEST')
      return api.getPkiProviders().then(response => {
        commit('PKI_PROVIDERS_UPDATED', response.data.items)
        return state.pkiProviders
      })
    } else {
      return Promise.resolve(state.pkiProviders)
    }
  },
  getPortalModules: ({ state, getters, commit }) => {
    if (getters.isLoadingPortalModules) {
      return Promise.resolve(state.portalModules)
    }
    if (!state.portalModules) {
      commit('PORTAL_MODULES_REQUEST')
      return api.getPortalModules().then(response => {
        commit('PORTAL_MODULES_UPDATED', response.data.items)
        return state.portalModules
      })
    } else {
      return Promise.resolve(state.portalModules)
    }
  },
  getProvisionings: ({ state, getters, commit }) => {
    if (getters.isLoadingProvisionings) {
      return Promise.resolve(state.provisionings)
    }
    if (!state.provisionings) {
      commit('PROVISIONINGS_REQUEST')
      return api.getProvisionings().then(response => {
        commit('PROVISIONINGS_UPDATED', response.data.items)
        return state.provisionings
      })
    } else {
      return Promise.resolve(state.provisionings)
    }
  },
  getRealms: ({ state, getters, commit }) => {
    if (getters.isLoadingRealms) {
      return Promise.resolve(state.realms)
    }
    if (!state.realms) {
      commit('REALMS_REQUEST')
      return api.getRealms().then(response => {
        commit('REALMS_UPDATED', response.data.items)
        return state.realms
      })
    } else {
      return Promise.resolve(state.realms)
    }
  },
  getRoles: ({ state, getters, commit }) => {
    if (getters.isLoadingRoles) {
      return Promise.resolve(state.roles)
    }
    if (!state.roles) {
      commit('ROLES_REQUEST')
      return api.getRoles().then(response => {
        commit('ROLES_UPDATED', response.data.items)
        return state.roles
      })
    } else {
      return Promise.resolve(state.roles)
    }
  },
  getRoutedNetworks: ({ state, getters, commit }) => {
    if (getters.isLoadingRoutedNetworks) {
      return Promise.resolve(state.routedNetworks)
    }
    if (!state.routedNetworks) {
      commit('ROUTED_NETWORKS_REQUEST')
      return api.getRoutedNetworks().then(response => {
        commit('ROUTED_NETWORKS_UPDATED', response.data.items)
        return state.routedNetworks
      })
    } else {
      return Promise.resolve(state.routedNetworks)
    }
  },
  getScans: ({ state, getters, commit }) => {
    if (getters.isLoadingScans) {
      return Promise.resolve(state.scans)
    }
    if (!state.scans) {
      commit('SCANS_REQUEST')
      return api.getScans().then(response => {
        commit('SCANS_UPDATED', response.data.items)
        return state.scans
      })
    } else {
      return Promise.resolve(state.scans)
    }
  },
  getSecurityEvents: ({ commit, getters, state }) => {
    if (getters.isLoadingSecurityEvents) {
      return Promise.resolve(state.securityEvents)
    }
    if (acl.$can('read', 'security_events')) {
      if (!state.securityEvents) {
        commit('SECURITY_EVENTS_REQUEST')
        return api.getSecurityEvents().then(response => {
          commit('SECURITY_EVENTS_UPDATED', response.data.items)
          return state.securityEvents
        })
      }
    } else {
      commit('SECURITY_EVENTS_UPDATED', [])
    }
    return Promise.resolve(state.securityEvents)
  },
  getSources: ({ state, getters, commit }) => {
    if (getters.isLoadingSources) {
      return Promise.resolve(state.sources)
    }
    if (!state.sources) {
      commit('SOURCES_REQUEST')
      return api.getSources().then(response => {
        commit('SOURCES_UPDATED', response.data.items)
        return state.sources
      })
    } else {
      return Promise.resolve(state.sources)
    }
  },
  getSsids: ({ state, getters, commit }) => {
    if (getters.isLoadingSsids) {
      return Promise.resolve(state.ssids)
    }
    if (!state.ssids) {
      commit('SSIDS_REQUEST')
      return api.getSsids().then(response => {
        commit('SSIDS_UPDATED', response.data.items)
        return state.ssids
      })
    } else {
      return Promise.resolve(state.ssids)
    }
  },
  getSwitches: ({ state, getters, commit }) => {
    if (getters.isLoadingSwitches) {
      return Promise.resolve(state.switches)
    }
    if (!state.switches) {
      commit('SWICTHES_REQUEST')
      return api.getSwitches().then(response => {
        // group can be undefined
        response.data.items.forEach(function (item, index) {
          response.data.items[index] = Object.assign({ group: item.group || 'Default' }, item)
        })
        commit('SWICTHES_UPDATED', response.data.items)
        return state.switches
      })
    } else {
      return Promise.resolve(state.switches)
    }
  },
  getSwitchGroups: ({ state, getters, commit }) => {
    if (getters.isLoadingSwitchGroups) {
      return Promise.resolve(state.switchGroups)
    }
    if (!state.switchGroups) {
      commit('SWICTH_GROUPS_REQUEST')
      return api.getSwitchGroups().then(response => {
        commit('SWICTH_GROUPS_UPDATED', response.data.items)
        return state.switchGroups
      })
    } else {
      return Promise.resolve(state.switchGroups)
    }
  },
  getSyslogForwarders: ({ state, getters, commit }) => {
    if (getters.isLoadingSyslogForwarders) {
      return Promise.resolve(state.syslogForwarders)
    }
    if (!state.syslogForwarders) {
      commit('SYSLOG_FORWARDERS_REQUEST')
      return api.getSyslogForwarders().then(response => {
        commit('SYSLOG_FORWARDERS_UPDATED', response.data.items)
        return state.syslogForwarders
      })
    } else {
      return Promise.resolve(state.syslogForwarders)
    }
  },
  getSyslogParsers: ({ state, getters, commit }) => {
    if (getters.isLoadingSyslogParsers) {
      return Promise.resolve(state.syslogParsers)
    }
    if (!state.syslogParsers) {
      commit('SYSLOG_PARSERS_REQUEST')
      return api.getSyslogParsers().then(response => {
        commit('SYSLOG_PARSERS_UPDATED', response.data.items)
        return state.syslogParsers
      })
    } else {
      return Promise.resolve(state.syslogParsers)
    }
  },
  getTenants: ({ state, getters, commit }) => {
    if (getters.isLoadingTenants) {
      return Promise.resolve(state.tenants)
    }
    if (!state.tenants) {
      commit('TENANTS_REQUEST')
      return api.getTenants().then(response => {
        commit('TENANTS_UPDATED', response.data.items)
        return state.tenants
      })
    } else {
      return Promise.resolve(state.tenants)
    }
  },
  getTrafficShapingPolicies: ({ state, getters, commit }) => {
    if (getters.isLoadingTrafficShapingPolicies) {
      return Promise.resolve(state.trafficShapingPolicies)
    }
    if (!state.trafficShapingPolicies) {
      commit('TRAFFIC_SHAPING_POLICIES_REQUEST')
      return api.getTrafficShapingPolicies().then(response => {
        commit('TRAFFIC_SHAPING_POLICIES_UPDATED', response.data.items)
        return state.trafficShapingPolicies
      })
    } else {
      return Promise.resolve(state.trafficShapingPolicies)
    }
  },
  getWmiRules: ({ commit, getters, state }) => {
    if (getters.isLoadingWmiRules) {
      return Promise.resolve(state.wmiRules)
    }
    if (!state.wmiRules) {
      commit('WMI_RULES_REQUEST')
      return api.getWmiRules().then(response => {
        commit('WMI_RULES_UPDATED', response.data.items)
        return state.wmiRules
      })
    } else {
      return Promise.resolve(state.wmiRules)
    }
  },
  getWrixLocations: ({ commit, getters, state }) => {
    if (getters.isLoadingWrixLocations) {
      return Promise.resolve(state.wrixLocations)
    }
    if (!state.wrixLocations) {
      commit('WRIX_LOCATIONS_REQUEST')
      return api.getWrixLocations().then(response => {
        commit('WRIX_LOCATIONS_UPDATED', response.data.items)
        return state.wrixLocations
      })
    } else {
      return Promise.resolve(state.wrixLocations)
    }
  }
}

const mutations = {
  ADMIN_ROLES_REQUEST: (state) => {
    state.adminRolesStatus = types.LOADING
  },
  ADMIN_ROLES_UPDATED: (state, adminRoles) => {
    state.adminRoles = adminRoles
    state.adminRolesStatus = types.SUCCESS
  },
  BASE_ACTIVE_ACTIVE_REQUEST: (state) => {
    state.baseActiveActiveStatus = types.LOADING
  },
  BASE_ACTIVE_ACTIVE_UPDATED: (state, baseActiveActive) => {
    state.baseActiveActive = baseActiveActive
    state.baseActiveActiveStatus = types.SUCCESS
  },
  BASE_ADVANCED_REQUEST: (state) => {
    state.baseAdvancedStatus = types.LOADING
  },
  BASE_ADVANCED_UPDATED: (state, baseAdvanced) => {
    state.baseAdvanced = baseAdvanced
    state.baseAdvancedStatus = types.SUCCESS
  },
  BASE_ALERTING_REQUEST: (state) => {
    state.baseAlertingStatus = types.LOADING
  },
  BASE_ALERTING_UPDATED: (state, baseAlerting) => {
    state.baseAlerting = baseAlerting
    state.baseAlertingStatus = types.SUCCESS
  },
  BASE_CAPTIVE_PORTAL_REQUEST: (state) => {
    state.baseCaptivePortalStatus = types.LOADING
  },
  BASE_CAPTIVE_PORTAL_UPDATED: (state, baseCaptivePortal) => {
    state.baseCaptivePortal = baseCaptivePortal
    state.baseCaptivePortalStatus = types.SUCCESS
  },
  BASE_DATABASE_REQUEST: (state) => {
    state.baseDatabaseStatus = types.LOADING
  },
  BASE_DATABASE_UPDATED: (state, baseDatabase) => {
    state.baseDatabase = baseDatabase
    state.baseDatabaseStatus = types.SUCCESS
  },
  BASE_DATABASE_ADVANCED_REQUEST: (state) => {
    state.baseDatabaseAdvancedStatus = types.LOADING
  },
  BASE_DATABASE_ADVANCED_UPDATED: (state, baseDatabaseAdvanced) => {
    state.baseDatabaseAdvanced = baseDatabaseAdvanced
    state.baseDatabaseAdvancedStatus = types.SUCCESS
  },
  BASE_DATABASE_ENCRYPTION_REQUEST: (state) => {
    state.baseDatabaseEncryptionStatus = types.LOADING
  },
  BASE_DATABASE_ENCRYPTION_UPDATED: (state, baseDatabaseEncryption) => {
    state.baseDatabaseEncryption = baseDatabaseEncryption
    state.baseDatabaseEncryptionStatus = types.SUCCESS
  },
  BASE_FENCING_REQUEST: (state) => {
    state.baseFencingStatus = types.LOADING
  },
  BASE_FENCING_UPDATED: (state, baseFencing) => {
    state.baseFencing = baseFencing
    state.baseFencingStatus = types.SUCCESS
  },
  BASE_FINGERBANK_DEVICE_CHANGE_REQUEST: (state) => {
    state.baseFingerbankDeviceChangeStatus = types.LOADING
  },
  BASE_FINGERBANK_DEVICE_CHANGE_UPDATED: (state, baseFingerbankDeviceChange) => {
    state.baseFingerbankDeviceChange = baseFingerbankDeviceChange
    state.baseFingerbankDeviceChangeStatus = types.SUCCESS
  },
  BASE_GENERAL_REQUEST: (state) => {
    state.baseGeneralStatus = types.LOADING
  },
  BASE_GENERAL_UPDATED: (state, baseGeneral) => {
    state.baseGeneral = baseGeneral
    state.baseGeneralStatus = types.SUCCESS
  },
  BASE_GUESTS_ADMIN_REGISTRATION_REQUEST: (state) => {
    state.baseGuestsAdminRegistrationStatus = types.LOADING
  },
  BASE_GUESTS_ADMIN_REGISTRATION_UPDATED: (state, baseGuestsAdminRegistration) => {
    state.baseGuestsAdminRegistration = baseGuestsAdminRegistration
    state.baseGuestsAdminRegistrationStatus = types.SUCCESS
  },
  BASE_GUESTS_ADMIN_REGISTRATION_DELETED: (state) => {
    state.baseGuestsAdminRegistration = false
  },
  BASE_INLINE_REQUEST: (state) => {
    state.baseInlineStatus = types.LOADING
  },
  BASE_INLINE_UPDATED: (state, baseInline) => {
    state.baseInline = baseInline
    state.baseInlineStatus = types.SUCCESS
  },
  BASE_MSE_TAB_REQUEST: (state) => {
    state.baseMseTabStatus = types.LOADING
  },
  BASE_MSE_TAB_UPDATED: (state, baseMseTab) => {
    state.baseMseTab = baseMseTab
    state.baseMseTabStatus = types.SUCCESS
  },
  BASE_NETWORK_REQUEST: (state) => {
    state.baseNetworkStatus = types.LOADING
  },
  BASE_NETWORK_UPDATED: (state, baseNetwork) => {
    state.baseNetwork = baseNetwork
    state.baseNetworkStatus = types.SUCCESS
  },
  BASE_NODE_IMPORT_REQUEST: (state) => {
    state.baseNodeImportStatus = types.LOADING
  },
  BASE_NODE_IMPORT_UPDATED: (state, baseNodeImport) => {
    state.baseNodeImport = baseNodeImport
    state.baseNodeImportStatus = types.SUCCESS
  },
  BASE_PARKING_REQUEST: (state) => {
    state.baseParkingStatus = types.LOADING
  },
  BASE_PARKING_UPDATED: (state, baseParking) => {
    state.baseParking = baseParking
    state.baseParkingStatus = types.SUCCESS
  },
  BASE_PFDHCP_REQUEST: (state) => {
    state.basePFDHCPStatus = types.LOADING
  },
  BASE_PFDHCP_UPDATED: (state, basePFDHCP) => {
    state.basePFDHCP = basePFDHCP
    state.basePFDHCPStatus = types.SUCCESS
  },
  BASE_PORTS_REQUEST: (state) => {
    state.basePortsStatus = types.LOADING
  },
  BASE_PORTS_UPDATED: (state, basePorts) => {
    state.basePorts = basePorts
    state.basePortsStatus = types.SUCCESS
  },
  BASE_PROVISIONING_REQUEST: (state) => {
    state.baseProvisioningStatus = types.LOADING
  },
  BASE_PROVISIONING_UPDATED: (state, baseProvisioning) => {
    state.baseProvisioning = baseProvisioning
    state.baseProvisioningStatus = types.SUCCESS
  },
  BASE_RADIUS_CONFIGURATION_REQUEST: (state) => {
    state.baseRadiusConfigurationStatus = types.LOADING
  },
  BASE_RADIUS_CONFIGURATION_UPDATED: (state, baseRadiusConfiguration) => {
    state.baseRadiusConfiguration = baseRadiusConfiguration
    state.baseRadiusConfigurationStatus = types.SUCCESS
  },
  BASE_DNS_CONFIGURATION_REQUEST: (state) => {
    state.baseDnsConfigurationStatus = types.LOADING
  },
  BASE_DNS_CONFIGURATION_UPDATED: (state, baseDnsConfiguration) => {
    state.baseDnsConfiguration = baseDnsConfiguration
    state.baseDnsConfigurationStatus = types.SUCCESS
  },
  BASE_SERVICES_REQUEST: (state) => {
    state.baseServicesStatus = types.LOADING
  },
  BASE_SERVICES_UPDATED: (state, baseServices) => {
    state.baseServices = baseServices
    state.baseServicesStatus = types.SUCCESS
  },
  BASE_SNMP_TRAPS_REQUEST: (state) => {
    state.baseSNMPTrapsStatus = types.LOADING
  },
  BASE_SNMP_TRAPS_UPDATED: (state, baseSNMPTraps) => {
    state.baseSNMPTraps = baseSNMPTraps
    state.baseSNMPTrapsStatus = types.SUCCESS
  },
  BASE_WEBSERVICES_REQUEST: (state) => {
    state.baseWebServicesStatus = types.LOADING
  },
  BASE_WEBSERVICES_UPDATED: (state, baseWebServices) => {
    state.baseWebServices = baseWebServices
    state.baseWebServicesStatus = types.SUCCESS
  },
  BILLING_TIERS_REQUEST: (state) => {
    state.billingTiersStatus = types.LOADING
  },
  BILLING_TIERS_UPDATED: (state, billingTiers) => {
    state.billingTiers = billingTiers
    state.billingTiersStatus = types.SUCCESS
  },
  CHECKUP_UPDATED: (state, status) => {
    state.checkupStatus = status
  },
  CONNECTION_PROFILES_REQUEST: (state) => {
    state.connectionProfilesStatus = types.LOADING
  },
  CONNECTION_PROFILES_UPDATED: (state, connectionProfiles) => {
    state.connectionProfiles = connectionProfiles
    state.connectionProfilesStatus = types.SUCCESS
  },
  SELF_SERVICES_REQUEST: (state) => {
    state.selfServicesStatus = types.LOADING
  },
  SELF_SERVICES_UPDATED: (state, selfServices) => {
    state.selfServices = selfServices
    state.selfServicesStatus = types.SUCCESS
  },
  DOMAINS_REQUEST: (state) => {
    state.domainsStatus = types.LOADING
  },
  DOMAINS_UPDATED: (state, domains) => {
    state.domains = domains
    state.domainsStatus = types.SUCCESS
  },
  FIREWALLS_REQUEST: (state) => {
    state.firewallsStatus = types.LOADING
  },
  FIREWALLS_UPDATED: (state, firewalls) => {
    state.firewalls = firewalls
    state.firewallsStatus = types.SUCCESS
  },
  FIX_PERMISSIONS_UPDATED: (state, status) => {
    state.fixPermissionsStatus = status
  },
  FLOATING_DEVICES_REQUEST: (state) => {
    state.floatingDevicesStatus = types.LOADING
  },
  FLOATING_DEVICES_UPDATED: (state, floatingDevices) => {
    state.floatingDevices = floatingDevices
    state.floatingDevicesStatus = types.SUCCESS
  },
  INTERFACES_REQUEST: (state) => {
    state.interfacesStatus = types.LOADING
  },
  INTERFACES_UPDATED: (state, interfaces) => {
    state.interfaces = interfaces
    state.interfacesStatus = types.SUCCESS
  },
  LAYER2_NETWORKS_REQUEST: (state) => {
    state.layer2NetworksStatus = types.LOADING
  },
  LAYER2_NETWORKS_UPDATED: (state, layer2Networks) => {
    state.layer2Networks = layer2Networks
    state.layer2NetworksStatus = types.SUCCESS
  },
  MAINTENANCE_TASKS_REQUEST: (state) => {
    state.maintenanceTasksStatus = types.LOADING
  },
  MAINTENANCE_TASKS_UPDATED: (state, maintenanceTasks) => {
    state.maintenanceTasks = maintenanceTasks
    state.maintenanceTasksStatus = types.SUCCESS
  },
  PKI_CAS_REQUEST: (state) => {
    state.pkiCasStatus = types.LOADING
  },
  PKI_CAS_UPDATED: (state, pkiCas) => {
    state.pkiCas = pkiCas
    state.pkiCasStatus = types.SUCCESS
  },
  PKI_PROFILES_REQUEST: (state) => {
    state.pkiProfilesStatus = types.LOADING
  },
  PKI_PROFILES_UPDATED: (state, pkiProfiles) => {
    state.pkiProfiles = pkiProfiles
    state.pkiProfilesStatus = types.SUCCESS
  },
  PKI_CERTS_REQUEST: (state) => {
    state.pkiCertsStatus = types.LOADING
  },
  PKI_CERTS_UPDATED: (state, pkiCerts) => {
    state.pkiCerts = pkiCerts
    state.pkiCertsStatus = types.SUCCESS
  },
  PKI_PROVIDERS_REQUEST: (state) => {
    state.pkiProvidersStatus = types.LOADING
  },
  PKI_PROVIDERS_UPDATED: (state, pkiProviders) => {
    state.pkiProviders = pkiProviders
    state.pkiProvidersStatus = types.SUCCESS
  },
  PORTAL_MODULES_REQUEST: (state) => {
    state.portalModulesStatus = types.LOADING
  },
  PORTAL_MODULES_UPDATED: (state, portalModules) => {
    state.portalModules = portalModules
    state.portalModulesStatus = types.SUCCESS
  },
  PROVISIONINGS_REQUEST: (state) => {
    state.provisioningsStatus = types.LOADING
  },
  PROVISIONINGS_UPDATED: (state, provisionings) => {
    state.provisionings = provisionings
    state.provisioningsStatus = types.SUCCESS
  },
  REALMS_REQUEST: (state) => {
    state.realmsStatus = types.LOADING
  },
  REALMS_UPDATED: (state, realms) => {
    state.realms = realms
    state.realmsStatus = types.SUCCESS
  },
  ROLES_REQUEST: (state) => {
    state.rolesStatus = types.LOADING
  },
  ROLES_UPDATED: (state, roles) => {
    state.roles = roles
    state.rolesStatus = types.SUCCESS
  },
  ROUTED_NETWORKS_REQUEST: (state) => {
    state.routedNetworksStatus = types.LOADING
  },
  ROUTED_NETWORKS_UPDATED: (state, routedNetworks) => {
    state.routedNetworks = routedNetworks
    state.routedNetworksStatus = types.SUCCESS
  },
  SCANS_REQUEST: (state) => {
    state.scansStatus = types.LOADING
  },
  SCANS_UPDATED: (state, scans) => {
    state.scans = scans
    state.scansStatus = types.SUCCESS
  },
  SECURITY_EVENTS_REQUEST: (state) => {
    state.securityEventsStatus = types.LOADING
  },
  SECURITY_EVENTS_UPDATED: (state, securityEvents) => {
    let ref = {}
    for (let securityEvent of securityEvents) {
      ref[securityEvent.id] = Object.assign({}, securityEvent)
    }
    state.securityEvents = ref
    state.securityEventsStatus = types.SUCCESS
  },
  SOURCES_REQUEST: (state) => {
    state.sourcesStatus = types.LOADING
  },
  SOURCES_UPDATED: (state, sources) => {
    state.sources = sources
    state.sourcesStatus = types.SUCCESS
  },
  SSIDS_REQUEST: (state) => {
    state.ssidsStatus = types.LOADING
  },
  SSIDS_UPDATED: (state, ssids) => {
    state.ssids = ssids
    state.ssidsStatus = types.SUCCESS
  },
  SWICTHES_REQUEST: (state) => {
    state.switchesStatus = types.LOADING
  },
  SWICTHES_UPDATED: (state, switches) => {
    state.switches = switches
    state.switchesStatus = types.SUCCESS
  },
  SWICTH_GROUPS_REQUEST: (state) => {
    state.switchGroupsStatus = types.LOADING
  },
  SWICTH_GROUPS_UPDATED: (state, switchGroups) => {
    state.switchGroups = switchGroups
    state.switchGroupsStatus = types.SUCCESS
  },
  SYSLOG_FORWARDERS_REQUEST: (state) => {
    state.syslogForwardersStatus = types.LOADING
  },
  SYSLOG_FORWARDERS_UPDATED: (state, syslogForwarders) => {
    state.syslogForwarders = syslogForwarders
    state.syslogForwardersStatus = types.SUCCESS
  },
  SYSLOG_PARSERS_REQUEST: (state) => {
    state.syslogParsersStatus = types.LOADING
  },
  SYSLOG_PARSERS_UPDATED: (state, syslogParsers) => {
    state.syslogParsers = syslogParsers
    state.syslogParsersStatus = types.SUCCESS
  },
  TENANTS_REQUEST: (state) => {
    state.tenantsStatus = types.LOADING
  },
  TENANTS_UPDATED: (state, tenants) => {
    state.tenants = tenants
    state.tenantsStatus = types.SUCCESS
  },
  TRAFFIC_SHAPING_POLICIES_REQUEST: (state) => {
    state.trafficShapingPoliciesStatus = types.LOADING
  },
  TRAFFIC_SHAPING_POLICIES_UPDATED: (state, trafficShapingPolicies) => {
    state.trafficShapingPolicies = trafficShapingPolicies
    state.trafficShapingPoliciesStatus = types.SUCCESS
  },
  WMI_RULES_REQUEST: (state) => {
    state.wmiRulesStatus = types.LOADING
  },
  WMI_RULES_UPDATED: (state, wmiRules) => {
    state.wmiRules = wmiRules
    state.wmiRulesStatus = types.SUCCESS
  },
  WRIX_LOCATIONS_REQUEST: (state) => {
    state.wrixLocationsStatus = types.LOADING
  },
  WRIX_LOCATIONS_UPDATED: (state, wrixLocations) => {
    state.wrixLocations = wrixLocations
    state.wrixLocationsStatus = types.SUCCESS
  },
  $RESET: (state) => {
    state = initialState()
  }
}

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations
}
