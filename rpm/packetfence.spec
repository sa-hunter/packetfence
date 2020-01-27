#==============================================================================
# Variables
#==============================================================================
# use 'global' variables (vs 'define' with local scope)
%global     builddoc 0
%global     perl_version 5.10.1
%global     logfiles packetfence.log snmptrapd.log pfdetect pfmon security_event.log httpd.admin.audit.log
%global     logdir /usr/local/pf/logs
%global     debug_package %{nil}


#==============================================================================
# Main package
#==============================================================================
Name:       packetfence
Version:    9.3.9
Release:    1%{?dist}
Summary:    PacketFence network registration / worm mitigation system
Packager:   Inverse inc. <support@inverse.ca>
Group:      System Environment/Daemons
License:    GPL
URL:        http://www.packetfence.org
Source0:    %{name}-%{version}.tar
BuildRoot:  %{_tmppath}/%{name}-root
Vendor:     PacketFence, http://www.packetfence.org

BuildRequires: gettext, httpd, ipset-devel, pkgconfig, jq
%if 0%{?rhel} == 8
BuildRequires: libmnl-devel,
%endif
%if 0%{?rhel} == 7
BuildRequires: asciidoc >= 8.6.2, fop, libxslt, docbook-style-xsl, xalan-j2
%endif
BuildRequires: ruby, rubygems
BuildRequires: nodejs >= 12.0
BuildRequires: gcc
BuildRequires: systemd

# To handle migration from several packetfence packages
# to only one
Obsoletes: %{name}-remote-arp-sensor <= 9.1.0
Obsoletes: %{name}-pfcmd-suid <= 9.1.0
Obsoletes: %{name}-ntlm-wrapper <= 9.1.0
Obsoletes: %{name}-config <= 9.1.0

AutoReqProv: 0

Requires: chkconfig, coreutils, grep, openssl, sed, tar, wget, gettext, conntrack-tools, patch, git
# for process management
Requires: rsyslog
Requires: procps
Requires: libpcap, libxml2, zlib, zlib-devel, glibc-common,
Requires: httpd, mod_ssl
Requires: mod_perl, mod_proxy_html
requires: libapreq2
Requires: redis
Requires: freeradius >= 3.0.18-18, freeradius-mysql, freeradius-perl, freeradius-ldap, freeradius-utils, freeradius-redis, freeradius-rest
Requires: freeradius-radsniff
Requires: make
Requires: net-tools
Requires: sscep
Requires: net-snmp >= 5.3.2.2
Requires: net-snmp-perl
Requires: perl >= %{perl_version}
Requires: MariaDB-server >= 10.1, MariaDB-client >= 10.1
Requires: perl(DBD::mysql)
Requires: perl(Bit::Vector)
Requires: perl(CGI::Session), perl(CGI::Session::Driver::chi) >= 1.0.3, perl(JSON) >= 2.90, perl(JSON::MaybeXS), perl(JSON::XS) >= 3
Requires: perl-Switch, perl-Locale-Codes
Requires: perl-re-engine-RE2
Requires: perl(Apache2::Request)
Requires: perl(Apache::Session)
Requires: perl(Class::Accessor)
Requires: perl(Class::Accessor::Fast::Contained)
Requires: perl(Class::Data::Inheritable)
Requires: perl(Class::Gomor)
Requires: perl(Config::IniFiles) >= 2.88
Requires: perl(Data::Phrasebook), perl(Data::Phrasebook::Loader::YAML)
Requires: perl(DBI)
Requires: perl(Rose::DB)
Requires: perl(Rose::DB::Object)
Requires: perl(Lingua::EN::Nums2Words) >= 1.16
Requires: perl(Lingua::EN::Inflexion) >= 0.001006
Requires: perl(Mojolicious) >= 7.87
Requires: perl(File::Tail)
Requires: perl(IPC::Cmd)
Requires: perl(IPTables::ChainMgr)
Requires: perl(IPTables::Parse)
Requires: perl(Tie::DxHash)
Requires: perl(File::FcntlLock)
requires: perl(Proc::ProcessTable)
requires: perl(Apache::SSLLookup)
requires: perl(Crypt::OpenSSL::PKCS12)
requires: perl(Crypt::OpenSSL::X509)
requires: perl(Crypt::OpenSSL::RSA)
requires: perl(Crypt::OpenSSL::PKCS10)
requires: perl(Crypt::LE)
requires: perl(Const::Fast)
# Perl core modules but still explicitly defined just in case distro's core perl get stripped
Requires: perl(Time::HiRes)
# Required for inline mode.
Requires: ipset = 6.38, ipset-symlink
Requires: sudo
Requires: perl(File::Which), perl(NetAddr::IP)
Requires: perl(Net::LDAP)
Requires: perl(Net::IP)
Requires: perl-libnet >= 3.10
Requires: perl(Socket) >= 2.016
Requires: perl(Digest::HMAC_MD5)
# TODO: we should depend on perl modules not perl-libwww-perl package
# find out what they are and specify them as perl(...::...) instead of perl-libwww-perl
# LWP::Simple is one of them (required by inlined Net::MAC::Vendor and probably other stuff)
Requires: perl-libwww-perl > 6.02, perl(LWP::Simple), perl(LWP::Protocol::https)
Requires: perl(List::MoreUtils)
Requires: perl-Scalar-List-Utils
Requires: perl(Locale::gettext)
Requires: perl(Log::Log4perl) >= 1.43
Requires: perl(MojoX::Log::Log4perl)
Requires: perl(Log::Any)
Requires: perl(Log::Any::Adapter)
Requires: perl(Log::Any::Adapter::Log4perl)
Requires: perl(Log::Dispatch::Syslog)
Requires: perl(Log::Fast)
Requires: perl(Net::Cisco::MSE::REST)
# Required by switch modules
# Net::Appliance::Session specific version added because newer versions broke API compatibility (#1312)
# We would need to port to the new 3.x API (tracked by #1313)
Requires: perl(Net::Appliance::Session) = 1.36
Requires: perl(Net::SSH2) >= 0.63
Requires: perl(Net::OAuth2) >= 0.65
# Required by configurator script, pf::config
Requires: perl(Net::Interface)
Requires: perl(Net::Netmask)
# pfmon, pfdhcplistener
Requires: perl(Net::Pcap) >= 0.16
# pfdhcplistener
Requires: perl(NetPacket) >= 1.2.0
Requires: perl(Module::Metadata)
# systemd sd_notify support
Requires: perl(Systemd::Daemon)
# RADIUS CoA support
Requires: perl(Net::Radius::Dictionary), perl(Net::Radius::Packet)
# SNMP to network hardware
Requires: perl(Net::SNMP)
# for SNMPv3 AES as privacy protocol, fixes #775
Requires: perl(Crypt::Rijndael)
Requires: perl(Net::Telnet)
Requires: perl(Net::Write)
Requires: perl(Parse::RecDescent)
# for nessus scan, this version add the NBE download (inverse patch)
Requires: perl(Net::Nessus::XMLRPC) >= 0.40
Requires: perl(Net::Nessus::REST) >= 0.7
# Note: portability for non-x86 is questionnable for Readonly::XS
Requires: perl(Readonly), perl(Readonly::XS)
Requires: perl(Regexp::Common)
Requires: rrdtool, perl-rrdtool
Requires: perl(SOAP::Lite) >= 1.0
Requires: perl(WWW::Curl)
Requires: perl(Data::MessagePack)
Requires: perl(Data::MessagePack::Stream)
Requires: perl(POSIX::2008)
# Template::Toolkit - captive portal template system
Requires: perl(Template)
Requires: perl(Template::AutoFilter)
# Used by installer / configurator scripts
Requires: perl(Term::ReadKey)
Requires: perl(Thread::Pool)
Requires: perl(Date::Parse)
Requires: perl(DateTime::Format::RFC3339)
Requires: perl(UNIVERSAL::require)
Requires: perl(YAML)
Requires: perl(Try::Tiny)
Requires: perl(Crypt::GeneratePassword)
Requires: perl(Bytes::Random::Secure)
Requires: perl(Crypt::Eksblowfish::Bcrypt)
Requires: perl(Crypt::SmbHash)
Requires: perl(MIME::Lite::TT)
Requires: perl(Cache::Cache), perl(HTML::Parser)
Requires: perl(URI::Escape::XS)
# Used by Captive Portal authentication modules
Requires: perl(Apache::Htpasswd)
Requires: perl(Authen::Radius) >= 0.24
Requires: perl(Authen::Krb5::Simple)
Requires: perl(WWW::Twilio::API)
# Required for importation feature
Requires: perl(Text::CSV)
Requires: perl(Text::CSV_XS)
# BILLING ENGINE
Requires: perl(LWP::UserAgent)
Requires: perl(HTTP::Request::Common)
# Catalyst
Requires: perl(Catalyst::Runtime), perl(Catalyst::Plugin::ConfigLoader)
Requires: perl(Catalyst::Plugin::Static::Simple), perl(Catalyst::Action::RenderView)
Requires: perl(Config::General), perl(Catalyst::Plugin::StackTrace)
Requires: perl(Catalyst::Plugin::Session), perl(Catalyst::Plugin::Session::Store::File)
Requires: perl(Catalyst::Plugin::Session::State::Cookie)
Requires: perl(Catalyst::Plugin::I18N)
Requires: perl(Catalyst::View::TT) >= 0.42
Requires: perl(Catalyst::View::CSV)
Requires: perl(Catalyst::View::JSON), perl(Log::Log4perl::Catalyst)
Requires: perl(Catalyst::Plugin::Authentication)
Requires: perl(Catalyst::Authentication::Credential::HTTP)
Requires: perl(Catalyst::Authentication::Store::Htpasswd)
Requires: perl(Catalyst::Controller::HTML::FormFu)
Requires: perl(Params::Validate) >= 0.97
Requires: perl(Term::Size::Any)
Requires: perl(SQL::Abstract::More) >= 1.28
Requires: perl(SQL::Abstract::Plugin::InsertMulti) >= 0.04
Requires(pre): perl-aliased => 0.30
Requires(pre): perl-version
# for Catalyst stand-alone server
Requires: perl(Catalyst::Devel)
Requires: perl(Sort::Naturally)
Requires: perl(PHP::Serialization)
Requires: perl(File::Slurp)
# these are probably missing dependencies for the above. 
# I shall file upstream tickets to openfusion before we integrate
Requires: perl(Plack), perl(Plack::Middleware::ReverseProxy)
Requires: perl(MooseX::Types::LoadableClass)
Requires: perl(Moose) <= 2.1005
Requires: perl(CHI) >= 0.59
Requires: perl(CHI::Memoize)
Requires: perl(Data::Serializer)
Requires: perl(Data::Structure::Util)
Requires: perl(Data::Swap)
Requires: perl(HTML::FormHandler) = 0.40019
Requires: perl(Redis::Fast)
Requires: perl(CHI::Driver::Redis)
Requires: perl(File::Flock)
Requires: perl(Perl::Version)
Requires: perl(Cache::FastMmap)
Requires: perl(Cache::BDB)
Requires: perl(Moo) >= 1.003000
Requires: perl(Term::ANSIColor)
Requires: perl(IO::Interactive)
Requires: perl(Net::ARP)
Requires: perl(Module::Loaded)
Requires: perl(Linux::FD)
Requires: perl(Linux::Inotify2)
Requires: perl(File::Touch)
Requires: perl(POSIX::AtFork)
Requires: perl(Hash::Merge)
Requires: perl(IO::Socket::INET6)
Requires: perl(IO::Socket::SSL) >= 2.049
Requires: perl(IO::Interface)
Requires: perl(Time::Period) >= 1.25
Requires: perl(Time::Piece)
Requires: perl(Number::Range)
Requires: perl(Algorithm::Combinatorics)
Requires: perl(Net::Syslog)
Requires: perl(Class::XSAccessor)
Requires: iproute >= 3.0.0, krb5-workstation
Requires: samba >= 4
Requires: perl(Linux::Distribution)
Requires: perl(Pod::Markdown)
# configuration-wizard
Requires: vconfig
# wmi
Requires: wmi, perl(Net::WMIClient)
# SAML
Requires: lasso-perl 
# Captive Portal Dynamic Routing
Requires: perl(Graph)
#Timezone
Requires: perl(DateTime::TimeZone)

