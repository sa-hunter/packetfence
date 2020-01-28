import store from '@/store'
import FormStore from '@/store/base/form'
import ConfigurationView from '../'
import AdminRolesStore from '../_store/adminRoles'
import AuthenticationSourcesStore from '../_store/sources'
import BasesStore from '../_store/bases'
import BillingTiersStore from '../_store/billingTiers'
import CertificatesStore from '../_store/certificates'
import ConnectionProfilesStore from '../_store/connectionProfiles'
import SelfServicesStore from '../_store/selfServices'
import DomainsStore from '../_store/domains'
import FiltersStore from '../_store/filters'
import FingerbankStore from '../_store/fingerbank'
import FirewallsStore from '../_store/firewalls'
import FloatingDevicesStore from '../_store/floatingDevices'
import InterfacesStore from '../_store/interfaces'
import Layer2NetworksStore from '../_store/layer2Networks'
import MaintenanceTasksStore from '../_store/maintenanceTasks'
import PkisStore from '../_store/pkis'
import PkiProvidersStore from '../_store/pkiProviders'
import PortalModulesStore from '../_store/portalModules'
import ProvisioningsStore from '../_store/provisionings'
import RealmsStore from '../_store/realms'
import RolesStore from '../_store/roles'
import RoutedNetworksStore from '../_store/routedNetworks'
import ScansStore from '../_store/scans'
import SecurityEventsStore from '../_store/securityEvents'
import SyslogForwardersStore from '../_store/syslogForwarders'
import SyslogParsersStore from '../_store/syslogParsers'
import SwitchesStore from '../_store/switches'
import SwitchGroupsStore from '../_store/switchGroups'
import TrafficShapingPoliciesStore from '../_store/trafficShapingPolicies'
import WmiRulesStore from '../_store/wmiRules'
import WrixLocationsStore from '../_store/wrixLocations'

/* Policies Access Control */
const PoliciesAccessControlSection = () => import(/* webpackChunkName: "Configuration" */ '../_components/PoliciesAccessControlSection')
const RolesList = () => import(/* webpackChunkName: "Configuration" */ '../_components/RolesList')
const RoleView = () => import(/* webpackChunkName: "Configuration" */ '../_components/RoleView')
const DomainsTabs = () => import(/* webpackChunkName: "Configuration" */ '../_components/DomainsTabs')
const DomainView = () => import(/* webpackChunkName: "Configuration" */ '../_components/DomainView')
const RealmView = () => import(/* webpackChunkName: "Configuration" */ '../_components/RealmView')
const AuthenticationSourcesList = () => import(/* webpackChunkName: "Configuration" */ '../_components/AuthenticationSourcesList')
const AuthenticationSourceView = () => import(/* webpackChunkName: "Configuration" */ '../_components/AuthenticationSourceView')
const NetworkDevicesTabs = () => import(/* webpackChunkName: "Configuration" */ '../_components/NetworkDevicesTabs')
const SwitchView = () => import(/* webpackChunkName: "Configuration" */ '../_components/SwitchView')
const SwitchGroupView = () => import(/* webpackChunkName: "Configuration" */ '../_components/SwitchGroupView')
const ConnectionProfilesList = () => import(/* webpackChunkName: "Configuration" */ '../_components/ConnectionProfilesList')
const ConnectionProfileView = () => import(/* webpackChunkName: "Configuration" */ '../_components/ConnectionProfileView')
const ConnectionProfileFileView = () => import(/* webpackChunkName: "Editor" */ '../_components/ConnectionProfileFileView')

/* Compliance */
const ComplianceSection = () => import(/* webpackChunkName: "Configuration" */ '../_components/ComplianceSection')
const FingerbankTabs = () => import(/* webpackChunkName: "Configuration" */ '../_components/FingerbankTabs')
const FingerbankCombinationView = () => import(/* webpackChunkName: "Configuration" */ '../_components/FingerbankCombinationView')
const FingerbankDeviceView = () => import(/* webpackChunkName: "Configuration" */ '../_components/FingerbankDeviceView')
const FingerbankDhcpFingerprintView = () => import(/* webpackChunkName: "Configuration" */ '../_components/FingerbankDhcpFingerprintView')
const FingerbankDhcpVendorView = () => import(/* webpackChunkName: "Configuration" */ '../_components/FingerbankDhcpVendorView')
const FingerbankDhcpv6FingerprintView = () => import(/* webpackChunkName: "Configuration" */ '../_components/FingerbankDhcpv6FingerprintView')
const FingerbankDhcpv6EnterpriseView = () => import(/* webpackChunkName: "Configuration" */ '../_components/FingerbankDhcpv6EnterpriseView')
const FingerbankMacVendorView = () => import(/* webpackChunkName: "Configuration" */ '../_components/FingerbankMacVendorView')
const FingerbankUserAgentView = () => import(/* webpackChunkName: "Configuration" */ '../_components/FingerbankUserAgentView')
const ScansTabs = () => import(/* webpackChunkName: "Configuration" */ '../_components/ScansTabs')
const ScanEngineView = () => import(/* webpackChunkName: "Configuration" */ '../_components/ScanEngineView')
const SecurityEventsList = () => import(/* webpackChunkName: "Configuration" */ '../_components/SecurityEventsList')
const SecurityEventView = () => import(/* webpackChunkName: "Configuration" */ '../_components/SecurityEventView')
const WmiRuleView = () => import(/* webpackChunkName: "Configuration" */ '../_components/WmiRuleView')

/* Integration */
const IntegrationSection = () => import(/* webpackChunkName: "Configuration" */ '../_components/IntegrationSection')
const FirewallsList = () => import(/* webpackChunkName: "Configuration" */ '../_components/FirewallsList')
const FirewallView = () => import(/* webpackChunkName: "Configuration" */ '../_components/FirewallView')
const CiscoMobilityServicesEngineView = () => import(/* webpackChunkName: "Configuration" */ '../_components/CiscoMobilityServicesEngineView')
const WebServicesView = () => import(/* webpackChunkName: "Configuration" */ '../_components/WebServicesView')
const SyslogParsersList = () => import(/* webpackChunkName: "Configuration" */ '../_components/SyslogParsersList')
const SyslogParserView = () => import(/* webpackChunkName: "Configuration" */ '../_components/SyslogParserView')
const SyslogForwardersList = () => import(/* webpackChunkName: "Configuration" */ '../_components/SyslogForwardersList')
const SyslogForwarderView = () => import(/* webpackChunkName: "Configuration" */ '../_components/SyslogForwarderView')
const WrixLocationsList = () => import(/* webpackChunkName: "Configuration" */ '../_components/WrixLocationsList')
const WrixLocationView = () => import(/* webpackChunkName: "Configuration" */ '../_components/WrixLocationView')
const PkisTabs = () => import(/* webpackChunkName: "Editor" */ '../_components/PkisTabs')
const PkiCaView = () => import(/* webpackChunkName: "Configuration" */ '../_components/PkiCaView')
const PkiProfileView = () => import(/* webpackChunkName: "Configuration" */ '../_components/PkiProfileView')
const PkiCertView = () => import(/* webpackChunkName: "Configuration" */ '../_components/PkiCertView')

