package pf::constants::admin_roles;

=head1 NAME

pf::constants::admin_roles - constants for admin_roles object

=cut

=head1 DESCRIPTION

pf::constants::admin_roles

=cut

use strict;
use warnings;
use base qw(Exporter);

our @EXPORT_OK = qw(@ADMIN_ACTIONS %ADMIN_NOT_IN_READONLY);

our @ADMIN_ACTIONS = qw(
    ADMIN_ROLES_CREATE
    ADMIN_ROLES_DELETE
    ADMIN_ROLES_READ
    ADMIN_ROLES_UPDATE

    AUDITING_READ

    CONFIGURATION_MAIN_READ
    CONFIGURATION_MAIN_UPDATE

    FINGERBANK_READ
    FINGERBANK_CREATE
    FINGERBANK_UPDATE
    FINGERBANK_DELETE

    FIREWALL_SSO_READ
    FIREWALL_SSO_CREATE
    FIREWALL_SSO_UPDATE
    FIREWALL_SSO_DELETE

    FLOATING_DEVICES_CREATE
    FLOATING_DEVICES_DELETE
    FLOATING_DEVICES_READ
    FLOATING_DEVICES_UPDATE

    INTERFACES_CREATE
    INTERFACES_DELETE
    INTERFACES_READ
    INTERFACES_UPDATE

    MAC_READ
    MAC_UPDATE

    NODES_CREATE
    NODES_DELETE
    NODES_READ
    NODES_UPDATE

    MSE_READ

    CONNECTION_PROFILES_CREATE
    CONNECTION_PROFILES_DELETE
    CONNECTION_PROFILES_READ
    CONNECTION_PROFILES_UPDATE

    PROVISIONING_CREATE
    PROVISIONING_DELETE
    PROVISIONING_READ
    PROVISIONING_UPDATE

    REPORTS
    SERVICES

    SWITCHES_CREATE
    SWITCHES_DELETE
    SWITCHES_READ
    SWITCHES_UPDATE

    USERS_READ
    USERS_READ_SPONSORED
    USERS_CREATE
    USERS_CREATE_MULTIPLE
    USERS_UPDATE
    USERS_DELETE

    USERS_SET_ROLE
    USERS_SET_ACCESS_DURATION
    USERS_SET_UNREG_DATE
    USERS_SET_ACCESS_LEVEL
    USERS_MARK_AS_SPONSOR
    USERS_SET_TIME_BALANCE
    USERS_SET_BANDWIDTH_BALANCE

    USERS_ROLES_CREATE
    USERS_ROLES_DELETE
    USERS_ROLES_READ
    USERS_ROLES_UPDATE

    USERS_SOURCES_CREATE
    USERS_SOURCES_DELETE
    USERS_SOURCES_READ
    USERS_SOURCES_UPDATE

    VIOLATIONS_CREATE
    VIOLATIONS_DELETE
    VIOLATIONS_READ
    VIOLATIONS_UPDATE

    RADIUS_LOG_READ

    REALM_READ
    REALM_CREATE
    REALM_UPDATE
    REALM_DELETE

    DOMAIN_READ
    DOMAIN_CREATE
    DOMAIN_UPDATE
    DOMAIN_DELETE

    SCAN_READ
    SCAN_CREATE
    SCAN_UPDATE
    SCAN_DELETE

    WMI_READ
    WMI_CREATE
    WMI_UPDATE
    WMI_DELETE

    WRIX_CREATE
    WRIX_DELETE
    WRIX_READ
    WRIX_UPDATE

    PKI_PROVIDER_CREATE
    PKI_PROVIDER_DELETE
    PKI_PROVIDER_READ
    PKI_PROVIDER_UPDATE

    PFDETECT_CREATE
    PFDETECT_DELETE
    PFDETECT_READ
    PFDETECT_UPDATE

    BILLING_TIER_CREATE
    BILLING_TIER_DELETE
    BILLING_TIER_READ
    BILLING_TIER_UPDATE

    SWITCH_LOGIN_READ
    SWITCH_LOGIN_WRITE

    FILTERS_READ
    FILTERS_UPDATE

    PORTAL_MODULE_CREATE
    PORTAL_MODULE_DELETE
    PORTAL_MODULE_READ
    PORTAL_MODULE_UPDATE

    PFMON_READ
    PFMON_UPDATE

    DEVICE_REGISTRATION_CREATE
    DEVICE_REGISTRATION_DELETE
    DEVICE_REGISTRATION_READ
    DEVICE_REGISTRATION_UPDATE

    RADIUSREMOTE_READ
    RADIUSREMOTE_CREATE
    RADIUSREMOTE_UPDATE
    RADIUSREMOTE_DELETE
);

# Actions not allowed in readonly mode
# Any actions that will update the database is not allowed
our %ADMIN_NOT_IN_READONLY = map { $_ => 1} grep { !/_READ$/ && /^(NODES_|SWITCHES_|VIOLATIONS_|WRIX_|USERS_|USERS_ROLES_)/ && !/^USERS_SOURCES_/ && $_ ne 'USERS_READ_SPONSORED' } @ADMIN_ACTIONS ;

=head1 AUTHOR

Inverse inc. <info@inverse.ca>

=head1 COPYRIGHT

Copyright (C) 2005-2017 Inverse inc.

=head1 LICENSE

This program is free software; you can redistribute it and::or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301,
USA.

=cut

1;