Requires: samba-winbind-clients, samba-winbind
Requires: libdrm >= 2.4.74
Requires: netdata < 1.11.0., fping, MySQL-python
#OpenVAS
Requires: openvas-cli
Requires: openvas-libraries

# pki
Requires: perl(Crypt::SMIME)


Requires: perl(Sereal::Encoder), perl(Sereal::Decoder), perl(Data::Serializer::Sereal) >= 1.04
#
# TESTING related
#
Requires: perl(Test::MockObject), perl(Test::MockModule)
Requires: perl(Test::Perl::Critic), perl(Test::WWW::Mechanize)
Requires: perl(Test::Pod), perl(Test::Pod::Coverage), perl(Test::Exception)
Requires: perl(Test::NoWarnings), perl(Test::ParallelSubtest)
# required for the fake CoA server
Requires: perl(Net::UDP)
# For managing the number of connections per device
Requires: haproxy >= 1.8.9, keepalived >= 2.0.0
# CAUTION: we need to require the version we want for Fingerbank and ensure we don't want anything equal or above the next major release as it can add breaking changes
Requires: fingerbank >= 4.1.5, fingerbank < 5.0.0
Requires: fingerbank-collector >= 1.2.2, fingerbank-collector < 2.0.0
Requires: perl(File::Tempdir)

%description

PacketFence is an open source network access control (NAC) system.
It can be used to effectively secure networks, from small to very large
heterogeneous networks. PacketFence provides features such as
* registration of new network devices
* detection of abnormal network activities
* isolation of problematic devices
* remediation through a captive portal
* registration-based and scheduled vulnerability scans.

#==============================================================================
# Source preparation
#==============================================================================
%prep
%setup -q -n %{name}-%{version}


#==============================================================================
# Build
#==============================================================================
%build
# generate translations
# TODO this is duplicated in debian/rules, we should aim to consolidate in a 'make' style step
for TRANSLATION in de en es fr he_IL it nl pl_PL pt_BR; do
    /usr/bin/msgfmt conf/locale/$TRANSLATION/LC_MESSAGES/packetfence.po \
      --output-file conf/locale/$TRANSLATION/LC_MESSAGES/packetfence.mo
done

%if %{builddoc} == 1
    # generating custom XSL for titlepage
    xsltproc -o docs/docbook/xsl/titlepage-fo.xsl \
        /usr/share/sgml/docbook/xsl-stylesheets/template/titlepage.xsl \
        docs/docbook/xsl/titlepage-fo.xml
    # admin, network device config, devel and ZEN install guides
    for GUIDE in $(ls docs/PacketFence*.asciidoc | xargs -n1 -I'{}' basename '{}' .asciidoc) ;do
    asciidoc -a docinfo2 -b docbook -d book \
        -o docs/docbook/$GUIDE.docbook \
        docs/$GUIDE.asciidoc
    xsltproc -o docs/docbook/$GUIDE.fo \
        docs/docbook/xsl/packetfence-fo.xsl \
        docs/docbook/$GUIDE.docbook
    fop -c docs/fonts/fop-config.xml \
        docs/docbook/$GUIDE.fo \
        -pdf docs/$GUIDE.pdf
    done
%endif

# Portal javascript/css
%{__make} -C html/common/ vendor
%{__make} -C html/common light-dist

# Admin javascript/css
%{__make} -C html/pfappserver/root/static/ vendor
%{__make} -C html/pfappserver/root/static/ light-dist
%{__make} -C html/pfappserver/root/static.alt/ vendor
%{__make} -C html/pfappserver/root/static.alt/ light-dist


# Build the HTML doc index for pfappserver
%{__make} html

# build pfcmd C wrapper
%{__make} bin/pfcmd
# build ntlm_auth_wrapper
%{__make} bin/ntlm_auth_wrapper
# Define git_commit_id
echo %{git_commit} > conf/git_commit_id

# build golang binaries
%{__make} -C go all

find -name '*.example' -print0 | while read -d $'\0' file
do
  cp $file "$(dirname $file)/$(basename $file .example)"
done

#==============================================================================
# Installation
#============================================================================
%install
%{__rm} -rf %{buildroot}
# systemd targets
%{__install} -D -m0644 conf/systemd/packetfence.target %{buildroot}/etc/systemd/system/packetfence.target
%{__install} -D -m0644 conf/systemd/packetfence-base.target %{buildroot}/etc/systemd/system/packetfence-base.target
%{__install} -D -m0644 conf/systemd/packetfence-cluster.target %{buildroot}/etc/systemd/system/packetfence-cluster.target

%{__install} -d %{buildroot}/etc/systemd/system/packetfence-base.target.wants
%{__install} -d %{buildroot}/etc/systemd/system/packetfence.target.wants
%{__install} -d %{buildroot}/etc/systemd/system/packetfence-cluster.target.wants
# systemd slices
%{__install} -D -m0644 conf/systemd/packetfence.slice %{buildroot}/etc/systemd/system/packetfence.slice
%{__install} -D -m0644 conf/systemd/packetfence-base.slice %{buildroot}/etc/systemd/system/packetfence-base.slice
# systemd services
%{__install} -D -m0644 conf/systemd/packetfence-api-frontend.service %{buildroot}%{_unitdir}/packetfence-api-frontend.service
%{__install} -D -m0644 conf/systemd/packetfence-config.service %{buildroot}%{_unitdir}/packetfence-config.service
%{__install} -D -m0644 conf/systemd/packetfence-tracking-config.service %{buildroot}%{_unitdir}/packetfence-tracking-config.service
%{__install} -D -m0644 conf/systemd/packetfence-haproxy-portal.service %{buildroot}%{_unitdir}/packetfence-haproxy-portal.service
%{__install} -D -m0644 conf/systemd/packetfence-haproxy-db.service %{buildroot}%{_unitdir}/packetfence-haproxy-db.service
%{__install} -D -m0644 conf/systemd/packetfence-httpd.aaa.service %{buildroot}%{_unitdir}/packetfence-httpd.aaa.service
%{__install} -D -m0644 conf/systemd/packetfence-httpd.admin.service %{buildroot}%{_unitdir}/packetfence-httpd.admin.service
%{__install} -D -m0644 conf/systemd/packetfence-httpd.collector.service %{buildroot}%{_unitdir}/packetfence-httpd.collector.service
%{__install} -D -m0644 conf/systemd/packetfence-httpd.portal.service %{buildroot}%{_unitdir}/packetfence-httpd.portal.service
%{__install} -D -m0644 conf/systemd/packetfence-httpd.proxy.service %{buildroot}%{_unitdir}/packetfence-httpd.proxy.service
%{__install} -D -m0644 conf/systemd/packetfence-httpd.webservices.service %{buildroot}%{_unitdir}/packetfence-httpd.webservices.service
%{__install} -D -m0644 conf/systemd/packetfence-iptables.service %{buildroot}%{_unitdir}/packetfence-iptables.service
%{__install} -D -m0644 conf/systemd/packetfence-pfperl-api.service %{buildroot}%{_unitdir}/packetfence-pfperl-api.service
%{__install} -D -m0644 conf/systemd/packetfence-keepalived.service %{buildroot}%{_unitdir}/packetfence-keepalived.service
%{__install} -D -m0644 conf/systemd/packetfence-mariadb.service %{buildroot}%{_unitdir}/packetfence-mariadb.service
%{__install} -D -m0644 conf/systemd/packetfence-pfbandwidthd.service %{buildroot}%{_unitdir}/packetfence-pfbandwidthd.service
%{__install} -D -m0644 conf/systemd/packetfence-pfdetect.service %{buildroot}%{_unitdir}/packetfence-pfdetect.service
%{__install} -D -m0644 conf/systemd/packetfence-pfdhcplistener.service %{buildroot}%{_unitdir}/packetfence-pfdhcplistener.service
%{__install} -D -m0644 conf/systemd/packetfence-pfdns.service %{buildroot}%{_unitdir}/packetfence-pfdns.service
%{__install} -D -m0644 conf/systemd/packetfence-pffilter.service %{buildroot}%{_unitdir}/packetfence-pffilter.service
%{__install} -D -m0644 conf/systemd/packetfence-pfmon.service %{buildroot}%{_unitdir}/packetfence-pfmon.service
%{__install} -D -m0644 conf/systemd/packetfence-pfqueue.service %{buildroot}%{_unitdir}/packetfence-pfqueue.service
%{__install} -D -m0644 conf/systemd/packetfence-pfsso.service %{buildroot}%{_unitdir}/packetfence-pfsso.service
%{__install} -D -m0644 conf/systemd/packetfence-httpd.dispatcher.service %{buildroot}%{_unitdir}/packetfence-httpd.dispatcher.service
%{__install} -D -m0644 conf/systemd/packetfence-radiusd-acct.service %{buildroot}%{_unitdir}/packetfence-radiusd-acct.service
%{__install} -D -m0644 conf/systemd/packetfence-radiusd-auth.service %{buildroot}%{_unitdir}/packetfence-radiusd-auth.service
%{__install} -D -m0644 conf/systemd/packetfence-radiusd-cli.service %{buildroot}%{_unitdir}/packetfence-radiusd-cli.service
%{__install} -D -m0644 conf/systemd/packetfence-radiusd-eduroam.service %{buildroot}%{_unitdir}/packetfence-radiusd-eduroam.service
%{__install} -D -m0644 conf/systemd/packetfence-radiusd-load_balancer.service %{buildroot}%{_unitdir}/packetfence-radiusd-load_balancer.service
%{__install} -D -m0644 conf/systemd/packetfence-radsniff.service %{buildroot}%{_unitdir}/packetfence-radsniff.service
%{__install} -D -m0644 conf/systemd/packetfence-redis-cache.service %{buildroot}%{_unitdir}/packetfence-redis-cache.service
%{__install} -D -m0644 conf/systemd/packetfence-redis_ntlm_cache.service %{buildroot}%{_unitdir}/packetfence-redis_ntlm_cache.service
%{__install} -D -m0644 conf/systemd/packetfence-redis_queue.service %{buildroot}%{_unitdir}/packetfence-redis_queue.service
%{__install} -D -m0644 conf/systemd/packetfence-snmptrapd.service %{buildroot}%{_unitdir}/packetfence-snmptrapd.service
%{__install} -D -m0644 conf/systemd/packetfence-tc.service %{buildroot}%{_unitdir}/packetfence-tc.service
%{__install} -D -m0644 conf/systemd/packetfence-winbindd.service %{buildroot}%{_unitdir}/packetfence-winbindd.service
%{__install} -D -m0644 conf/systemd/packetfence-pfdhcp.service %{buildroot}%{_unitdir}/packetfence-pfdhcp.service
%{__install} -D -m0644 conf/systemd/packetfence-pfipset.service %{buildroot}%{_unitdir}/packetfence-pfipset.service
%{__install} -D -m0644 conf/systemd/packetfence-netdata.service %{buildroot}%{_unitdir}/packetfence-netdata.service
%{__install} -D -m0644 conf/systemd/packetfence-pfstats.service %{buildroot}%{_unitdir}/packetfence-pfstats.service
# systemd path
%{__install} -D -m0644 conf/systemd/packetfence-tracking-config.path %{buildroot}%{_unitdir}/packetfence-tracking-config.path