/* Advanced Access Configuration */
const AdvancedAccessConfigurationSection = () => import(/* webpackChunkName: "Configuration" */ '../_components/AdvancedAccessConfigurationSection')
const CaptivePortalView = () => import(/* webpackChunkName: "Configuration" */ '../_components/CaptivePortalView')
const FilterEngineTabs = () => import(/* webpackChunkName: "Editor" */ '../_components/FilterEngineTabs')
const BillingTiersList = () => import(/* webpackChunkName: "Configuration" */ '../_components/BillingTiersList')
const BillingTierView = () => import(/* webpackChunkName: "Configuration" */ '../_components/BillingTierView')
const PkiProvidersList = () => import(/* webpackChunkName: "Configuration" */ '../_components/PkiProvidersList')
const PkiProviderView = () => import(/* webpackChunkName: "Configuration" */ '../_components/PkiProviderView')
const PortalModulesList = () => import(/* webpackChunkName: "Configuration" */ '../_components/PortalModulesList')
const PortalModuleView = () => import(/* webpackChunkName: "Configuration" */ '../_components/PortalModuleView')
const AccessDurationView = () => import(/* webpackChunkName: "Configuration" */ '../_components/AccessDurationView')
const ProvisioningsList = () => import(/* webpackChunkName: "Configuration" */ '../_components/ProvisioningsList')
const ProvisioningView = () => import(/* webpackChunkName: "Configuration" */ '../_components/ProvisioningView')
const SelfServicesList = () => import(/* webpackChunkName: "Configuration" */ '../_components/SelfServicesList')
const SelfServiceView = () => import(/* webpackChunkName: "Configuration" */ '../_components/SelfServiceView')

/* Network Configuration */
const NetworkConfigurationSection = () => import(/* webpackChunkName: "Configuration" */ '../_components/NetworkConfigurationSection')
const NetworksTabs = () => import(/* webpackChunkName: "Configuration" */ '../_components/NetworksTabs')
const InterfaceView = () => import(/* webpackChunkName: "Configuration" */ '../_components/InterfaceView')
const Layer2NetworkView = () => import(/* webpackChunkName: "Configuration" */ '../_components/Layer2NetworkView')
const RoutedNetworkView = () => import(/* webpackChunkName: "Configuration" */ '../_components/RoutedNetworkView')
const TrafficShapingView = () => import(/* webpackChunkName: "Configuration" */ '../_components/TrafficShapingView')
const SnmpTrapView = () => import(/* webpackChunkName: "Configuration" */ '../_components/SnmpTrapView')
const FloatingDevicesList = () => import(/* webpackChunkName: "Configuration" */ '../_components/FloatingDevicesList')
const FloatingDeviceView = () => import(/* webpackChunkName: "Configuration" */ '../_components/FloatingDeviceView')
const CertificatesView = () => import(/* webpackChunkName: "Configuration" */ '../_components/CertificatesView')

/* System Configuration */
const SystemConfigurationSection = () => import(/* webpackChunkName: "Configuration" */ '../_components/SystemConfigurationSection')
const MainTabs = () => import(/* webpackChunkName: "Configuration" */ '../_components/MainTabs')
const MaintenanceTaskView = () => import(/* webpackChunkName: "Configuration" */ '../_components/MaintenanceTaskView')
const DatabaseTabs = () => import(/* webpackChunkName: "Configuration" */ '../_components/DatabaseTabs')
const ActiveActiveView = () => import(/* webpackChunkName: "Configuration" */ '../_components/ActiveActiveView')
const RadiusView = () => import(/* webpackChunkName: "Configuration" */ '../_components/RadiusView')
const DnsView = () => import(/* webpackChunkName: "Configuration" */ '../_components/DnsView')
const AdminRolesList = () => import(/* webpackChunkName: "Configuration" */ '../_components/AdminRolesList')
const AdminRoleView = () => import(/* webpackChunkName: "Configuration" */ '../_components/AdminRoleView')