%{__install} -d %{buildroot}/usr/local/pf/addons
%{__install} -d %{buildroot}/usr/local/pf/addons/AD
%{__install} -d -m2770 %{buildroot}/usr/local/pf/conf
%{__install} -d %{buildroot}/usr/local/pf/conf/radiusd
%{__install} -d %{buildroot}/usr/local/pf/conf/ssl
%{__install} -d %{buildroot}/usr/local/pf/conf/ssl/acme-challenge
%{__install} -d -m2775 %{buildroot}%logdir
%{__install} -d %{buildroot}/usr/local/pf/raddb/sites-enabled
%{__install} -d -m2775 %{buildroot}/usr/local/pf/var
%{__install} -d -m2775 %{buildroot}/usr/local/pf/var/cache
%{__install} -d -m2775 %{buildroot}/usr/local/pf/var/cache/ntlm_cache_users
%{__install} -d -m2775 %{buildroot}/usr/local/pf/var/redis_cache
%{__install} -d -m2775 %{buildroot}/usr/local/pf/var/redis_queue
%{__install} -d -m2775 %{buildroot}/usr/local/pf/var/redis_ntlm_cache
%{__install} -d -m2775 %{buildroot}/usr/local/pf/var/ssl_mutex
%{__install} -d %{buildroot}/usr/local/pf/var/conf
%{__install} -d -m2775 %{buildroot}/usr/local/pf/var/run
%{__install} -d %{buildroot}/usr/local/pf/var/rrd 
%{__install} -d %{buildroot}/usr/local/pf/var/session
%{__install} -d %{buildroot}/usr/local/pf/var/webadmin_cache
%{__install} -d %{buildroot}/usr/local/pf/var/control
%{__install} -d %{buildroot}/etc/sudoers.d
%{__install} -d %{buildroot}/etc/cron.d
touch %{buildroot}/usr/local/pf/var/cache_control
cp Makefile %{buildroot}/usr/local/pf/
cp config.mk %{buildroot}/usr/local/pf/
cp -r bin %{buildroot}/usr/local/pf/
cp -r addons/pfconfig/ %{buildroot}/usr/local/pf/addons/
cp -r addons/captive-portal/ %{buildroot}/usr/local/pf/addons/
cp -r addons/dev-helpers/ %{buildroot}/usr/local/pf/addons/
cp -r addons/high-availability/ %{buildroot}/usr/local/pf/addons/
cp -r addons/integration-testing/ %{buildroot}/usr/local/pf/addons/
cp -r addons/packages/ %{buildroot}/usr/local/pf/addons/
cp -r addons/upgrade/ %{buildroot}/usr/local/pf/addons/
cp -r addons/watchdog/ %{buildroot}/usr/local/pf/addons/
cp -r addons/AD/* %{buildroot}/usr/local/pf/addons/AD/
cp -r addons/monit/ %{buildroot}/usr/local/pf/addons/
cp addons/*.pl %{buildroot}/usr/local/pf/addons/
cp addons/*.sh %{buildroot}/usr/local/pf/addons/
%{__install} -D packetfence.logrotate %{buildroot}/etc/logrotate.d/packetfence
%{__install} -D packetfence.rsyslog-drop-in.service %{buildroot}/etc/systemd/system/rsyslog.service.d/packetfence.conf
%{__install} -D packetfence.journald %{buildroot}%{systemddir}/journald.conf.d/01-packetfence.conf
cp -r sbin %{buildroot}/usr/local/pf/
cp -r conf %{buildroot}/usr/local/pf/
cp -r raddb %{buildroot}/usr/local/pf/
mv packetfence.sudoers %{buildroot}/etc/sudoers.d/packetfence
mv packetfence.cron.d %{buildroot}/etc/cron.d/packetfence
cp -r ChangeLog %{buildroot}/usr/local/pf/
cp -r COPYING %{buildroot}/usr/local/pf/
cp -r db %{buildroot}/usr/local/pf/
cp -r docs %{buildroot}/usr/local/pf/
rm -rf %{buildroot}/usr/local/pf/docs/docbook
rm -rf %{buildroot}/usr/local/pf/docs/fonts
rm -rf %{buildroot}/usr/local/pf/docs/images
rm -rf %{buildroot}/usr/local/pf/docs/api

# install Golang binaries
%{__make} -C go DESTDIR=%{buildroot} copy
# clean Golang binaries from build dir
%{__make} -C go clean

# install html directory
%{__make} DESTDIR=%{buildroot} html_install

# install html and images dirs in pfappserver for embedded doc
%{__install} -d -m0755 %{buildroot}/usr/local/pf/html/pfappserver/root/static/doc
for i in `find docs/html "(" -name "*.html" -or -name "*.js" ")"  -type f`; do \
	%{__install} -m0644 $i %{buildroot}/usr/local/pf/html/pfappserver/root/static/doc/; \
done

# images
%{__make} DESTDIR=%{buildroot} images

cp -r lib %{buildroot}/usr/local/pf/
cp -r go %{buildroot}/usr/local/pf/
cp -r NEWS.asciidoc %{buildroot}/usr/local/pf/
cp -r NEWS.old %{buildroot}/usr/local/pf/
cp -r README.md %{buildroot}/usr/local/pf/
cp -r README.network-devices %{buildroot}/usr/local/pf/
cp -r UPGRADE.asciidoc %{buildroot}/usr/local/pf/
cp -r UPGRADE.old %{buildroot}/usr/local/pf/
# logfiles
for LOG in %logfiles; do
    touch %{buildroot}%logdir/$LOG
done
#start create symlinks
curdir=`pwd`

#pf-schema.sql symlinks to current schema
if [ ! -h "%{buildroot}/usr/local/pf/db/pf-schema.sql" ]; then
    cd %{buildroot}/usr/local/pf/db
    VERSIONSQL=$(ls pf-schema-* |sort -r | head -1)
    ln -f -s $VERSIONSQL ./pf-schema.sql
fi

#radius sites-enabled symlinks
#We standardize the way to use site-available/sites-enabled for the RADIUS server
cd %{buildroot}/usr/local/pf/raddb/sites-enabled
ln -s ../sites-available/dynamic-clients dynamic-clients
ln -s ../sites-available/status status

# Fingerbank symlinks
cd %{buildroot}/usr/local/pf/lib
ln -s /usr/local/fingerbank/lib/fingerbank fingerbank

cd $curdir
#end create symlinks

%clean
rm -rf %{buildroot}

#==============================================================================
# Pre-installation
#==============================================================================
%pre

/usr/bin/systemctl --now mask mariadb

# This (extremelly) ugly hack below will make the current processes part of a cgroup other than the one for user-0.slice
# This will allow for the current shells that are opened to be protected against stopping when we'll be calling isolate below which stops user-0.slice
# New shells will not be placed into user-0.slice since systemd-logind will be disabled and masked
/bin/bash -c "/usr/bin/systemctl status user-0.slice | /usr/bin/grep -E -o '─[0-9]+' | /usr/bin/sed 's/─//g' | /usr/bin/xargs -I{} /bin/bash -c '/usr/bin/kill -0 {} > /dev/null 2>/dev/null && /usr/bin/echo {} > /sys/fs/cgroup/systemd/tasks'"
/usr/bin/systemctl stop systemd-logind
/usr/bin/systemctl --now mask systemd-logind
/usr/bin/systemctl daemon-reload

# clean up the old systemd files if it's an upgrade
if [ "$1" = "2"   ]; then
    /usr/bin/systemctl disable packetfence-redis-cache
    /usr/bin/systemctl disable packetfence-config
    /usr/bin/systemctl disable packetfence.service
    /usr/bin/systemctl disable packetfence-haproxy.service
    /usr/bin/systemctl isolate packetfence-base.target
fi

if ! /usr/bin/id pf &>/dev/null; then
    if ! /bin/getent group  pf &>/dev/null; then
        echo "Creating pf user"
        /usr/sbin/useradd -r -d "/usr/local/pf" -s /bin/sh -c "PacketFence" -M pf || \
                ( echo Unexpected error adding user "pf" && exit )
    else
        echo "Creating pf user member of pf group"
        /usr/sbin/useradd -r -d "/usr/local/pf" -s /bin/sh -c "PacketFence" -M pf -g pf || \
                ( echo Unexpected error adding user "pf" && exit )
    fi
fi
echo "Adding pf user to app groups"
/usr/sbin/usermod -aG wbpriv,fingerbank,apache pf
/usr/sbin/usermod -aG pf mysql 
/usr/sbin/usermod -aG pf netdata

if [ ! `id -u` = "0" ];
then
  echo "You must install this package as root!"
  exit
fi

#==============================================================================
# Post Installation
#==============================================================================
%post
chown pf.pf /usr/local/pf/conf/pfconfig.conf
echo "Adding PacketFence config startup script"

# Handle 9.2 migration from several RPM to one package
# At this stage, packetfence-config unit file is "not-found" by systemd
# daemon-reload is necessary to take new unit file into account
# Restart of service is necessary to avoid long wait and failures of next commands
if [ "$(/bin/systemctl show -p LoadState packetfence-config | awk -F '=' '{print $2}')" == "not-found" ]; then
    echo "Systemd need a reload to take new packetfence-config unit file into account"
    /bin/systemctl daemon-reload
    echo "Starting packetfence-config service early to avoid failures when running next commands"
    /bin/systemctl start packetfence-config
else
    echo "packetfence-config service will be started by packetfence-httpd.admin service later"
fi

if [ "$1" = "2" ]; then
    /usr/local/pf/bin/pfcmd service pf updatesystemd
    perl /usr/local/pf/addons/upgrade/add-default-params-to-auth.pl
    /usr/local/pf/bin/pfcmd fixpermissions
fi

/usr/bin/mkdir -p /var/log/journal/
echo "Restarting journald to enable persistent logging"
/bin/systemctl restart systemd-journald

if [ `systemctl get-default` = "packetfence-cluster.target" ]; then 
    echo "This is an upgrade on a clustered system. We don't change the default systemd target."
else 
    echo "Setting packetfence.target as the default systemd target."
    /bin/systemctl set-default packetfence.target
fi

#Check if log files exist and create them with the correct owner
for fic_log in packetfence.log redis_cache.log security_event.log httpd.admin.audit.log
do
if [ ! -e /usr/local/pf/logs/$fic_log ]; then
  touch /usr/local/pf/logs/$fic_log
  chown pf.pf /usr/local/pf/logs/$fic_log
  chmod g+w /usr/local/pf/logs/$fic_log
fi
done

echo "Restarting rsyslogd"
/bin/systemctl restart rsyslog

#Make ssl certificate
cd /usr/local/pf
make conf/ssl/server.pem

# Create server local RADIUS secret
if [ ! -f /usr/local/pf/conf/local_secret ]; then
    date +%s | sha256sum | base64 | head -c 32 > /usr/local/pf/conf/local_secret
fi

# Create server API system user password
if [ ! -f /usr/local/pf/conf/unified_api_system_pass ]; then
    date +%s | sha256sum | base64 | head -c 32 > /usr/local/pf/conf/unified_api_system_pass
fi

for service in httpd snmptrapd portreserve redis netdata
do
  if /bin/systemctl -a | grep $service > /dev/null 2>&1; then
    echo "Disabling $service startup script"
    /bin/systemctl disable $service > /dev/null 2>&1
  fi
done

#Check if RADIUS have a dh
if [ ! -f /usr/local/pf/raddb/certs/dh ]; then
  echo "Building default RADIUS certificates..."
  cd /usr/local/pf/raddb/certs
  make
else
  echo "DH already exists, won't touch it!"
fi

if [ ! -f /usr/local/pf/conf/pf.conf ]; then
  echo "Touch pf.conf because it doesnt exist"
  touch /usr/local/pf/conf/pf.conf
  chown pf.pf /usr/local/pf/conf/pf.conf
else
  echo "pf.conf already exists, won't touch it!"
fi

#Getting rid of SELinux
echo "Disabling SELinux..."
setenforce 0
sed -i 's/^SELINUX=.*/SELINUX=disabled/g' /etc/selinux/config