const route = {
  path: '/configuration',
  name: 'configuration',
  redirect: '/configuration/policies_access_control',
  component: ConfigurationView,
  meta: {
    transitionDelay: 300 * 2 // See _transitions.scss => $slide-bottom-duration
  },
  beforeEnter: (to, from, next) => {
    /**
     * Register Vuex stores
     */
    if (!store.state.$_admin_roles) {
      store.registerModule('$_admin_roles', AdminRolesStore)
    }
    if (!store.state.$_bases) {
      store.registerModule('$_bases', BasesStore)
    }
    if (!store.state.$_billing_tiers) {
      store.registerModule('$_billing_tiers', BillingTiersStore)
    }
    if (!store.state.$_domains) {
      store.registerModule('$_domains', DomainsStore)
    }
    if (!store.state.$_certificates) {
      store.registerModule('$_certificates', CertificatesStore)
    }
    if (!store.state.$_connection_profiles) {
      store.registerModule('$_connection_profiles', ConnectionProfilesStore)
    }
    if (!store.state.$_self_services) {
      store.registerModule('$_self_services', SelfServicesStore)
    }
    if (!store.state.$_filters) {
      store.registerModule('$_filters', FiltersStore)
    }
    if (!store.state.$_fingerbank) {
      store.registerModule('$_fingerbank', FingerbankStore)
    }
    if (!store.state.$_firewalls) {
      store.registerModule('$_firewalls', FirewallsStore)
    }
    if (!store.state.$_floatingdevices) {
      store.registerModule('$_floatingdevices', FloatingDevicesStore)
    }
    if (!store.state.$_interfaces) {
      store.registerModule('$_interfaces', InterfacesStore)
    }
    if (!store.state.$_layer2_networks) {
      store.registerModule('$_layer2_networks', Layer2NetworksStore)
    }
    if (!store.state.$_maintenance_tasks) {
      store.registerModule('$_maintenance_tasks', MaintenanceTasksStore)
    }
    if (!store.state.$_pkis) {
      store.registerModule('$_pkis', PkisStore)
    }
    if (!store.state.$_pki_providers) {
      store.registerModule('$_pki_providers', PkiProvidersStore)
    }
    if (!store.state.$_portalmodules) {
      store.registerModule('$_portalmodules', PortalModulesStore)
    }
    if (!store.state.$_provisionings) {
      store.registerModule('$_provisionings', ProvisioningsStore)
    }
    if (!store.state.$_realms) {
      store.registerModule('$_realms', RealmsStore)
    }
    if (!store.state.$_roles) {
      store.registerModule('$_roles', RolesStore)
    }
    if (!store.state.$_routed_networks) {
      store.registerModule('$_routed_networks', RoutedNetworksStore)
    }
    if (!store.state.$_scans) {
      store.registerModule('$_scans', ScansStore)
    }
    if (!store.state.$_security_events) {
      store.registerModule('$_security_events', SecurityEventsStore)
    }
    if (!store.state.$_sources) {
      store.registerModule('$_sources', AuthenticationSourcesStore)
    }
    if (!store.state.$_syslog_parsers) {
      store.registerModule('$_syslog_parsers', SyslogParsersStore)
    }
    if (!store.state.$_syslog_forwarders) {
      store.registerModule('$_syslog_forwarders', SyslogForwardersStore)
    }
    if (!store.state.$_switches) {
      store.registerModule('$_switches', SwitchesStore)
    }
    if (!store.state.$_switch_groups) {
      store.registerModule('$_switch_groups', SwitchGroupsStore)
    }
    if (!store.state.$_traffic_shaping_policies) {
      store.registerModule('$_traffic_shaping_policies', TrafficShapingPoliciesStore)
    }
    if (!store.state.$_wmi_rules) {
      store.registerModule('$_wmi_rules', WmiRulesStore)
    }
    if (!store.state.$_wrix_locations) {
      store.registerModule('$_wrix_locations', WrixLocationsStore)
    }
    next()
  },
  children: [
    /**
     * Policies Access Control
     */
    {
      path: 'policies_access_control',
      component: PoliciesAccessControlSection,
      meta: {
        can: 'read configuration_main',
        fail: '/'
      }
    },
    {
      path: 'roles',
      name: 'roles',
      component: RolesList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'roles/new',
      name: 'newRole',
      component: RoleView,
      props: () => ({ formStoreName: 'formRole', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formRole) { // Register store module only once
          store.registerModule('formRole', FormStore)
        }
        next()
      }
    },
    {
      path: 'role/:id',
      name: 'role',
      component: RoleView,
      props: (route) => ({ formStoreName: 'formRole', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formRole) { // Register store module only once
          store.registerModule('formRole', FormStore)
        }
        store.dispatch('$_roles/getRole', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'role/:id/clone',
      name: 'cloneRole',
      component: RoleView,
      props: (route) => ({ formStoreName: 'formRole', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formRole) { // Register store module only once
          store.registerModule('formRole', FormStore)
        }
        store.dispatch('$_roles/getRole', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'domains',
      name: 'domains',
      component: DomainsTabs,
      props: (route) => ({ tab: 'domains', autoJoinDomain: route.params.autoJoinDomain, query: route.query.query })
    },
    {
      path: 'domains/new',
      name: 'newDomain',
      component: DomainView,
      props: () => ({ formStoreName: 'formDomain', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formDomain) { // Register store module only once
          store.registerModule('formDomain', FormStore)
        }
        next()
      }
    },
    {
      path: 'domain/:id',
      name: 'domain',
      component: DomainView,
      props: (route) => ({ formStoreName: 'formDomain', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formDomain) { // Register store module only once
          store.registerModule('formDomain', FormStore)
        }
        store.dispatch('$_domains/getDomain', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'domain/:id/clone',
      name: 'cloneDomain',
      component: DomainView,
      props: (route) => ({ formStoreName: 'formDomain', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formDomain) { // Register store module only once
          store.registerModule('formDomain', FormStore)
        }
        store.dispatch('$_domains/getDomain', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'realms',
      name: 'realms',
      component: DomainsTabs,
      props: (route) => ({ tab: 'realms', query: route.query.query })
    },
    {
      path: 'realms/new',
      name: 'newRealm',
      component: RealmView,
      props: () => ({ formStoreName: 'formRealm', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formRealm) { // Register store module only once
          store.registerModule('formRealm', FormStore)
        }
        next()
      }
    },
    {
      path: 'realm/:id',
      name: 'realm',
      component: RealmView,
      props: (route) => ({ formStoreName: 'formRealm', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formRealm) { // Register store module only once
          store.registerModule('formRealm', FormStore)
        }
        store.dispatch('$_realms/getRealm', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'realm/:id/clone',
      name: 'cloneRealm',
      component: RealmView,
      props: (route) => ({ formStoreName: 'formRealm', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formRealm) { // Register store module only once
          store.registerModule('formRealm', FormStore)
        }
        store.dispatch('$_realms/getRealm', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'sources',
      name: 'sources',
      component: AuthenticationSourcesList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'sources/new/:sourceType',
      name: 'newAuthenticationSource',
      component: AuthenticationSourceView,
      props: (route) => ({ formStoreName: 'formAuthenticationSource', isNew: true, sourceType: route.params.sourceType }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formAuthenticationSource) { // Register store module only once
          store.registerModule('formAuthenticationSource', FormStore)
        }
        next()
      }
    },
    {
      path: 'source/:id',
      name: 'source',
      component: AuthenticationSourceView,
      props: (route) => ({ formStoreName: 'formAuthenticationSource', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formAuthenticationSource) { // Register store module only once
          store.registerModule('formAuthenticationSource', FormStore)
        }
        store.dispatch('$_sources/getAuthenticationSource', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'source/:id/clone',
      name: 'cloneAuthenticationSource',
      component: AuthenticationSourceView,
      props: (route) => ({ formStoreName: 'formAuthenticationSource', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formAuthenticationSource) { // Register store module only once
          store.registerModule('formAuthenticationSource', FormStore)
        }
        store.dispatch('$_sources/getAuthenticationSource', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'switches',
      name: 'switches',
      component: NetworkDevicesTabs,
      props: (route) => ({ tab: 'switches', query: route.query.query })
    },
    {
      path: 'switches/new/:switchGroup',
      name: 'newSwitch',
      component: SwitchView,
      props: (route) => ({ formStoreName: 'formSwitch', isNew: true, switchGroup: route.params.switchGroup }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSwitch) { // Register store module only once
          store.registerModule('formSwitch', FormStore)
        }
        next()
      }
    },
    {
      path: 'switch/:id',
      name: 'switch',
      component: SwitchView,
      props: (route) => ({ formStoreName: 'formSwitch', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSwitch) { // Register store module only once
          store.registerModule('formSwitch', FormStore)
        }
        store.dispatch('$_switches/getSwitch', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'switch/:id/clone',
      name: 'cloneSwitch',
      component: SwitchView,
      props: (route) => ({ formStoreName: 'formSwitch', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSwitch) { // Register store module only once
          store.registerModule('formSwitch', FormStore)
        }
        store.dispatch('$_switches/getSwitch', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'switch_groups',
      name: 'switch_groups',
      component: NetworkDevicesTabs,
      props: (route) => ({ tab: 'switch_groups', query: route.query.query })
    },
    {
      path: 'switch_groups/new',
      name: 'newSwitchGroup',
      component: SwitchGroupView,
      props: () => ({ formStoreName: 'formSwitchGroup', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSwitchGroup) { // Register store module only once
          store.registerModule('formSwitchGroup', FormStore)
        }
        next()
      }
    },
    {
      path: 'switch_group/:id',
      name: 'switch_group',
      component: SwitchGroupView,
      props: (route) => ({ formStoreName: 'formSwitchGroup', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSwitchGroup) { // Register store module only once
          store.registerModule('formSwitchGroup', FormStore)
        }
        store.dispatch('$_switch_groups/getSwitchGroup', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'switch_group/:id/clone',
      name: 'cloneSwitchGroup',
      component: SwitchGroupView,
      props: (route) => ({ formStoreName: 'formSwitchGroup', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSwitchGroup) { // Register store module only once
          store.registerModule('formSwitchGroup', FormStore)
        }
        store.dispatch('$_switch_groups/getSwitchGroup', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'connection_profiles',
      name: 'connection_profiles',
      component: ConnectionProfilesList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'connection_profiles/new',
      name: 'newConnectionProfile',
      component: ConnectionProfileView,
      props: () => ({ formStoreName: 'formConnectionProfile', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formConnectionProfile) { // Register store module only once
          store.registerModule('formConnectionProfile', FormStore)
        }
        next()
      }
    },
    {
      path: 'connection_profile/:id',
      name: 'connection_profile',
      component: ConnectionProfileView,
      props: (route) => ({ formStoreName: 'formConnectionProfile', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formConnectionProfile) { // Register store module only once
          store.registerModule('formConnectionProfile', FormStore)
        }
        store.dispatch('$_connection_profiles/getConnectionProfile', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'connection_profile/:id/clone',
      name: 'cloneConnectionProfile',
      component: ConnectionProfileView,
      props: (route) => ({ formStoreName: 'formConnectionProfile', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formConnectionProfile) { // Register store module only once
          store.registerModule('formConnectionProfile', FormStore)
        }
        store.dispatch('$_connection_profiles/getConnectionProfile', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'connection_profile/:id/files',
      name: 'connectionProfileFiles',
      component: ConnectionProfileView,
      props: (route) => ({ formStoreName: 'formConnectionProfile', id: route.params.id, tabIndex: 2 }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formConnectionProfile) { // Register store module only once
          store.registerModule('formConnectionProfile', FormStore)
        }
        store.dispatch('$_connection_profiles/getConnectionProfile', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'connection_profile/:id/files/:path/new',
      name: 'newConnectionProfileFile',
      component: ConnectionProfileFileView,
      props: (route) => ({ formStoreName: 'formConnectionProfile', id: route.params.id, filename: route.params.path, isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formConnectionProfile) { // Register store module only once
          store.registerModule('formConnectionProfile', FormStore)
        }
        next()
      }
    },
    {
      path: 'connection_profile/:id/files/:filename',
      name: 'connectionProfileFile',
      component: ConnectionProfileFileView,
      props: (route) => ({ formStoreName: 'formConnectionProfile', id: route.params.id, filename: route.params.filename }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formConnectionProfile) { // Register store module only once
          store.registerModule('formConnectionProfile', FormStore)
        }
        next()
      }
    },
    /**
     * Compliance
     */
    {
      path: 'compliance',
      component: ComplianceSection
    },
    {
      path: 'fingerbank',
      redirect: 'fingerbank/general_settings'
    },
    {
      path: 'fingerbank/general_settings',
      name: 'fingerbankGeneralSettings',
      component: FingerbankTabs,
      props: (route) => ({ tab: 'general_settings', query: route.query.query })
    },
    {
      path: 'fingerbank/device_change_detection',
      name: 'fingerbankDeviceChangeDetection',
      component: FingerbankTabs,
      props: (route) => ({ tab: 'device_change_detection', query: route.query.query })
    },
    {
      path: 'fingerbank/combinations',
      name: 'fingerbankCombinations',
      component: FingerbankTabs,
      props: (route) => ({ tab: 'combinations', query: route.query.query })
    },
    {
      path: 'fingerbank/local/combinations/new',
      name: 'newFingerbankCombination',
      component: FingerbankCombinationView,
      props: () => ({ formStoreName: 'formFingerbankCombination', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankCombination) { // Register store module only once
          store.registerModule('formFingerbankCombination', FormStore)
        }
        next()
      }
    },
    {
      path: 'fingerbank/local/combination/:id',
      name: 'fingerbankCombination',
      component: FingerbankCombinationView,
      props: (route) => ({ formStoreName: 'formFingerbankCombination', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankCombination) { // Register store module only once
          store.registerModule('formFingerbankCombination', FormStore)
        }
        store.dispatch('$_fingerbank/getCombination', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/local/combination/:id/clone',
      name: 'cloneFingerbankCombination',
      component: FingerbankCombinationView,
      props: (route) => ({ formStoreName: 'formFingerbankCombination', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankCombination) { // Register store module only once
          store.registerModule('formFingerbankCombination', FormStore)
        }
        store.dispatch('$_fingerbank/getCombination', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/devices',
      name: 'fingerbankDevices',
      component: FingerbankTabs,
      props: (route) => ({ tab: 'devices', query: route.query.query })
    },
    {
      path: 'fingerbank/devices/:parentId',
      name: 'fingerbankDevicesByParentId',
      component: FingerbankTabs,
      props: (route) => ({ parentId: route.params.parentId, tab: 'devices', query: route.query.query })
    },
    {
      path: 'fingerbank/:scope/devices/new',
      name: 'newFingerbankDevice',
      component: FingerbankDeviceView,
      props: (route) => ({ formStoreName: 'formFingerbankDevice', scope: route.params.scope, isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDevice) { // Register store module only once
          store.registerModule('formFingerbankDevice', FormStore)
        }
        next()
      }
    },
    {
      path: 'fingerbank/:scope/device/:id',
      name: 'fingerbankDevice',
      component: FingerbankDeviceView,
      props: (route) => ({ formStoreName: 'formFingerbankDevice', scope: route.params.scope, id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDevice) { // Register store module only once
          store.registerModule('formFingerbankDevice', FormStore)
        }
        store.dispatch('$_fingerbank/getDevice', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/:scope/device/:id/clone',
      name: 'cloneFingerbankDevice',
      component: FingerbankDeviceView,
      props: (route) => ({ formStoreName: 'formFingerbankDevice', scope: route.params.scope, id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDevice) { // Register store module only once
          store.registerModule('formFingerbankDevice', FormStore)
        }
        store.dispatch('$_fingerbank/getDevice', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/dhcp_fingerprints',
      name: 'fingerbankDhcpFingerprints',
      component: FingerbankTabs,
      props: (route) => ({ tab: 'dhcp_fingerprints', query: route.query.query })
    },
    {
      path: 'fingerbank/:scope/dhcp_fingerprints/new',
      name: 'newFingerbankDhcpFingerprint',
      component: FingerbankDhcpFingerprintView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpFingerprint', scope: route.params.scope, isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpFingerprint) { // Register store module only once
          store.registerModule('formFingerbankDhcpFingerprint', FormStore)
        }
        next()
      }
    },
    {
      path: 'fingerbank/:scope/dhcp_fingerprint/:id',
      name: 'fingerbankDhcpFingerprint',
      component: FingerbankDhcpFingerprintView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpFingerprint', scope: route.params.scope, id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpFingerprint) { // Register store module only once
          store.registerModule('formFingerbankDhcpFingerprint', FormStore)
        }
        store.dispatch('$_fingerbank/getDhcpFingerprint', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/:scope/dhcp_fingerprint/:id/clone',
      name: 'cloneFingerbankDhcpFingerprint',
      component: FingerbankDhcpFingerprintView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpFingerprint', scope: route.params.scope, id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpFingerprint) { // Register store module only once
          store.registerModule('formFingerbankDhcpFingerprint', FormStore)
        }
        store.dispatch('$_fingerbank/getDhcpFingerprint', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/dhcp_vendors',
      name: 'fingerbankDhcpVendors',
      component: FingerbankTabs,
      props: (route) => ({ tab: 'dhcp_vendors', query: route.query.query })
    },
    {
      path: 'fingerbank/:scope/dhcp_vendors/new',
      name: 'newFingerbankDhcpVendor',
      component: FingerbankDhcpVendorView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpVendor', scope: route.params.scope, isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpVendor) { // Register store module only once
          store.registerModule('formFingerbankDhcpVendor', FormStore)
        }
        next()
      }
    },
    {
      path: 'fingerbank/:scope/dhcp_vendor/:id',
      name: 'fingerbankDhcpVendor',
      component: FingerbankDhcpVendorView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpVendor', scope: route.params.scope, id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpVendor) { // Register store module only once
          store.registerModule('formFingerbankDhcpVendor', FormStore)
        }
        store.dispatch('$_fingerbank/getDhcpVendor', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/:scope/dhcp_vendor/:id/clone',
      name: 'cloneFingerbankDhcpVendor',
      component: FingerbankDhcpVendorView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpVendor', scope: route.params.scope, id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpVendor) { // Register store module only once
          store.registerModule('formFingerbankDhcpVendor', FormStore)
        }
        store.dispatch('$_fingerbank/getDhcpVendor', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/dhcpv6_fingerprints',
      name: 'fingerbankDhcpv6Fingerprints',
      component: FingerbankTabs,
      props: (route) => ({ tab: 'dhcpv6_fingerprints', query: route.query.query })
    },
    {
      path: 'fingerbank/:scope/dhcpv6_fingerprints/new',
      name: 'newFingerbankDhcpv6Fingerprint',
      component: FingerbankDhcpv6FingerprintView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpv6Fingerprint', scope: route.params.scope, isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpv6Fingerprint) { // Register store module only once
          store.registerModule('formFingerbankDhcpv6Fingerprint', FormStore)
        }
        next()
      }
    },
    {
      path: 'fingerbank/:scope/dhcpv6_fingerprint/:id',
      name: 'fingerbankDhcpv6Fingerprint',
      component: FingerbankDhcpv6FingerprintView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpv6Fingerprint', scope: route.params.scope, id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpv6Fingerprint) { // Register store module only once
          store.registerModule('formFingerbankDhcpv6Fingerprint', FormStore)
        }
        store.dispatch('$_fingerbank/getDhcpv6Fingerprint', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/:scope/dhcpv6_fingerprint/:id/clone',
      name: 'cloneFingerbankDhcpv6Fingerprint',
      component: FingerbankDhcpv6FingerprintView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpv6Fingerprint', scope: route.params.scope, id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpv6Fingerprint) { // Register store module only once
          store.registerModule('formFingerbankDhcpv6Fingerprint', FormStore)
        }
        store.dispatch('$_fingerbank/getDhcpv6Fingerprint', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/dhcpv6_enterprises',
      name: 'fingerbankDhcpv6Enterprises',
      component: FingerbankTabs,
      props: (route) => ({ tab: 'dhcpv6_enterprises', query: route.query.query })
    },
    {
      path: 'fingerbank/:scope/dhcpv6_enterprises/new',
      name: 'newFingerbankDhcpv6Enterprise',
      component: FingerbankDhcpv6EnterpriseView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpv6Enterprise', scope: route.params.scope, isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpv6Enterprise) { // Register store module only once
          store.registerModule('formFingerbankDhcpv6Enterprise', FormStore)
        }
        next()
      }
    },
    {
      path: 'fingerbank/:scope/dhcpv6_enterprise/:id',
      name: 'fingerbankDhcpv6Enterprise',
      component: FingerbankDhcpv6EnterpriseView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpv6Enterprise', scope: route.params.scope, id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpv6Enterprise) { // Register store module only once
          store.registerModule('formFingerbankDhcpv6Enterprise', FormStore)
        }
        store.dispatch('$_fingerbank/getDhcpv6Enterprise', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/:scope/dhcpv6_enterprise/:id/clone',
      name: 'cloneFingerbankDhcpv6Enterprise',
      component: FingerbankDhcpv6EnterpriseView,
      props: (route) => ({ formStoreName: 'formFingerbankDhcpv6Enterprise', scope: route.params.scope, id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankDhcpv6Enterprise) { // Register store module only once
          store.registerModule('formFingerbankDhcpv6Enterprise', FormStore)
        }
        store.dispatch('$_fingerbank/getDhcpv6Enterprise', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/mac_vendors',
      name: 'fingerbankMacVendors',
      component: FingerbankTabs,
      props: (route) => ({ tab: 'mac_vendors', query: route.query.query })
    },
    {
      path: 'fingerbank/:scope/mac_vendors/new',
      name: 'newFingerbankMacVendor',
      component: FingerbankMacVendorView,
      props: (route) => ({ formStoreName: 'formFingerbankMacVendor', scope: route.params.scope, isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankMacVendor) { // Register store module only once
          store.registerModule('formFingerbankMacVendor', FormStore)
        }
        next()
      }
    },
    {
      path: 'fingerbank/:scope/mac_vendor/:id',
      name: 'fingerbankMacVendor',
      component: FingerbankMacVendorView,
      props: (route) => ({ formStoreName: 'formFingerbankMacVendor', scope: route.params.scope, id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankMacVendor) { // Register store module only once
          store.registerModule('formFingerbankMacVendor', FormStore)
        }
        store.dispatch('$_fingerbank/getMacVendor', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/:scope/mac_vendor/:id/clone',
      name: 'cloneFingerbankMacVendor',
      component: FingerbankMacVendorView,
      props: (route) => ({ formStoreName: 'formFingerbankMacVendor', scope: route.params.scope, id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankMacVendor) { // Register store module only once
          store.registerModule('formFingerbankMacVendor', FormStore)
        }
        store.dispatch('$_fingerbank/getMacVendor', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/user_agents',
      name: 'fingerbankUserAgents',
      component: FingerbankTabs,
      props: (route) => ({ tab: 'user_agents', query: route.query.query })
    },
    {
      path: 'fingerbank/local/user_agents/new',
      name: 'newFingerbankUserAgent',
      component: FingerbankUserAgentView,
      props: () => ({ formStoreName: 'formFingerbankUserAgent', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankUserAgent) { // Register store module only once
          store.registerModule('formFingerbankUserAgent', FormStore)
        }
        next()
      }
    },
    {
      path: 'fingerbank/local/user_agent/:id',
      name: 'fingerbankUserAgent',
      component: FingerbankUserAgentView,
      props: (route) => ({ formStoreName: 'formFingerbankUserAgent', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankUserAgent) { // Register store module only once
          store.registerModule('formFingerbankUserAgent', FormStore)
        }
        store.dispatch('$_fingerbank/getUserAgent', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fingerbank/local/user_agent/:id/clone',
      name: 'cloneFingerbankUserAgent',
      component: FingerbankUserAgentView,
      props: (route) => ({ formStoreName: 'formFingerbankUserAgent', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFingerbankUserAgent) { // Register store module only once
          store.registerModule('formFingerbankUserAgent', FormStore)
        }
        store.dispatch('$_fingerbank/getUserAgent', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'scans',
      redirect: 'scans/scan_engines'
    },
    {
      path: 'scans/scan_engines',
      name: 'scanEngines',
      component: ScansTabs,
      props: (route) => ({ tab: 'scan_engines', query: route.query.query })
    },
    {
      path: 'scans/scan_engines/new/:scanType',
      name: 'newScanEngine',
      component: ScanEngineView,
      props: (route) => ({ formStoreName: 'formScanEngine', isNew: true, scanType: route.params.scanType }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formScanEngine) { // Register store module only once
          store.registerModule('formScanEngine', FormStore)
        }
        next()
      }
    },
    {
      path: 'scans/scan_engine/:id',
      name: 'scanEngine',
      component: ScanEngineView,
      props: (route) => ({ formStoreName: 'formScanEngine', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formScanEngine) { // Register store module only once
          store.registerModule('formScanEngine', FormStore)
        }
        store.dispatch('$_scans/getScanEngine', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'scans/scan_engine/:id/clone',
      name: 'cloneScanEngine',
      component: ScanEngineView,
      props: (route) => ({ formStoreName: 'formScanEngine', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formScanEngine) { // Register store module only once
          store.registerModule('formScanEngine', FormStore)
        }
        store.dispatch('$_scans/getScanEngine', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'scans/wmi_rules',
      name: 'wmiRules',
      component: ScansTabs,
      props: (route) => ({ tab: 'wmi_rules', query: route.query.query })
    },
    {
      path: 'scans/wmi_rules/new',
      name: 'newWmiRule',
      component: WmiRuleView,
      props: () => ({ formStoreName: 'formWmiRule', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formWmiRule) { // Register store module only once
          store.registerModule('formWmiRule', FormStore)
        }
        next()
      }
    },
    {
      path: 'scans/wmi_rule/:id',
      name: 'wmiRule',
      component: WmiRuleView,
      props: (route) => ({ formStoreName: 'formWmiRule', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formWmiRule) { // Register store module only once
          store.registerModule('formWmiRule', FormStore)
        }
        store.dispatch('$_wmi_rules/getWmiRule', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'scans/wmi_rule/:id/clone',
      name: 'cloneWmiRule',
      component: WmiRuleView,
      props: (route) => ({ formStoreName: 'formWmiRule', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formWmiRule) { // Register store module only once
          store.registerModule('formWmiRule', FormStore)
        }
        store.dispatch('$_wmi_rules/getWmiRule', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'security_events',
      name: 'security_events',
      component: SecurityEventsList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'security_events/new',
      name: 'newSecurityEvent',
      component: SecurityEventView,
      props: () => ({ formStoreName: 'formSecurityEvent', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSecurityEvent) { // Register store module only once
          store.registerModule('formSecurityEvent', FormStore)
        }
        next()
      }
    },
    {
      path: 'security_event/:id',
      name: 'security_event',
      component: SecurityEventView,
      props: (route) => ({ formStoreName: 'formSecurityEvent', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSecurityEvent) { // Register store module only once
          store.registerModule('formSecurityEvent', FormStore)
        }
        store.dispatch('$_security_events/getSecurityEvent', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'security_event/:id/clone',
      name: 'cloneSecurityEvent',
      component: SecurityEventView,
      props: (route) => ({ formStoreName: 'formSecurityEvent', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSecurityEvent) { // Register store module only once
          store.registerModule('formSecurityEvent', FormStore)
        }
        store.dispatch('$_security_events/getSecurityEvent', to.params.id).then(() => {
          next()
        })
      }
    },
    /**
     * Integration
     */
    {
      path: 'integration',
      component: IntegrationSection
    },
    {
      path: 'firewalls',
      name: 'firewalls',
      component: FirewallsList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'firewalls/new/:firewallType',
      name: 'newFirewall',
      component: FirewallView,
      props: (route) => ({ formStoreName: 'formFirewall', isNew: true, firewallType: route.params.firewallType }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFirewall) { // Register store module only once
          store.registerModule('formFirewall', FormStore)
        }
        next()
      }
    },
    {
      path: 'firewall/:id',
      name: 'firewall',
      component: FirewallView,
      props: (route) => ({ formStoreName: 'formFirewall', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFirewall) { // Register store module only once
          store.registerModule('formFirewall', FormStore)
        }
        store.dispatch('$_firewalls/getFirewall', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'firewall/:id/clone',
      name: 'cloneFirewall',
      component: FirewallView,
      props: (route) => ({ formStoreName: 'formFirewall', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFirewall) { // Register store module only once
          store.registerModule('formFirewall', FormStore)
        }
        store.dispatch('$_firewalls/getFirewall', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'mse',
      name: 'mse',
      component: CiscoMobilityServicesEngineView,
      props: (route) => ({ formStoreName: 'formCiscoMobilityServicesEngine', query: route.query.query }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formCiscoMobilityServicesEngine) { // Register store module only once
          store.registerModule('formCiscoMobilityServicesEngine', FormStore)
        }
        next()
      }
    },
    {
      path: 'webservices',
      name: 'webservices',
      component: WebServicesView,
      props: (route) => ({ formStoreName: 'formWebServices', query: route.query.query }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formWebServices) { // Register store module only once
          store.registerModule('formWebServices', FormStore)
        }
        next()
      }
    },
    {
      path: 'pfdetect',
      name: 'syslogParsers',
      component: SyslogParsersList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'pfdetect/new/:syslogParserType',
      name: 'newSyslogParser',
      component: SyslogParserView,
      props: (route) => ({ formStoreName: 'formSyslogParsers', isNew: true, syslogParserType: route.params.syslogParserType }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSyslogParsers) { // Register store module only once
          store.registerModule('formSyslogParsers', FormStore)
        }
        next()
      }
    },
    {
      path: 'pfdetect/:id',
      name: 'syslogParser',
      component: SyslogParserView,
      props: (route) => ({ formStoreName: 'formSyslogParsers', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSyslogParsers) { // Register store module only once
          store.registerModule('formSyslogParsers', FormStore)
        }
        store.dispatch('$_syslog_parsers/getSyslogParser', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'pfdetect/:id/clone',
      name: 'cloneSyslogParser',
      component: SyslogParserView,
      props: (route) => ({ formStoreName: 'formSyslogParsers', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSyslogParsers) { // Register store module only once
          store.registerModule('formSyslogParsers', FormStore)
        }
        store.dispatch('$_syslog_parsers/getSyslogParser', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'syslog',
      name: 'syslogForwarders',
      component: SyslogForwardersList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'syslog/new/:syslogForwarderType',
      name: 'newSyslogForwarder',
      component: SyslogForwarderView,
      props: (route) => ({ formStoreName: 'formSyslogForwarders', isNew: true, syslogForwarderType: route.params.syslogForwarderType }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSyslogForwarders) { // Register store module only once
          store.registerModule('formSyslogForwarders', FormStore)
        }
        next()
      }
    },
    {
      path: 'syslog/:id',
      name: 'syslogForwarder',
      component: SyslogForwarderView,
      props: (route) => ({ formStoreName: 'formSyslogForwarders', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSyslogForwarders) { // Register store module only once
          store.registerModule('formSyslogForwarders', FormStore)
        }
        store.dispatch('$_syslog_forwarders/getSyslogForwarder', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'syslog/:id/clone',
      name: 'cloneSyslogForwarder',
      component: SyslogForwarderView,
      props: (route) => ({ formStoreName: 'formSyslogForwarders', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSyslogForwarders) { // Register store module only once
          store.registerModule('formSyslogForwarders', FormStore)
        }
        store.dispatch('$_syslog_forwarders/getSyslogForwarder', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'wrix',
      name: 'wrixLocations',
      component: WrixLocationsList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'wrix/new',
      name: 'newWrixLocation',
      component: WrixLocationView,
      props: () => ({ formStoreName: 'formWrixLocation', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formWrixLocation) { // Register store module only once
          store.registerModule('formWrixLocation', FormStore)
        }
        next()
      }
    },
    {
      path: 'wrix/:id',
      name: 'wrixLocation',
      component: WrixLocationView,
      props: (route) => ({ formStoreName: 'formWrixLocation', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formWrixLocation) { // Register store module only once
          store.registerModule('formWrixLocation', FormStore)
        }
        store.dispatch('$_wrix_locations/getWrixLocation', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'wrix/:id/clone',
      name: 'cloneWrixLocation',
      component: WrixLocationView,
      props: (route) => ({ formStoreName: 'formWrixLocation', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formWrixLocation) { // Register store module only once
          store.registerModule('formWrixLocation', FormStore)
        }
        store.dispatch('$_wrix_locations/getWrixLocation', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'pki',
      name: 'pki',
      component: PkisTabs,
      props: (route) => ({ tab: 'pkiCas', query: route.query.query })
    },
    {
      path: 'pki/cas',
      name: 'pkiCas',
      component: PkisTabs,
      props: (route) => ({ tab: 'pkiCas', query: route.query.query })
    },
    {
      path: 'pki/cas/new',
      name: 'newPkiCa',
      component: PkiCaView,
      props: () => ({ formStoreName: 'formPkiCa', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiCa) { // Register store module only once
          store.registerModule('formPkiCa', FormStore)
        }
        next()
      }
    },
    {
      path: 'pki/ca/:id',
      name: 'pkiCa',
      component: PkiCaView,
      props: (route) => ({ formStoreName: 'formPkiCa', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiCa) { // Register store module only once
          store.registerModule('formPkiCa', FormStore)
        }
        store.dispatch('$_pkis/getCa', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'pki/ca/:id/clone',
      name: 'clonePkiCa',
      component: PkiCaView,
      props: (route) => ({ formStoreName: 'formPkiCa', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiCa) { // Register store module only once
          store.registerModule('formPkiCa', FormStore)
        }
        store.dispatch('$_pkis/getCa', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'pki/profiles',
      name: 'pkiProfiles',
      component: PkisTabs,
      props: (route) => ({ tab: 'pkiProfiles', query: route.query.query })
    },
    {
      path: 'pki/ca/:ca_id/profiles/new',
      name: 'newPkiProfile',
      component: PkiProfileView,
      props: (route) => ({ formStoreName: 'formPkiProfile', ca_id: String(route.params.ca_id).toString(), isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiProfile) { // Register store module only once
          store.registerModule('formPkiProfile', FormStore)
        }
        next()
      }
    },
    {
      path: 'pki/profile/:id',
      name: 'pkiProfile',
      component: PkiProfileView,
      props: (route) => ({ formStoreName: 'formPkiProfile', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiProfile) { // Register store module only once
          store.registerModule('formPkiProfile', FormStore)
        }
        store.dispatch('$_pkis/getProfile', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'pki/profile/:id/clone',
      name: 'clonePkiProfile',
      component: PkiProfileView,
      props: (route) => ({ formStoreName: 'formPkiProfile', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiProfile) { // Register store module only once
          store.registerModule('formPkiProfile', FormStore)
        }
        store.dispatch('$_pkis/getProfile', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'pki/certs',
      name: 'pkiCerts',
      component: PkisTabs,
      props: (route) => ({ tab: 'pkiCerts', query: route.query.query })
    },
    {
      path: 'pki/profile/:profile_id/certs/new',
      name: 'newPkiCert',
      component: PkiCertView,
      props: (route) => ({ formStoreName: 'formPkiCert', profile_id: String(route.params.profile_id).toString(), isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiCert) { // Register store module only once
          store.registerModule('formPkiCert', FormStore)
        }
        next()
      }
    },
    {
      path: 'pki/cert/:id',
      name: 'pkiCert',
      component: PkiCertView,
      props: (route) => ({ formStoreName: 'formPkiCert', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiCert) { // Register store module only once
          store.registerModule('formPkiCert', FormStore)
        }
        store.dispatch('$_pkis/getCert', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'pki/cert/:id/clone',
      name: 'clonePkiCert',
      component: PkiCertView,
      props: (route) => ({ formStoreName: 'formPkiCert', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiCert) { // Register store module only once
          store.registerModule('formPkiCert', FormStore)
        }
        store.dispatch('$_pkis/getCert', to.params.id).then(() => {
          next()
        })
      }
    },
    /**
     *  Advanced Access Configuration
     */
    {
      path: 'advanced_access_configuration',
      component: AdvancedAccessConfigurationSection
    },
    {
      path: 'captive_portal',
      name: 'captive_portal',
      component: CaptivePortalView,
      props: (route) => ({ formStoreName: 'formCaptivePortal', query: route.query.query }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formCaptivePortal) { // Register store module only once
          store.registerModule('formCaptivePortal', FormStore)
        }
        next()
      }
    },
    {
      path: 'filters',
      name: 'filters',
      component: FilterEngineTabs,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'billing_tiers',
      name: 'billing_tiers',
      component: BillingTiersList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'billing_tiers/new',
      name: 'newBillingTier',
      component: BillingTierView,
      props: () => ({ formStoreName: 'formBillingTier', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formBillingTier) { // Register store module only once
          store.registerModule('formBillingTier', FormStore)
        }
        next()
      }
    },
    {
      path: 'billing_tier/:id',
      name: 'billing_tier',
      component: BillingTierView,
      props: (route) => ({ formStoreName: 'formBillingTier', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formBillingTier) { // Register store module only once
          store.registerModule('formBillingTier', FormStore)
        }
        store.dispatch('$_billing_tiers/getBillingTier', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'billing_tier/:id/clone',
      name: 'cloneBillingTier',
      component: BillingTierView,
      props: (route) => ({ formStoreName: 'formBillingTier', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formBillingTier) { // Register store module only once
          store.registerModule('formBillingTier', FormStore)
        }
        store.dispatch('$_billing_tiers/getBillingTier', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'pki_providers',
      name: 'pki_providers',
      component: PkiProvidersList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'pki_providers/new/:providerType',
      name: 'newPkiProvider',
      component: PkiProviderView,
      props: (route) => ({ formStoreName: 'formPkiProvider', isNew: true, providerType: route.params.providerType }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiProvider) { // Register store module only once
          store.registerModule('formPkiProvider', FormStore)
        }
        next()
      }
    },
    {
      path: 'pki_provider/:id',
      name: 'pki_provider',
      component: PkiProviderView,
      props: (route) => ({ formStoreName: 'formPkiProvider', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiProvider) { // Register store module only once
          store.registerModule('formPkiProvider', FormStore)
        }
        store.dispatch('$_pki_providers/getPkiProvider', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'pki_provider/:id/clone',
      name: 'clonePkiProvider',
      component: PkiProviderView,
      props: (route) => ({ formStoreName: 'formPkiProvider', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPkiProvider) { // Register store module only once
          store.registerModule('formPkiProvider', FormStore)
        }
        store.dispatch('$_pki_providers/getPkiProvider', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'provisionings',
      name: 'provisionings',
      component: ProvisioningsList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'provisionings/new/:provisioningType',
      name: 'newProvisioning',
      component: ProvisioningView,
      props: (route) => ({ formStoreName: 'formProvisioning', isNew: true, provisioningType: route.params.provisioningType }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formProvisioning) { // Register store module only once
          store.registerModule('formProvisioning', FormStore)
        }
        next()
      }
    },
    {
      path: 'provisioning/:id',
      name: 'provisioning',
      component: ProvisioningView,
      props: (route) => ({ formStoreName: 'formProvisioning', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formProvisioning) { // Register store module only once
          store.registerModule('formProvisioning', FormStore)
        }
        store.dispatch('$_provisionings/getProvisioning', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'provisioning/:id/clone',
      name: 'cloneProvisioning',
      component: ProvisioningView,
      props: (route) => ({ formStoreName: 'formProvisioning', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formProvisioning) { // Register store module only once
          store.registerModule('formProvisioning', FormStore)
        }
        store.dispatch('$_provisionings/getProvisioning', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'portal_modules',
      name: 'portal_modules',
      component: PortalModulesList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'portal_modules/new/:moduleType',
      name: 'newPortalModule',
      component: PortalModuleView,
      props: (route) => ({ formStoreName: 'formPortalModule', isNew: true, moduleType: route.params.moduleType }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPortalModule) { // Register store module only once
          store.registerModule('formPortalModule', FormStore)
        }
        next()
      }
    },
    {
      path: 'portal_module/:id',
      name: 'portal_module',
      component: PortalModuleView,
      props: (route) => ({ formStoreName: 'formPortalModule', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPortalModule) { // Register store module only once
          store.registerModule('formPortalModule', FormStore)
        }
        store.dispatch('$_portalmodules/getPortalModule', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'portal_module/:id/clone',
      name: 'clonePortalModule',
      component: PortalModuleView,
      props: (route) => ({ formStoreName: 'formPortalModule', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formPortalModule) { // Register store module only once
          store.registerModule('formPortalModule', FormStore)
        }
        store.dispatch('$_portalmodules/getPortalModule', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'access_duration',
      name: 'access_duration',
      component: AccessDurationView,
      props: (route) => ({ formStoreName: 'formAccessDuration', query: route.query.query }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formAccessDuration) { // Register store module only once
          store.registerModule('formAccessDuration', FormStore)
        }
        next()
      }
    },
    {
      path: 'self_services',
      name: 'self_services',
      component: SelfServicesList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'self_services/new',
      name: 'newSelfService',
      component: SelfServiceView,
      props: () => ({ formStoreName: 'formSelfService', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSelfService) { // Register store module only once
          store.registerModule('formSelfService', FormStore)
        }
        next()
      }
    },
    {
      path: 'self_service/:id',
      name: 'self_service',
      component: SelfServiceView,
      props: (route) => ({ formStoreName: 'formSelfService', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSelfService) { // Register store module only once
          store.registerModule('formSelfService', FormStore)
        }
        store.dispatch('$_self_services/getSelfService', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'self_service/:id/clone',
      name: 'cloneSelfService',
      component: SelfServiceView,
      props: (route) => ({ formStoreName: 'formSelfService', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSelfService) { // Register store module only once
          store.registerModule('formSelfService', FormStore)
        }
        store.dispatch('$_self_services/getSelfService', to.params.id).then(() => {
          next()
        })
      }
    },
    /**
     * Network Configuration
     */
    {
      path: 'network_configuration',
      component: NetworkConfigurationSection
    },
    {
      path: 'networks',
      name: 'networks',
      component: NetworksTabs,
      props: (route) => ({ tab: 'network', query: route.query.query })
    },
    {
      path: 'network',
      name: 'network',
      component: NetworksTabs,
      props: (route) => ({ tab: 'network', query: route.query.query })
    },
    {
      path: 'interfaces',
      name: 'interfaces',
      component: NetworksTabs,
      props: (route) => ({ tab: 'interfaces', query: route.query.query })
    },
    {
      path: 'interface/:id',
      name: 'interface',
      component: InterfaceView,
      props: (route) => ({ formStoreName: 'formInterface', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formInterface) { // Register store module only once
          store.registerModule('formInterface', FormStore)
        }
        store.dispatch('$_interfaces/getInterface', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'interface/:id/clone',
      name: 'cloneInterface',
      component: InterfaceView,
      props: (route) => ({ formStoreName: 'formInterface', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formInterface) { // Register store module only once
          store.registerModule('formInterface', FormStore)
        }
        store.dispatch('$_interfaces/getInterface', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'interface/:id/new',
      name: 'newInterface',
      component: InterfaceView,
      props: (route) => ({ formStoreName: 'formInterface', id: route.params.id, isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formInterface) { // Register store module only once
          store.registerModule('formInterface', FormStore)
        }
        store.dispatch('$_interfaces/getInterface', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'interfaces/layer2_network/:id',
      name: 'layer2_network',
      component: Layer2NetworkView,
      props: (route) => ({ formStoreName: 'formLayer2Network', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formLayer2Network) { // Register store module only once
          store.registerModule('formLayer2Network', FormStore)
        }
        store.dispatch('$_layer2_networks/getLayer2Network', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'interfaces/routed_networks/new',
      name: 'newRoutedNetwork',
      component: RoutedNetworkView,
      props: () => ({ formStoreName: 'formRoutedNetwork', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formRoutedNetwork) { // Register store module only once
          store.registerModule('formRoutedNetwork', FormStore)
        }
        next()
      }
    },
    {
      path: 'interfaces/routed_network/:id',
      name: 'routed_network',
      component: RoutedNetworkView,
      props: (route) => ({ formStoreName: 'formRoutedNetwork', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formRoutedNetwork) { // Register store module only once
          store.registerModule('formRoutedNetwork', FormStore)
        }
        store.dispatch('$_routed_networks/getRoutedNetwork', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'interfaces/routed_network/:id/clone',
      name: 'cloneRoutedNetwork',
      component: RoutedNetworkView,
      props: (route) => ({ formStoreName: 'formRoutedNetwork', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formRoutedNetwork) { // Register store module only once
          store.registerModule('formRoutedNetwork', FormStore)
        }
        store.dispatch('$_routed_networks/getRoutedNetwork', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'inline',
      name: 'inline',
      component: NetworksTabs,
      props: (route) => ({ tab: 'inline', query: route.query.query })
    },
    {
      path: 'traffic_shapings',
      name: 'traffic_shapings',
      component: NetworksTabs,
      props: (route) => ({ tab: 'traffic_shapings', query: route.query.query })
    },
    {
      path: 'traffic_shaping/new/:role',
      name: 'newTrafficShaping',
      component: TrafficShapingView,
      props: (route) => ({ formStoreName: 'formTrafficShapingPolicy', isNew: true, role: route.params.role }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formTrafficShapingPolicy) { // Register store module only once
          store.registerModule('formTrafficShapingPolicy', FormStore)
        }
        next()
      }
    },
    {
      path: 'traffic_shaping/:id',
      name: 'traffic_shaping',
      component: TrafficShapingView,
      props: (route) => ({ formStoreName: 'formTrafficShapingPolicy', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formTrafficShapingPolicy) { // Register store module only once
          store.registerModule('formTrafficShapingPolicy', FormStore)
        }
        store.dispatch('$_traffic_shaping_policies/getTrafficShapingPolicy', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'fencing',
      name: 'fencing',
      component: NetworksTabs,
      props: (route) => ({ tab: 'fencing', query: route.query.query })
    },
    {
      path: 'parking',
      name: 'parking',
      component: NetworksTabs,
      props: (route) => ({ tab: 'parking', query: route.query.query })
    },
    {
      path: 'floating_devices',
      name: 'floating_devices',
      component: FloatingDevicesList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'floating_devices/new',
      name: 'newFloatingDevice',
      component: FloatingDeviceView,
      props: () => ({ formStoreName: 'formFloatingDevice', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFloatingDevice) { // Register store module only once
          store.registerModule('formFloatingDevice', FormStore)
        }
        next()
      }
    },
    {
      path: 'floating_device/:id',
      name: 'floating_device',
      component: FloatingDeviceView,
      props: (route) => ({ formStoreName: 'formFloatingDevice', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFloatingDevice) { // Register store module only once
          store.registerModule('formFloatingDevice', FormStore)
        }
        store.dispatch('$_floatingdevices/getFloatingDevice', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'floating_device/:id/clone',
      name: 'cloneFloatingDevice',
      component: FloatingDeviceView,
      props: (route) => ({ formStoreName: 'formFloatingDevice', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formFloatingDevice) { // Register store module only once
          store.registerModule('formFloatingDevice', FormStore)
        }
        store.dispatch('$_floatingdevices/getFloatingDevice', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'snmp_traps',
      name: 'snmp_traps',
      component: SnmpTrapView,
      props: (route) => ({ formStoreName: 'formSnmpTrap', query: route.query.query }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formSnmpTrap) { // Register store module only once
          store.registerModule('formSnmpTrap', FormStore)
        }
        next()
      }
    },
    {
      path: 'certificates',
      redirect: 'certificate/http'
    },
    {
      path: 'certificate/:id',
      name: 'certificate',
      component: CertificatesView,
      props: (route) => ({ id: route.params.id })
    },
    /**
     * System Configuration
     */
    {
      path: 'system_configuration',
      component: SystemConfigurationSection
    },
    {
      path: 'general',
      name: 'general',
      component: MainTabs,
      props: (route) => ({ tab: 'general', query: route.query.query })
    },
    {
      path: 'alerting',
      name: 'alerting',
      component: MainTabs,
      props: (route) => ({ tab: 'alerting', query: route.query.query })
    },
    {
      path: 'advanced',
      name: 'advanced',
      component: MainTabs,
      props: (route) => ({ tab: 'advanced', query: route.query.query })
    },
    {
      path: 'maintenance_tasks',
      name: 'maintenance_tasks',
      component: MainTabs,
      props: (route) => ({ tab: 'maintenance_tasks', query: route.query.query })
    },
    {
      path: 'maintenance_task/:id',
      name: 'maintenance_task',
      component: MaintenanceTaskView,
      props: (route) => ({ formStoreName: 'formMaintenanceTask', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formMaintenanceTask) { // Register store module only once
          store.registerModule('formMaintenanceTask', FormStore)
        }
        store.dispatch('$_maintenance_tasks/getMaintenanceTask', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'services',
      name: 'services',
      component: MainTabs,
      props: (route) => ({ tab: 'services', query: route.query.query })
    },
    {
      path: 'database',
      name: 'database',
      component: DatabaseTabs,
      props: (route) => ({ tab: 'database', query: route.query.query })
    },
    {
      path: 'database_advanced',
      name: 'database_advanced',
      component: DatabaseTabs,
      props: (route) => ({ tab: 'database_advanced', query: route.query.query })
    },
    {
      path: 'active_active',
      name: 'active_active',
      component: ActiveActiveView,
      props: (route) => ({ formStoreName: 'formActiveActive', query: route.query.query }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formActiveActive) { // Register store module only once
          store.registerModule('formActiveActive', FormStore)
        }
        next()
      }
    },
    {
      path: 'radius',
      name: 'radius',
      component: RadiusView,
      props: (route) => ({ formStoreName: 'formRadius', query: route.query.query }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formRadius) { // Register store module only once
          store.registerModule('formRadius', FormStore)
        }
        next()
      }
    },
    {
      path: 'dns',
      name: 'dns',
      component: DnsView,
      props: (route) => ({ formStoreName: 'formDns', query: route.query.query }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formDns) { // Register store module only once
          store.registerModule('formDns', FormStore)
        }
        next()
      }
    },
    {
      path: 'admin_roles',
      name: 'admin_roles',
      component: AdminRolesList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'admin_roles/new',
      name: 'newAdminRole',
      component: AdminRoleView,
      props: () => ({ formStoreName: 'formAdminRole', isNew: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formAdminRole) { // Register store module only once
          store.registerModule('formAdminRole', FormStore)
        }
        next()
      }
    },
    {
      path: 'admin_role/:id',
      name: 'admin_role',
      component: AdminRoleView,
      props: (route) => ({ formStoreName: 'formAdminRole', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formAdminRole) { // Register store module only once
          store.registerModule('formAdminRole', FormStore)
        }
        store.dispatch('$_admin_roles/getAdminRole', to.params.id).then(() => {
          next()
        })
      }
    },
    {
      path: 'admin_role/:id/clone',
      name: 'cloneAdminRole',
      component: AdminRoleView,
      props: (route) => ({ formStoreName: 'formAdminRole', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        if (!store.state.formAdminRole) { // Register store module only once
          store.registerModule('formAdminRole', FormStore)
        }
        store.dispatch('$_admin_roles/getAdminRole', to.params.id).then(() => {
          next()
        })
      }
    }
  ]
}

export default route