# Getting rid of wrong ipv6 dns address
sed -i 's/\%.*$//g' /etc/resolv.conf

# Enabling ip forwarding
echo "# ip forwarding enabled by packetfence" > /etc/sysctl.d/99-ip_forward.conf
echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.d/99-ip_forward.conf
sysctl -p /etc/sysctl.d/99-ip_forward.conf

# reloading systemd unit files
/bin/systemctl daemon-reload

#Starting PacketFence.
echo "Starting PacketFence Administration GUI..."
#removing old cache
rm -rf /usr/local/pf/var/cache/
/usr/bin/firewall-cmd --zone=public --add-port=1443/tcp
/bin/systemctl disable firewalld
/bin/systemctl enable packetfence-mariadb
/bin/systemctl enable packetfence-redis-cache
/bin/systemctl enable packetfence-config
/bin/systemctl disable packetfence-iptables
/bin/systemctl isolate packetfence-base
/bin/systemctl enable packetfence-httpd.admin
/bin/systemctl enable packetfence-iptables

/usr/local/pf/bin/pfcmd configreload
/bin/systemctl restart packetfence-httpd.admin



echo Installation complete
echo "  * Please fire up your Web browser and go to https://@ip_packetfence:1443/configurator to complete your PacketFence configuration."
echo "  * Please stop your iptables service if you don't have access to configurator."

#==============================================================================
# Pre uninstallation
#==============================================================================
%preun
if [ $1 -eq 0 ] ; then
/bin/systemctl stop packetfence-config
/bin/systemctl disable packetfence-config
/bin/systemctl set-default multi-user.target
/bin/systemctl isolate multi-user.target
fi

%postun
if [ $1 -eq 0 ]; then
        if /usr/bin/id pf &>/dev/null; then
               /usr/sbin/userdel pf || %logmsg "User \"pf\" could not be deleted."
        fi
fi

#==============================================================================
# Packaged files
#==============================================================================
# TODO we should simplify this file manifest to the maximum keeping treating 
# only special attributes explicitly 
# "To make this situation a bit easier, if the %%files list contains a path
# to a directory, RPM will automatically package every file in that 
# directory, as well as every file in each subdirectory."
# -- http://www.rpm.org/max-rpm/s1-rpm-inside-files-list.html
%files

%defattr(-, pf, pf)
%attr(0644, root, root) /etc/systemd/system/packetfence.target
%attr(0644, root, root) /etc/systemd/system/packetfence-base.target
%attr(0644, root, root) /etc/systemd/system/packetfence-cluster.target
%attr(0644, root, root) /etc/systemd/system/packetfence*.slice

%attr(0644, root, root) %{_unitdir}/packetfence-*.service
%attr(0644, root, root) %{_unitdir}/packetfence-*.path
%attr(0644, root, root) %{systemddir}/journald.conf.d/01-packetfence.conf

%dir %attr(0750, root,root) /etc/systemd/system/packetfence*target.wants
%attr(0644, root, root) /etc/systemd/system/rsyslog.service.d/packetfence.conf

%dir %attr(0750,root,root) %{_sysconfdir}/sudoers.d
%config %attr(0440,root,root) %{_sysconfdir}/sudoers.d/packetfence
%config %attr(0644,root,root) %{_sysconfdir}/logrotate.d/packetfence
%config %attr(0600,root,root) %{_sysconfdir}/cron.d/packetfence

%dir                    /usr/local/pf
                        /usr/local/pf/Makefile
                        /usr/local/pf/config.mk
%dir                    /usr/local/pf/addons
%attr(0755, pf, pf)     /usr/local/pf/addons/*.pl
%attr(0755, pf, pf)     /usr/local/pf/addons/*.sh
%dir                    /usr/local/pf/addons/AD/
                        /usr/local/pf/addons/AD/*
%dir                    /usr/local/pf/addons/captive-portal/
                        /usr/local/pf/addons/captive-portal/*
%dir                    /usr/local/pf/addons/dev-helpers/
                        /usr/local/pf/addons/dev-helpers/*
%dir                    /usr/local/pf/addons/high-availability/
                        /usr/local/pf/addons/high-availability/*
%dir                    /usr/local/pf/addons/integration-testing/
                        /usr/local/pf/addons/integration-testing/*
%dir                    /usr/local/pf/addons/monit
                        /usr/local/pf/addons/monit/*
%dir                    /usr/local/pf/addons/packages
                        /usr/local/pf/addons/packages/*
%dir                    /usr/local/pf/addons/pfconfig
%exclude                /usr/local/pf/addons/pfconfig/pfconfig.init
%dir                    /usr/local/pf/addons/pfconfig/comparator
%attr(0755, pf, pf)     /usr/local/pf/addons/pfconfig/comparator/*.pl
%attr(0755, pf, pf)     /usr/local/pf/addons/pfconfig/comparator/*.sh
%dir                    /usr/local/pf/addons/upgrade
%attr(0755, pf, pf)     /usr/local/pf/addons/upgrade/*.pl
%attr(0755, pf, pf)     /usr/local/pf/addons/upgrade/*.sh
%dir                    /usr/local/pf/addons/watchdog
%attr(0755, pf, pf)     /usr/local/pf/addons/watchdog/*.sh
%dir                    /usr/local/pf/bin
%attr(6755, root, root) /usr/local/pf/bin/pfcmd
%attr(0755, root, root) /usr/local/pf/bin/ntlm_auth_wrapper
%attr(0755, pf, pf)     /usr/local/pf/bin/pfcmd.pl
%attr(0755, pf, pf)     /usr/local/pf/bin/pfcmd_vlan
%attr(0755, pf, pf)     /usr/local/pf/bin/pftest
                        /usr/local/pf/bin/pflogger-packetfence
%attr(0755, pf, pf)     /usr/local/pf/bin/pflogger.pl
%attr(0755, pf, pf)     /usr/local/pf/bin/cluster/maintenance
%attr(0755, pf, pf)     /usr/local/pf/bin/cluster/management_update
%attr(0755, pf, pf)     /usr/local/pf/bin/cluster/sync
%attr(0755, pf, pf)     /usr/local/pf/bin/cluster/pfupdate
%attr(0755, pf, pf)     /usr/local/pf/bin/cluster/maintenance
%attr(0755, pf, pf)     /usr/local/pf/bin/cluster/node
%attr(0755, pf, pf)     /usr/local/pf/sbin/pfhttpd
%attr(0755, pf, pf)     /usr/local/pf/sbin/pfdetect
%attr(0755, pf, pf)     /usr/local/pf/sbin/pfdhcp
%attr(0755, pf, pf)     /usr/local/pf/sbin/pfdns
%attr(0755, pf, pf)     /usr/local/pf/sbin/pfstats
%attr(0755, pf, pf)     /usr/local/pf/sbin/pfconfig
%doc                    /usr/local/pf/ChangeLog
                        /usr/local/pf/conf/*.example
%dir %attr(0770, pf pf) /usr/local/pf/conf
%config(noreplace)      /usr/local/pf/conf/pfconfig.conf
%config(noreplace)      /usr/local/pf/conf/adminroles.conf
%config(noreplace)      /usr/local/pf/conf/allowed_device_oui.txt
%config                 /usr/local/pf/conf/ui.conf
                        /usr/local/pf/conf/allowed_device_oui.txt.example
%config(noreplace)      /usr/local/pf/conf/apache_filters.conf
                        /usr/local/pf/conf/apache_filters.conf.example
%config                 /usr/local/pf/conf/apache_filters.conf.defaults
%config(noreplace)      /usr/local/pf/conf/authentication.conf
%config                 /usr/local/pf/conf/caddy-services/*.conf
                        /usr/local/pf/conf/caddy-services/*.conf.example
%config(noreplace)      /usr/local/pf/conf/chi.conf
%config                 /usr/local/pf/conf/chi.conf.defaults
%config(noreplace)      /usr/local/pf/conf/nexpose-responses.txt
%config(noreplace)      /usr/local/pf/conf/pfdns.conf
%config(noreplace)      /usr/local/pf/conf/pfdhcp.conf
%config(noreplace)      /usr/local/pf/conf/portal_modules.conf
%config                 /usr/local/pf/conf/portal_modules.conf.defaults
%config(noreplace)      /usr/local/pf/conf/self_service.conf
%config                 /usr/local/pf/conf/self_service.conf.defaults
                        /usr/local/pf/conf/self_service.conf.example
%config                 /usr/local/pf/conf/dhcp_fingerprints.conf
%config(noreplace)      /usr/local/pf/conf/dhcp_filters.conf
                        /usr/local/pf/conf/dhcp_filters.conf.example
%config(noreplace)      /usr/local/pf/conf/dns_filters.conf
                        /usr/local/pf/conf/dns_filters.conf.example
%config                 /usr/local/pf/conf/dns_filters.conf.defaults
%config                 /usr/local/pf/conf/documentation.conf
%config(noreplace)      /usr/local/pf/conf/firewall_sso.conf
                        /usr/local/pf/conf/firewall_sso.conf.example
%config(noreplace)      /usr/local/pf/conf/survey.conf
%config                 /usr/local/pf/conf/survey.conf.example
%config(noreplace)      /usr/local/pf/conf/redis_cache.conf
                        /usr/local/pf/conf/redis_cache.conf.example
%config(noreplace)      /usr/local/pf/conf/redis_queue.conf
                        /usr/local/pf/conf/redis_queue.conf.example
%config(noreplace)      /usr/local/pf/conf/redis_ntlm_cache.conf
                        /usr/local/pf/conf/redis_ntlm_cache.conf.example
%config(noreplace)      /usr/local/pf/conf/stats.conf
                        /usr/local/pf/conf/stats.conf.example
%config                 /usr/local/pf/conf/stats.conf.defaults
%config(noreplace)      /usr/local/pf/conf/floating_network_device.conf
%config(noreplace)      /usr/local/pf/conf/guest-managers.conf
                        /usr/local/pf/conf/git_commit_id
                        /usr/local/pf/conf/saml-sp-metadata.xml
%dir                    /usr/local/pf/conf/I18N
%dir                    /usr/local/pf/conf/I18N/api
                        /usr/local/pf/conf/I18N/api/*
%dir                    /usr/local/pf/conf/locale
%dir                    /usr/local/pf/conf/locale/de
%dir                    /usr/local/pf/conf/locale/de/LC_MESSAGES
%config(noreplace)      /usr/local/pf/conf/locale/de/LC_MESSAGES/packetfence.po
%config(noreplace)      /usr/local/pf/conf/locale/de/LC_MESSAGES/packetfence.mo
%dir                    /usr/local/pf/conf/locale/en
%dir                    /usr/local/pf/conf/locale/en/LC_MESSAGES
%config(noreplace)      /usr/local/pf/conf/locale/en/LC_MESSAGES/packetfence.po
%config(noreplace)      /usr/local/pf/conf/locale/en/LC_MESSAGES/packetfence.mo
%dir                    /usr/local/pf/conf/locale/es
%dir                    /usr/local/pf/conf/locale/es/LC_MESSAGES
%config(noreplace)      /usr/local/pf/conf/locale/es/LC_MESSAGES/packetfence.po
%config(noreplace)      /usr/local/pf/conf/locale/es/LC_MESSAGES/packetfence.mo
%dir                    /usr/local/pf/conf/locale/fr
%dir                    /usr/local/pf/conf/locale/fr/LC_MESSAGES
%config(noreplace)      /usr/local/pf/conf/locale/fr/LC_MESSAGES/packetfence.po
%config(noreplace)      /usr/local/pf/conf/locale/fr/LC_MESSAGES/packetfence.mo
%dir                    /usr/local/pf/conf/locale/he_IL
%dir                    /usr/local/pf/conf/locale/he_IL/LC_MESSAGES
%config(noreplace)      /usr/local/pf/conf/locale/he_IL/LC_MESSAGES/packetfence.po
%config(noreplace)      /usr/local/pf/conf/locale/he_IL/LC_MESSAGES/packetfence.mo
%dir                    /usr/local/pf/conf/locale/it
%dir                    /usr/local/pf/conf/locale/it/LC_MESSAGES
%config(noreplace)      /usr/local/pf/conf/locale/it/LC_MESSAGES/packetfence.po
%config(noreplace)      /usr/local/pf/conf/locale/it/LC_MESSAGES/packetfence.mo
%dir                    /usr/local/pf/conf/locale/nl
%dir                    /usr/local/pf/conf/locale/nl/LC_MESSAGES
%config(noreplace)      /usr/local/pf/conf/locale/nl/LC_MESSAGES/packetfence.po
%config(noreplace)      /usr/local/pf/conf/locale/nl/LC_MESSAGES/packetfence.mo
%dir                    /usr/local/pf/conf/locale/pl_PL
%dir                    /usr/local/pf/conf/locale/pl_PL/LC_MESSAGES
%config(noreplace)      /usr/local/pf/conf/locale/pl_PL/LC_MESSAGES/packetfence.po
%config(noreplace)      /usr/local/pf/conf/locale/pl_PL/LC_MESSAGES/packetfence.mo
%dir                    /usr/local/pf/conf/locale/pt_BR
%dir                    /usr/local/pf/conf/locale/pt_BR/LC_MESSAGES
%config(noreplace)      /usr/local/pf/conf/locale/pt_BR/LC_MESSAGES/packetfence.po
%config(noreplace)      /usr/local/pf/conf/locale/pt_BR/LC_MESSAGES/packetfence.mo
%config(noreplace)      /usr/local/pf/conf/log.conf
%dir                    /usr/local/pf/conf/log.conf.d
%config(noreplace)      /usr/local/pf/conf/log.conf.d/*.conf
                        /usr/local/pf/conf/log.conf.d/*.example
%dir                    /usr/local/pf/conf/mariadb
%config                 /usr/local/pf/conf/mariadb/*.tt
                        /usr/local/pf/conf/mariadb/*.tt.example
%dir                    /usr/local/pf/conf/nessus
%config(noreplace)      /usr/local/pf/conf/nessus/remotescan.nessus
                        /usr/local/pf/conf/nessus/remotescan.nessus.example
%config(noreplace)      /usr/local/pf/conf/networks.conf
%config                 /usr/local/pf/conf/openssl.cnf
%config                 /usr/local/pf/conf/oui.txt
%config                 /usr/local/pf/conf/passthrough.lua.tt
%config                 /usr/local/pf/conf/pf.conf.defaults
                        /usr/local/pf/conf/pf-release
%config(noreplace)      /usr/local/pf/conf/pki_provider.conf
                        /usr/local/pf/conf/pki_provider.conf.example
%config(noreplace)      /usr/local/pf/conf/provisioning.conf
                        /usr/local/pf/conf/provisioning.conf.example
%config(noreplace)      /usr/local/pf/conf/radius_filters.conf
                        /usr/local/pf/conf/radius_filters.conf.example
%dir			/usr/local/pf/conf/radiusd
%config(noreplace)      /usr/local/pf/conf/radiusd/clients.conf.inc
                        /usr/local/pf/conf/radiusd/clients.conf.inc.example
%config(noreplace)      /usr/local/pf/conf/radiusd/clients.eduroam.conf.inc
                        /usr/local/pf/conf/radiusd/clients.eduroam.conf.inc.example
%config(noreplace)      /usr/local/pf/conf/radiusd/mschap.conf
                        /usr/local/pf/conf/radiusd/mschap.conf.example
%config(noreplace)      /usr/local/pf/conf/radiusd/packetfence-cluster
                        /usr/local/pf/conf/radiusd/packetfence-cluster.example
%config(noreplace)      /usr/local/pf/conf/radiusd/packetfence-pre-proxy
                        /usr/local/pf/conf/radiusd/packetfence-pre-proxy.example
%config(noreplace)      /usr/local/pf/conf/radiusd/proxy.conf.inc
                        /usr/local/pf/conf/radiusd/proxy.conf.inc.example
%config(noreplace)      /usr/local/pf/conf/radiusd/proxy.conf.loadbalancer
                        /usr/local/pf/conf/radiusd/proxy.conf.loadbalancer.example
%config(noreplace)	/usr/local/pf/conf/radiusd/eap.conf
                        /usr/local/pf/conf/radiusd/eap.conf.example
%config(noreplace)	/usr/local/pf/conf/radiusd/radiusd.conf
                        /usr/local/pf/conf/radiusd/radiusd.conf.example
%config(noreplace)	/usr/local/pf/conf/radiusd/sql.conf
                        /usr/local/pf/conf/radiusd/sql.conf.example
%config(noreplace)	/usr/local/pf/conf/radiusd/packetfence
                        /usr/local/pf/conf/radiusd/packetfence.example
%config(noreplace)	/usr/local/pf/conf/radiusd/packetfence-tunnel
                        /usr/local/pf/conf/radiusd/packetfence-tunnel.example
%config(noreplace)      /usr/local/pf/conf/radiusd/acct.conf
                        /usr/local/pf/conf/radiusd/acct.conf.example
%config(noreplace)      /usr/local/pf/conf/radiusd/auth.conf
                        /usr/local/pf/conf/radiusd/auth.conf.example
%config(noreplace)      /usr/local/pf/conf/radiusd/ldap_packetfence.conf
                        /usr/local/pf/conf/radiusd/ldap_packetfence.conf.example
%config(noreplace)      /usr/local/pf/conf/radiusd/load_balancer.conf
                        /usr/local/pf/conf/radiusd/load_balancer.conf.example
%config(noreplace)      /usr/local/pf/conf/radiusd/rest.conf
                        /usr/local/pf/conf/radiusd/rest.conf.example
%config(noreplace)      /usr/local/pf/conf/radiusd/cli.conf
                        /usr/local/pf/conf/radiusd/cli.conf.example
%config(noreplace)      /usr/local/pf/conf/radiusd/packetfence-cli
                        /usr/local/pf/conf/radiusd/packetfence-cli.example
%config(noreplace)      /usr/local/pf/conf/radiusd/eduroam
                        /usr/local/pf/conf/radiusd/eduroam.example
%config(noreplace)      /usr/local/pf/conf/radiusd/eduroam-cluster
                        /usr/local/pf/conf/radiusd/eduroam-cluster.example
%config(noreplace)      /usr/local/pf/conf/radiusd/eduroam.conf
                        /usr/local/pf/conf/radiusd/eduroam.conf.example
%config(noreplace)      /usr/local/pf/conf/radiusd/radiusd_loadbalancer.conf
                        /usr/local/pf/conf/radiusd/radiusd_loadbalancer.conf.example
%config(noreplace)      /usr/local/pf/conf/realm.conf
                        /usr/local/pf/conf/realm.conf.example
%config                 /usr/local/pf/conf/realm.conf.defaults
%config(noreplace)      /usr/local/pf/conf/radius_filters.conf
                        /usr/local/pf/conf/radius_filters.conf.example
%config(noreplace)      /usr/local/pf/conf/rsyslog.conf.tt
%config(noreplace)      /usr/local/pf/conf/billing_tiers.conf
                        /usr/local/pf/conf/billing_tiers.conf.example
%config(noreplace)      /usr/local/pf/conf/domain.conf
                        /usr/local/pf/conf/domain.conf.example
%config(noreplace)      /usr/local/pf/conf/pfdetect.conf
                        /usr/local/pf/conf/pfdetect.conf.example
%config(noreplace)      /usr/local/pf/conf/pfqueue.conf
                        /usr/local/pf/conf/pfqueue.conf.example
%config                 /usr/local/pf/conf/pfqueue.conf.defaults
%config(noreplace)      /usr/local/pf/conf/suricata_categories.txt
                        /usr/local/pf/conf/suricata_categories.txt.example
%config(noreplace)      /usr/local/pf/conf/scan.conf
                        /usr/local/pf/conf/scan.conf.example
%dir                    /usr/local/pf/conf/ssl
%dir                    /usr/local/pf/conf/ssl/acme-challenge
%dir                    /usr/local/pf/conf/systemd
%config                 /usr/local/pf/conf/systemd/*
%config(noreplace)      /usr/local/pf/conf/switches.conf
%config                 /usr/local/pf/conf/switches.conf.defaults
                        /usr/local/pf/conf/switches.conf.example
%config(noreplace)      /usr/local/pf/conf/switch_filters.conf
                        /usr/local/pf/conf/switch_filters.conf.example
%config(noreplace)      /usr/local/pf/conf/vlan_filters.conf
                        /usr/local/pf/conf/vlan_filters.conf.example
%config                 /usr/local/pf/conf/vlan_filters.conf.defaults
%config(noreplace)      /usr/local/pf/conf/haproxy-db.conf
                        /usr/local/pf/conf/haproxy-db.conf.example
%config(noreplace)      /usr/local/pf/conf/haproxy-portal.conf
                        /usr/local/pf/conf/haproxy-portal.conf.example
%config                 /usr/local/pf/conf/fingerbank-collector.env.defaults
%dir                    /usr/local/pf/conf/httpd.conf.d
%config                 /usr/local/pf/conf/httpd.conf.d/captive-portal-common.tt
                        /usr/local/pf/conf/httpd.conf.d/captive-portal-common.tt.example
%config                 /usr/local/pf/conf/httpd.conf.d/httpd.aaa.tt
                        /usr/local/pf/conf/httpd.conf.d/httpd.aaa.tt.example
%config                 /usr/local/pf/conf/httpd.conf.d/httpd.admin.tt
                        /usr/local/pf/conf/httpd.conf.d/httpd.admin.tt.example
%config                 /usr/local/pf/conf/httpd.conf.d/httpd.portal.tt
                        /usr/local/pf/conf/httpd.conf.d/httpd.portal.tt.example
%config                 /usr/local/pf/conf/httpd.conf.d/httpd.proxy.tt
                        /usr/local/pf/conf/httpd.conf.d/httpd.proxy.tt.example
%config                 /usr/local/pf/conf/httpd.conf.d/httpd.webservices.tt
                        /usr/local/pf/conf/httpd.conf.d/httpd.webservices.tt.example
%config                 /usr/local/pf/conf/httpd.conf.d/httpd.collector.tt
                        /usr/local/pf/conf/httpd.conf.d/httpd.collector.tt.example
%config                 /usr/local/pf/conf/httpd.conf.d/log.conf
%config(noreplace)	/usr/local/pf/conf/httpd.conf.d/ssl-certificates.conf
                        /usr/local/pf/conf/httpd.conf.d/ssl-certificates.conf.example
%config(noreplace)      /usr/local/pf/conf/iptables.conf
%config(noreplace)      /usr/local/pf/conf/keepalived.conf
                        /usr/local/pf/conf/keepalived.conf.example
%config(noreplace)      /usr/local/pf/conf/cluster.conf
                        /usr/local/pf/conf/cluster.conf.example
%config(noreplace)      /usr/local/pf/conf/listener.msg
                        /usr/local/pf/conf/listener.msg.example
%dir                    /usr/local/pf/conf/caddy-services
%config                 /usr/local/pf/conf/caddy-services/pfsso.conf
%config                 /usr/local/pf/conf/caddy-services/httpdispatcher.conf
%dir                    /usr/local/pf/conf/monitoring
%config(noreplace)      /usr/local/pf/conf/monitoring/netdata.conf
                        /usr/local/pf/conf/monitoring/netdata.conf.example
%config                 /usr/local/pf/conf/monitoring/*.conf
                        /usr/local/pf/conf/monitoring/*.conf.example
%config                 /usr/local/pf/conf/monitoring/charts.d/*.conf
                        /usr/local/pf/conf/monitoring/charts.d/*.conf.example
%config                 /usr/local/pf/conf/monitoring/health.d/*.conf
                        /usr/local/pf/conf/monitoring/health.d/*.conf.example
%config                 /usr/local/pf/conf/monitoring/node.d/*.md
%config                 /usr/local/pf/conf/monitoring/python.d/*.conf
                        /usr/local/pf/conf/monitoring/python.d/*.conf.example
%config                 /usr/local/pf/conf/monitoring/statsd.d/*.conf
                        /usr/local/pf/conf/monitoring/statsd.d/*.conf.example
%config(noreplace)      /usr/local/pf/conf/profiles.conf
%config                 /usr/local/pf/conf/profiles.conf.defaults
%config(noreplace)      /usr/local/pf/conf/pfmon.conf
%config                 /usr/local/pf/conf/pfmon.conf.defaults
%config(noreplace)      /usr/local/pf/conf/roles.conf
%config                 /usr/local/pf/conf/roles.conf.defaults
%config(noreplace)      /usr/local/pf/conf/snmptrapd.conf
%config(noreplace)      /usr/local/pf/conf/syslog.conf
%config                 /usr/local/pf/conf/syslog.conf.defaults
%config(noreplace)      /usr/local/pf/conf/security_events.conf
%config                 /usr/local/pf/conf/security_events.conf.defaults
%config(noreplace)      /usr/local/pf/conf/wmi.conf
                        /usr/local/pf/conf/wmi.conf.example
%config(noreplace)      /usr/local/pf/conf/report.conf
                        /usr/local/pf/conf/report.conf.defaults
                        /usr/local/pf/conf/report.conf.example
%config(noreplace)      /usr/local/pf/conf/template_switches.conf
                        /usr/local/pf/conf/template_switches.conf.defaults
%config(noreplace)      /usr/local/pf/conf/traffic_shaping.conf
                        /usr/local/pf/conf/traffic_shaping.conf.example
%doc                    /usr/local/pf/COPYING
%dir                    /usr/local/pf/db
                        /usr/local/pf/db/*
%dir                    /usr/local/pf/docs
%doc                    /usr/local/pf/docs/*
%exclude                /usr/local/pf/docs/README.asciidoc
%if %{builddoc} == 1
%doc                    /usr/local/pf/docs/*.pdf
%exclude                /usr/local/pf/docs/*.fo
%endif

### html dir
# %%dir will add only html dir, not subdirectories or files
%dir                    /usr/local/pf/html

# parking dir and files below
                        /usr/local/pf/html/parking

# common dir and files below
                        /usr/local/pf/html/common
%config(noreplace)      /usr/local/pf/html/common/styles.css
%config(noreplace)      /usr/local/pf/html/common/styles.css.map
%config(noreplace)      /usr/local/pf/html/common/styles-dark.css

# captive portal
%dir                    /usr/local/pf/html/captive-portal
                        /usr/local/pf/html/captive-portal/Changes
                        /usr/local/pf/html/captive-portal/Makefile.PL
                        /usr/local/pf/html/captive-portal/README
%config(noreplace)      /usr/local/pf/html/captive-portal/captiveportal.conf
                        /usr/local/pf/html/captive-portal/captiveportal.conf.example
                        /usr/local/pf/html/captive-portal/content/countdown.min.js
                        /usr/local/pf/html/captive-portal/content/guest-management.js
                        /usr/local/pf/html/captive-portal/content/captiveportal.js
                        /usr/local/pf/html/captive-portal/content/autosubmit.js
                        /usr/local/pf/html/captive-portal/content/timerbar.js
                        /usr/local/pf/html/captive-portal/content/ChilliLibrary.js
                        /usr/local/pf/html/captive-portal/content/shared_mdm_profile.mobileconfig
                        /usr/local/pf/html/captive-portal/content/packetfence-windows-agent.exe
                        /usr/local/pf/html/captive-portal/content/billing/stripe.js
                        /usr/local/pf/html/captive-portal/content/billing/authorizenet.js
                        /usr/local/pf/html/captive-portal/content/provisioner/mobileconfig.js
                        /usr/local/pf/html/captive-portal/content/provisioner/sepm.js
                        /usr/local/pf/html/captive-portal/content/release.js
                        /usr/local/pf/html/captive-portal/content/scan.js
                        /usr/local/pf/html/captive-portal/content/status.js
                        /usr/local/pf/html/captive-portal/content/waiting.js
                        /usr/local/pf/html/captive-portal/content/PacketFenceAgent.apk
                        /usr/local/pf/html/captive-portal/content/sslinspection.js
                        /usr/local/pf/html/captive-portal/content/images
                        /usr/local/pf/html/captive-portal/lib
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Controller/Activate/Email.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Controller/Authenticate.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Controller/DeviceRegistration.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Controller/Enabler.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Controller/Node/Manager.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Controller/Redirect.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Controller/Remediation.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Controller/Root.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Controller/Status.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Controller/WirelessProfile.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Form/Authentication.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Form/Field/AUP.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Form/Widget/Field/AUP.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/Model/Portal/Session.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/View/HTML.pm
%config(noreplace)      /usr/local/pf/html/captive-portal/lib/captiveportal/View/MobileConfig.pm
                        /usr/local/pf/html/captive-portal/script
                        /usr/local/pf/html/captive-portal/templates
# pfappserver dir
                        /usr/local/pf/html/pfappserver
%config(noreplace)      /usr/local/pf/html/pfappserver/pfappserver.conf
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Admin.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/AdminRoles.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/Firewall_SSO.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/FloatingDevice.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/Networks.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/Pf.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/Profile/Default.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/Profile.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/Provisioning.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/Realm.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/Switch.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/System.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Configuration.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Configurator.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Config/Wrix.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/DB.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Graph.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Interface.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Node.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Root.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/SavedSearch/Node.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/SavedSearch/User.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/Service.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/User.pm
%config(noreplace)      /usr/local/pf/html/pfappserver/lib/pfappserver/Controller/SecurityEvent.pm
%doc                    /usr/local/pf/html/pfappserver/root/static/doc/*

# lib dir
                        /usr/local/pf/lib/
%dir                    /usr/local/pf/lib/pfconfig
                        /usr/local/pf/lib/pfconfig/*
%config(noreplace)      /usr/local/pf/lib/pf/floatingdevice/custom.pm
%config(noreplace)      /usr/local/pf/lib/pf/inline/custom.pm
%config(noreplace)      /usr/local/pf/lib/pf/lookup/node.pm
%config(noreplace)      /usr/local/pf/lib/pf/lookup/person.pm
%dir                    /usr/local/pf/lib/pf/pfcmd
                        /usr/local/pf/lib/pf/pfcmd/*
%dir                    /usr/local/pf/lib/pf/Portal
                        /usr/local/pf/lib/pf/Portal/*
%dir                    /usr/local/pf/lib/pf/radius
                        /usr/local/pf/lib/pf/radius/constants.pm
%config(noreplace)      /usr/local/pf/lib/pf/radius/custom.pm
%config(noreplace)      /usr/local/pf/lib/pf/roles/custom.pm
%config(noreplace)      /usr/local/pf/lib/pf/role/custom.pm
%config(noreplace)      /usr/local/pf/lib/pf/web/custom.pm

%dir                    /usr/local/pf/go
                        /usr/local/pf/go/*

%dir %attr(02755, pf, pf)     /usr/local/pf/logs
# logfiles
%ghost                  %logdir/packetfence.log
%ghost                  %logdir/snmptrapd.log
%ghost                  %logdir/security_event.log
%ghost                  %logdir/httpd.admin.audit.log
%ghost                  %logdir/pfdetect
%ghost                  %logdir/pfmon
%doc                    /usr/local/pf/NEWS.asciidoc
%doc                    /usr/local/pf/NEWS.old
%doc                    /usr/local/pf/README.md
%doc                    /usr/local/pf/README.network-devices
%dir                    /usr/local/pf/sbin
%attr(0755, pf, pf)     /usr/local/pf/sbin/pfbandwidthd
%attr(0755, pf, pf)     /usr/local/pf/sbin/pfdhcplistener
%attr(0755, pf, pf)     /usr/local/pf/sbin/pfperl-api
%attr(0755, pf, pf)     /usr/local/pf/sbin/pf-mariadb
%attr(0755, pf, pf)     /usr/local/pf/sbin/pfmon
%attr(0755, pf, pf)     /usr/local/pf/sbin/pfqueue
%attr(0755, pf, pf)     /usr/local/pf/sbin/pffilter
%attr(0755, pf, pf)     /usr/local/pf/sbin/winbindd-wrapper
%attr(0755, pf, pf)     /usr/local/pf/sbin/radsniff-wrapper
%doc                    /usr/local/pf/UPGRADE.asciidoc
%doc                    /usr/local/pf/UPGRADE.old
%dir                    /usr/local/pf/var
%dir                    /usr/local/pf/var/conf
%dir                    /usr/local/pf/raddb
                        /usr/local/pf/raddb/*
%config                 /usr/local/pf/raddb/clients.conf
%config                 /usr/local/pf/raddb/proxy.conf
%config                 /usr/local/pf/raddb/users
%config(noreplace)      /usr/local/pf/raddb/policy.d/*
%config(noreplace)      /usr/local/pf/raddb/mods-enabled/*
%config(noreplace)      /usr/local/pf/raddb/mods-config/*
%config(noreplace)      /usr/local/pf/raddb/mods-available/*
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/buffered-sql
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/coa
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/control-socket
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/copy-acct-to-home-server
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/decoupled-accounting
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/default
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/dhcp
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/dynamic-clients
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/example
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/inner-tunnel
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/originate-coa
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/proxy-inner-tunnel
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/robust-proxy-accounting
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/status
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/virtual.example.com
%attr(0755, pf, pf) %config(noreplace)    /usr/local/pf/raddb/sites-available/vmps
%dir                    /usr/local/pf/var/run
%dir                    /usr/local/pf/var/rrd
%dir                    /usr/local/pf/var/session
%dir                    /usr/local/pf/var/webadmin_cache
%dir                    /usr/local/pf/var/control
%dir                    /usr/local/pf/var/redis_cache
%dir                    /usr/local/pf/var/redis_queue
%dir                    /usr/local/pf/var/redis_ntlm_cache
%dir                    /usr/local/pf/var/ssl_mutex
%config(noreplace)      /usr/local/pf/var/cache_control

#==============================================================================
# Changelog
#==============================================================================
%changelog
* Mon Jan 13 2020 Inverse <info@inverse.ca> - 9.3.0-1
- New release 9.3.0

* Tue Nov 26 2019 Inverse <info@inverse.ca> - 9.2.0-1
- New release 9.2.0

* Tue Nov 19 2019 Inverse <info@inverse.ca> - 9.1.9-3
- Start packetfence-config early to avoid issues during 9.2 upgrade

* Fri Oct 11 2019 Inverse <info@inverse.ca> - 9.1.9-2
- Obsoletes old packetfence packages
- Simplify FreeRADIUS dependencies

* Thu Oct 10 2019 Inverse <info@inverse.ca> - 9.1.9-1
- Make only one packetfence package, arch dependent
- Adapt spec file to CI
- Use macros

* Wed May 15 2019 Inverse <info@inverse.ca> - 9.0.0-1
- New release 9.0.0

* Wed Jan 09 2019 Inverse <info@inverse.ca> - 8.3.0-1
- New release 8.3.0

* Wed Nov 07 2018 Inverse <info@inverse.ca> - 8.2.0-1
- New release 8.2.0

* Mon Jul 09 2018 Inverse <info@inverse.ca> - 8.1.0-1
- New release 8.1.0

* Thu Apr 26 2018 Inverse <info@inverse.ca> - 8.0.0-1
- New release 8.0.0

* Thu Jan 25 2018 Inverse <info@inverse.ca> - 7.4.0-1
- New release 7.4.0

* Mon Sep 25 2017 Inverse <info@inverse.ca> - 7.3.0-1
- New release 7.3.0

* Tue Jul 11 2017 Inverse <info@inverse.ca> - 7.2.0-2
- Fix a GID permissions issue with MariaDB

* Mon Jul 10 2017 Inverse <info@inverse.ca> - 7.2.0-1
- New release 7.2.0

* Thu Jun  1 2017 Inverse <info@inverse.ca> - 7.1.0-1
- New release 7.1.0

* Wed Apr 19 2017 Inverse <info@inverse.ca> - 7.0.0-1
- New release 7.0.0

* Thu Feb 23 2017 Inverse <info@inverse.ca> - 6.5.1-1
- New release 6.5.1

* Mon Jan 30 2017 Inverse <info@inverse.ca> - 6.5.0-1
- New release 6.5.0

* Wed Nov 16 2016 Inverse <info@inverse.ca> - 6.4.0-1
- New release 6.4.0

* Wed Oct 05 2016 Inverse <info@inverse.ca> - 6.3.0-1
- New release 6.3.0

* Fri Jul 08 2016 Inverse <info@inverse.ca> - 6.2.1-1
- New release 6.2.1

* Tue Jul 05 2016 Inverse <info@inverse.ca> - 6.2.0-1
- New release 6.2.0

* Wed Jun 22 2016 Inverse <info@inverse.ca> - 6.1.1-1
- New release 6.1.1

* Tue Jun 21 2016 Inverse <info@inverse.ca> - 6.1.0-1
- New release 6.1.0

* Thu Jun  2 2016 Inverse <info@inverse.ca> - 6.0.3-1
- New release 6.0.3

* Thu May 26 2016 Inverse <info@inverse.ca> - 6.0.2-1
- New release 6.0.2

* Thu Apr 28 2016 Inverse <info@inverse.ca> - 6.0.1-1
- New release 6.0.1

* Tue Apr 19 2016 Inverse <info@inverse.ca> - 6.0.0-1
- New release 6.0.0

* Wed Feb 17 2016 Inverse <info@inverse.ca> - 5.7.0-1
- New release 5.7.0

* Wed Jan 13 2016 Inverse <info@inverse.ca> - 5.6.0-1
- New release 5.6.0

* Fri Nov 27 2015 Inverse <info@inverse.ca> - 5.5.1-1
- New release 5.5.1

* Fri Nov 20 2015 Inverse <info@inverse.ca> - 5.5.0-1
- New release 5.5.0

* Thu Oct  1 2015 Inverse <info@inverse.ca> - 5.4.0-1
- New release 5.4.0

* Tue Jul 21 2015 Inverse <info@inverse.ca> - 5.3.0-1
- New release 5.3.0

* Thu Jun 18 2015 Inverse <info@inverse.ca> - 5.2.0-1
- New release 5.2.0

* Tue May 26 2015 Inverse <info@inverse.ca> - 5.1.0-1
- New release 5.1.0

* Fri May 01 2015 Inverse <info@inverse.ca> - 5.0.2-1
- New release 5.0.2

* Wed Apr 22 2015 Inverse <info@inverse.ca> - 5.0.1-1
- New release 5.0.1

* Wed Apr 15 2015 Inverse <info@inverse.ca> - 5.0.0-1
- New release 5.0.0

* Fri Mar 06 2015 Inverse <info@inverse.ca> - 4.7.0-1
- New release 4.7.0

* Thu Feb 19 2015 Inverse <info@inverse.ca> - 4.6.1-1
- New release 4.6.1

* Wed Feb 04 2015 Inverse <info@inverse.ca> - 4.6.0-1
- New release 4.6.0

* Mon Nov 10 2014 Inverse <info@inverse.ca> - 4.5.1-1
- New release 4.5.1

* Wed Oct 22 2014 Inverse <info@inverse.ca> - 4.5.0-1
- New release 4.5.0

* Wed Sep 10 2014 Inverse <info@inverse.ca> - 4.4.0-1
- New release 4.4.0

* Thu Jun 26 2014 Inverse <info@inverse.ca> - 4.3.0-1
- New release 4.3.0

* Thu May 29 2014 Inverse <info@inverse.ca> - 4.2.2-1
- New release 4.2.2

* Fri May 16 2014 Inverse <info@inverse.ca> - 4.2.1-1
- New release 4.2.1

* Tue May  6 2014 Inverse <info@inverse.ca> - 4.2.0-1
- New release 4.2.0

* Tue Apr 1 2014 Inverse <info@inverse.ca>
- Removed dependency on Perl module PHP::Session

* Wed Dec 11 2013 Francis Lachapelle <flachapelle@inverse.ca> - 4.1.0-1
- New release 4.1.0

* Thu Sep 5 2013 Francis Lachapelle <flachapelle@inverse.ca> - 4.0.6-1
- New release 4.0.6

* Fri Aug 9 2013 Francis Lachapelle <flachapelle@inverse.ca> - 4.0.5-1
- New release 4.0.5

* Mon Aug 5 2013 Francis Lachapelle <flachapelle@inverse.ca> - 4.0.4-1
- New release 4.0.4

* Mon Jul 22 2013 Francis Lachapelle <flachapelle@inverse.ca> - 4.0.3-1
- New release 4.0.3

* Fri Jul 12 2013 Francis Lachapelle <flachapelle@inverse.ca> - 4.0.2-1
- New release 4.0.2

* Wed May 8 2013 Francis Lachapelle <flachapelle@inverse.ca> - 4.0.0-1
- New release 4.0.0

* Thu Jan 10 2013 Derek Wuelfrath <dwuelfrath@inverse.ca> - 3.6.1-1
- New release 3.6.1

* Mon Oct 29 2012 Francois Gaudreault <fgaudraeult@inverse.ca>
- Changing the location of ssl-certificate.conf
- Fixing file dupes

* Thu Oct 25 2012 Francois Gaudreault <fgaudreault@inverse.ca> - 3.6.0-1
- New release 3.6.0

* Fri Oct 19 2012 Francois Gaudreault <fgaudreault@inverse.ca>
- Disable SELinux in the post install section.

* Mon Oct 01 2012 Francois Gaudreault <fgaudreault@inverse.ca>
- Adding Net::Oauth2 as a required package.  Also adding the proper files.

* Mon Sep 17 2012 Olivier Bilodeau <obilodeau@inverse.ca>
- Made packetfence a a noarch subpackage of a new virtual packetfence-source
  so we can build -pfcmd-suid as arch-specific.

* Wed Sep 05 2012 Olivier Bilodeau <obilodeau@inverse.ca> - 3.5.1-1
- New release 3.5.1

* Fri Aug 24 2012 Olivier Bilodeau <obilodeau@inverse.ca>
- Added clean to avoid filling up build systems.. Sorry about that.

* Wed Aug 01 2012 Derek Wuelfrath <dwuelfrath@inverse.ca> - 3.5.0-1
- New release 3.5.0

* Thu Jul 12 2012 Francois Gaudreault <fgaudreault@inverse.ca>
- Adding some RADIUS deps

* Mon Jun 18 2012 Olivier Bilodeau <obilodeau@inverse.ca> - 3.4.1-1
- New release 3.4.1

* Wed Jun 13 2012 Olivier Bilodeau <obilodeau@inverse.ca> - 3.4.0-1
- New release 3.4.0

* Wed Apr 25 2012 Francois Gaudreault <fgaudreault@inverse.ca>
- Changing directory for raddb configuration

* Mon Apr 23 2012 Olivier Bilodeau <obilodeau@inverse.ca> - 3.3.2-1
- New release 3.3.2

* Tue Apr 17 2012 Francois Gaudreault <fgaudreault@inverse.ca>
- Dropped configuration package for FR.  We now have everything
in /usr/local/pf

* Mon Apr 16 2012 Olivier Bilodeau <obilodeau@inverse.ca> - 3.3.1-1
- New release 3.3.1

* Fri Apr 13 2012 Olivier Bilodeau <obilodeau@inverse.ca> - 3.3.0-2
- New release 3.3.0 (for real this time!)
- directories missing in tarball since git migration now created in install

* Thu Apr 12 2012 Olivier Bilodeau <obilodeau@inverse.ca> - 3.3.0-1
- New release 3.3.0

* Sun Mar 11 2012 Olivier Bilodeau <obilodeau@inverse.ca>
- Dependencies in recommended perl(A::B) notation instead of perl-A-B

* Thu Mar 08 2012 Olivier Bilodeau <obilodeau@inverse.ca>
- extracted version out of package (we are getting rid of versions in files 
  to simplify devel/stable branch management)
- source tarball changed: prefixed packetfence-<version>/ instead of pf/ 

* Wed Feb 22 2012 Olivier Bilodeau <obilodeau@inverse.ca> - 3.2.0-1
- New release 3.2.0

* Tue Feb 14 2012 Derek Wuelfrath <dwuelfrath@inverse.ca>
- Added perl(LWP::UserAgent) dependency for billing engine

* Wed Nov 23 2011 Olivier Bilodeau <obilodeau@inverse.ca> - 3.1.0-1
- New release 3.1.0

* Mon Nov 21 2011 Olivier Bilodeau <obilodeau@inverse.ca> - 3.0.3-1
- New release 3.0.3

* Wed Nov 16 2011 Derek Wuelfrath <dwuelfrath@inverse.ca>
- Create symlink for named.conf according to the BIND version (9.7)

* Thu Nov 03 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Adding SoH support in freeradius2 configuration pack

* Mon Oct 24 2011 Olivier Bilodeau <obilodeau@inverse.ca> - 3.0.2-1
- New release 3.0.2

* Mon Oct 03 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Won\'t create symlinks in sites-enabled if they already exists

* Fri Sep 23 2011 Ludovic Marcotte <lmarcotte@inverse.ca> - 3.0.1-1
- New release 3.0.1

* Wed Sep 21 2011 Olivier Bilodeau <obilodeau@inverse.ca> - 3.0.0-1
- New release 3.0.0

* Tue Sep 13 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Added dependendy on freeradius-mysql for our configuration
  package

* Mon Aug 15 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Added named, and dhcpd as dependencies

* Fri Aug 12 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Adding Accouting support into the freeradius2 configuration
  package

* Thu Aug 11 2011 Derek Wuelfrath <dwuelfrath@inverse.ca>
- Updated db schema

* Fri Aug 05 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Missing release.pm in the file list

* Tue Jul 26 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Adding certificate compilation for the freeradius2 config package

* Thu Jun 16 2011 Olivier Bilodeau <obilodeau@inverse.ca> - 2.2.1-1
- New release 2.2.1

* Sun May 15 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Added file freeradius-watchdog.sh

* Tue May 03 2011 Olivier Bilodeau <obilodeau@inverse.ca> - 2.2.0-2
- Package rebuilt to resolve issue #1212

* Tue May 03 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Fixed copy typo for the perl module backup file

* Tue May 03 2011 Olivier Bilodeau <obilodeau@inverse.ca> - 2.2.0-1
- New release 2.2.0

* Wed Apr 13 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Fixed problems in the install part for freeradius2 package

* Tue Apr 12 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Added support for perl module configuration in the packetfence-
  freeradius2 package

* Wed Mar 30 2011 Olivier Bilodeau <obilodeau@inverse.ca>
- Added perl(Authen::Krb5::Simple) as a dependency. Required by new Kerberos
  Captive Portal authentication module.

* Tue Mar 22 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Added dependency for perl-SOAP-Lite for the freeradius2 package

* Tue Mar 22 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Removed perl-Class-Inspector as a required package,
  dependency is now insured by perl-SOAP-Lite.

* Thu Mar 17 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Now installing logrotate script by default

* Thu Mar 17 2011 Francois Gaudreault <fgaudreault@inverse.ca>
- Added the packetfence-freeradius2 package definition

* Mon Mar 07 2011 Olivier Bilodeau <obilodeau@inverse.ca>
- Bumped version so that snapshots versions will be greater than latest
  released version
- Added German translation files

* Thu Mar 03 2011 Olivier Bilodeau <obilodeau@inverse.ca> - 2.1.0-0
- New release 2.1.0

* Mon Feb 28 2011 Olivier Bilodeau <obilodeau@inverse.ca>
- Added Brazilian Portugese translation files.

* Fri Feb 25 2011 Olivier Bilodeau <obilodeau@inverse.ca>
- Added perl(Class::Inspector) as a dependency. Upstream SOAP::Lite depend
  on it but current package doesn\'t provide it. See #1194.

* Fri Feb 18 2011 Olivier Bilodeau <obilodeau@inverse.ca>
- Added perl(JSON) as a dependency

* Fri Feb 11 2011 Olivier Bilodeau <obilodeau@inverse.ca>
- Explicitly remove fonts from package. For now.

* Thu Feb 03 2011 Olivier Bilodeau <obilodeau@inverse.ca>
- Explicitly remove docbook doc and images from package. For now.

* Fri Jan 28 2011 Olivier Bilodeau <obilodeau@inverse.ca>
- Configuration files in conf/templates/ are now in conf/. See #1166.

* Fri Jan 28 2011 Olivier Bilodeau <obilodeau@inverse.ca>
- More changes related to #1014. Some more conf -> var movement.

* Thu Jan 27 2011 Olivier Bilodeau <obilodeau@inverse.ca>
- New directories var/conf, var/dhcpd, var/named and var/run. See #1014.

* Wed Jan 26 2011 Olivier Bilodeau <obilodeau@inverse.ca> - 2.0.1-1
- New release 2.0.1

* Mon Dec 13 2010 Olivier Bilodeau <obilodeau@inverse.ca> - 2.0.0-1
- Version bump to 2.0.0
- File name changes

* Thu Nov 25 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Got rid of the test directory. Binaries are now in addons/.
- Renamed rlm_perl_packetfence to packetfence.pm in 802.1X 

* Mon Nov 22 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Minor changes to the addons/ directory layout that needed to be reflected
  here

* Tue Nov 16 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- New dependencies: perl-Text-CSV and perl-Text-CSV_XS used node importation

* Mon Nov 01 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Added new pf/lib/pf/web/* to package which should hold captive portal related
  submodules.

* Wed Oct 27 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Added new pf::web::custom module which is meant to be controlled by clients
  (so we don\'t overwrite it by default)

* Tue Oct 26 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- New dir and files for pf::services... submodules.
- Added addons/freeradius-integration/ files to package.

* Tue Sep 28 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Removed pf/cgi-bin/pdp.cgi from files manifest. It was removed from source
  tree.

* Fri Sep 24 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Added lib/pf/*.pl to the file list for new lib/pf/mod_perl_require.pl

* Wed Sep 22 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Version bump, doing 1.9.2 pre-release snapshots now
- Removing perl-LWP-UserAgent-Determined as a dependency of remote-snort-sensor.
  See #882;
  http://www.packetfence.org/bugs/view.php?id=882

* Wed Sep 22 2010 Olivier Bilodeau <obilodeau@inverse.ca> - 1.9.1-0
- New upstream release 1.9.1

* Tue Sep 21 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Added mod_perl as a dependency. Big captive portal performance gain. 
  Fixes #879;

* Wed Aug 25 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Added perl(Authen::Radius) as a dependency. Required by the optional radius
  authentication in the captive portal. Fixes #1047;

* Wed Aug 04 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Version bump, doing 1.9.1 pre-release snapshots now

* Tue Jul 27 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Added conf/admin.perm file to the files manifest

* Thu Jul 15 2010 Olivier Bilodeau <obilodeau@inverse.ca> - 1.9.0
- New upstream release 1.9.0

* Tue May 18 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Added missing file for Floating Network Device support: 
  floating_network_device.conf

* Fri May 07 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Added new files for Floating Network Device support
- Added perl(Test::NoWarnings) as a build-time dependency (used for tests)

* Thu May 06 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Fixed packaging of 802.1x rlm_perl_packetfence_* files and new radius files
- Removing the pinned perl(Parse::RecDescent) version. Fixes #833;
- Snapshot vs releases is now defined by an rpmbuild argument
- source_release should now be passed as an argument to simplify our nightly 
  build system. Fixes #946;
- Fixed a problem with addons/integration-testing files
- Perl required version is now 5.8.8 since a lot of our source files explictly
  ask for 5.8.8. Fixes #868;
- Added perl(Test::MockModule) as a build dependency (required for tests)
- Test modules are now required for building instead of required for package
  install. Fixes #866;

* Thu Apr 29 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Added mod_perl as a dependency

* Wed Apr 28 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- Added perl(Try::Tiny) and perl(Test::Exception) as a dependency used for 
  exception-handling and its testing
- Linking to new database schema

* Fri Apr 23 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- New addons/integration-testing folder with integration-testing scripts. More
  to come!
- Added perl(Readonly::XS) as a dependency. Readonly becomes faster with it. 

* Mon Apr 19 2010 Olivier Bilodeau <obilodeau@inverse.ca>
- packetfence-remote-snort-sensor back to life. Fixes #888;
  http://www.packetfence.org/mantis/view.php?id=888

* Tue Apr 06 2010 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.8-0.20100406
- Version bump to snapshot 20100406

* Tue Mar 16 2010 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.7-2
- Fix upgrade bug from 1.8.4: Changed perl-Locale-gettext dependency to use the
  perl namespace version perl(Locale-gettext). Fixes #931;
  http://www.packetfence.org/mantis/view.php?id=931

* Thu Mar 11 2010 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.8-0.20100311
- Version bump to snapshot 20100311

* Tue Jan 05 2010 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.7-1
- Version bump to 1.8.7

* Thu Dec 17 2009 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.6-3
- Added perl-SOAP-Lite as a dependency of remote-snort-sensor. Fixes #881;
  http://www.packetfence.org/mantis/view.php?id=881
- Added perl-LWP-UserAgent-Determined as a dependency of remote-snort-sensor.
  Fixes #882;
  http://www.packetfence.org/mantis/view.php?id=882

* Fri Dec 04 2009 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.6-2
- Fixed link to database schema
- Rebuilt packages

* Tue Dec 01 2009 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.6-1
- Version bump to 1.8.6
- Changed Source of the snapshot releases to packetfence.org

* Fri Nov 20 2009 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.6-0.20091120
- Version bump to snapshot 20091120
- Changed some default behavior for overwriting config files (for the better)

* Fri Oct 30 2009 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.5-2
- Modifications made to the dependencies to avoid installing Parse::RecDescent 
  that doesn't work with PacketFence

* Wed Oct 28 2009 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.5-1
- Version bump to 1.8.5

* Tue Oct 27 2009 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.5-0.20091027
- Added build instructions to avoid badly named release tarball
- Version bump to snapshot 20091027

* Mon Oct 26 2009 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.5-0.20091026
- Parse::RecDescent is a build dependency AND a runtime one. Fixes #806;
  http://packetfence.org/mantis/view.php?id=806
- Pulling php-pear-Log instead of php-pear. Fixes #804
  http://packetfence.org/mantis/view.php?id=804
- New dependency for SNMPv3 support with AES: perl-Crypt-Rijndael. Fixes #775;
  http://packetfence.org/mantis/view.php?id=775

* Fri Oct 23 2009 Olivier Bilodeau <obilodeau@inverse.ca> - 1.8.5-0.20091023
- Major improvements to the SPEC file. Starting changelog
