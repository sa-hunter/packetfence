include config.mk
DOCBOOK_XSL := /usr/share/xml/docbook/stylesheet/docbook-xsl
UNAME := $(shell uname -s)
ifeq ($(UNAME),Darwin)
	DOCBOOK_XSL := /opt/local/share/xsl/docbook-xsl
else ifneq ("$(wildcard /etc/redhat-release)","")
	DOCBOOK_XSL := /usr/share/sgml/docbook/xsl-stylesheets
endif

all:
	@echo "Please chose which documentation to build:"
	@echo ""
	@echo " 'pdf' will build all guides using the PDF format"
	@echo " 'docs/PacketFence_Installation_Guide.pdf' will build the Installation guide in PDF"
	@echo " 'docs/PacketFence_Clustering_Guide.pdf' will build the Clustering guide in PDF"
	@echo " 'docs/PacketFence_Developers_Guide.pdf' will build the Developers guide in PDF"
	@echo " 'docs/PacketFence_Network_Devices_Configuration_Guide.pdf' will build the Network Devices Configuration guide in PDF"
	@echo " 'docs/PacketFence_Upgrade_Guide.pdf' will build the Upgrade guide in PDF"

DOCINFO_XMLS := $(notdir $(wildcard docs/PacketFence_*-docinfo.xml))
ASCIIDOCS := $(patsubst %-docinfo.xml, %.asciidoc, $(DOCINFO_XMLS))
PDFS = $(patsubst %.asciidoc,docs/%.pdf, $(ASCIIDOCS))

docs/docbook/xsl/titlepage-fo.xsl: docs/docbook/xsl/titlepage-fo.xml
	xsltproc \
		-o docs/docbook/xsl/titlepage-fo.xsl \
		$(DOCBOOK_XSL)/template/titlepage.xsl \
		docs/docbook/xsl/titlepage-fo.xml

docs/docbook/xsl/import-fo.xsl:
	@echo "<?xml version='1.0'?> \
	<xsl:stylesheet   \
	  xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" \
	  xmlns:fo=\"http://www.w3.org/1999/XSL/Format\" \
	  version=\"1.0\"> \
	  <xsl:import href=\"${DOCBOOK_XSL}/fo/docbook.xsl\"/> \
	</xsl:stylesheet>" \
	> docs/docbook/xsl/import-fo.xsl

docs/docbook/%.docbook: docs/%.asciidoc
	asciidoc \
		-a docinfo2 \
		-b docbook \
		-d book \
		-f docs/docbook/docbook45.conf \
		-o $@ $<

docs/%.fo: docs/docbook/%.docbook docs/docbook/xsl/titlepage-fo.xsl docs/docbook/xsl/import-fo.xsl
	xsltproc \
		-o $@ \
		docs/docbook/xsl/packetfence-fo.xsl \
		$<

docs/%.pdf: docs/%.fo
	fop \
		-c docs/fonts/fop-config.xml \
		$< -pdf $@

.PHONY: pdf

pdf: $(PDFS)

HTML = $(patsubst %.asciidoc,docs/html/%.html, $(ASCIIDOCS))

docs/html/%.html: docs/%.asciidoc
	asciidoctor \
		-D docs/html \
		-n \
		-r ./docs/html/asciidoctor-html.rb \
		-a imagesdir=../images \
		-a stylesdir=../html/pfappserver/root/static.alt/dist/css \
		-a stylesheet=$(notdir $(wildcard ./html/pfappserver/root/static.alt/dist/css/app*.css)) \
		$<

html/pfappserver/root/static/doc:
	make html
	mkdir html/pfappserver/root/static/doc
	mkdir html/pfappserver/root/static/images
	cp -a docs/html/* html/pfappserver/root/static/doc
	cp -a docs/images/* html/pfappserver/root/static/images

docs/html/index.js: $(HTML)
	find $$(dirname "$@") -type f  -iname  '*.html' -and -not -iname '*template*' -printf "{\"name\":\"%f\", \"size\":%s, \"last_modifed\" : %T@}\n" | jq -s '{ items: [ .[] |  {name, size, last_modifed : (.last_modifed*1000 | floor)} ] }' > $@

.PHONY: images

images:
	@echo "install images dir and all subdirectories"
	for subdir in `find docs/images/* -type d -printf "%f\n"` ; do \
		install -d -m0755 $(DESTDIR)/usr/local/pf/html/pfappserver/root/static/images/$$subdir ; \
		for img in `find docs/images/$$subdir -type f`; do \
			install -m0644 $$img $(DESTDIR)/usr/local/pf/html/pfappserver/root/static/images/$$subdir ; \
		done \
	done
	@echo "install only images at depth0 in images/ directory"
	for img in `find docs/images/* -maxdepth 0 -type f`; do \
		install -m0644 $$img $(DESTDIR)/usr/local/pf/html/pfappserver/root/static/images/ ; \
	done

.PHONY: html

html: $(HTML) docs/html/index.js

pfcmd.help:
	/usr/local/pf/bin/pfcmd help > docs/pfcmd.help

.PHONY: configurations

configurations: SHELL:=/bin/bash
configurations:
	find -type f -name '*.example' -print0 | while read -d $$'\0' file; do cp -n $$file "$$(dirname $$file)/$$(basename $$file .example)"; done
	touch /usr/local/pf/conf/pf.conf

.PHONY: configurations_force

configurations_hard: SHELL:=/bin/bash
configurations_hard:
	find -type f -name '*.example' -print0 | while read -d $$'\0' file; do cp $$file "$$(dirname $$file)/$$(basename $$file .example)"; done
	touch /usr/local/pf/conf/pf.conf

# server certs and keys
# the | in the prerequisites ensure the target is not created if it already exists
# see https://www.gnu.org/software/make/manual/make.html#Prerequisite-Types
conf/ssl/server.pem: | conf/ssl/server.key conf/ssl/server.crt conf/ssl/server.pem 
	cat conf/ssl/server.crt conf/ssl/server.key > conf/ssl/server.pem

conf/ssl/server.crt: | conf/ssl/server.crt
	openssl req -new -x509 -days 365 \
	-out /usr/local/pf/conf/ssl/server.crt \
	-key /usr/local/pf/conf/ssl/server.key \
	-config /usr/local/pf/conf/openssl.cnf

conf/ssl/server.key: | conf/ssl/server.key
	openssl genrsa -out /usr/local/pf/conf/ssl/server.key 2048

conf/local_secret:
	date +%s | sha256sum | base64 | head -c 32 > /usr/local/pf/conf/local_secret

conf/unified_api_system_pass:
	date +%s | sha256sum | base64 | head -c 32 > /usr/local/pf/conf/unified_api_system_pass

conf/currently-at: conf/pf-release
	cat conf/pf-release > conf/currently-at

bin/pfcmd: src/pfcmd.c
	$(CC) -O2 -g -std=c99  -Wall $< -o $@

bin/ntlm_auth_wrapper: src/ntlm_auth_wrap.c
	$(CC) -g -std=c99 -Wall $< -o $@

.PHONY: permissions

/etc/sudoers.d/packetfence.sudoers: packetfence.sudoers
	cp packetfence.sudoers /etc/sudoers.d/packetfence

.PHONY: sudo

sudo: /etc/sudoers.d/packetfence.sudoers


permissions: bin/pfcmd
	./bin/pfcmd fixpermissions

raddb/certs/server.crt:
	cd raddb/certs; make

.PHONY: raddb-sites-enabled

raddb/sites-enabled:
	mkdir raddb/sites-enabled
	cd raddb/sites-enabled;\
	for f in packetfence packetfence-tunnel dynamic-clients status;\
		do ln -s ../sites-available/$$f $$f;\
	done

.PHONY: translation

translation:
	for TRANSLATION in de en es fr he_IL it nl pl_PL pt_BR; do\
		/usr/bin/msgfmt conf/locale/$$TRANSLATION/LC_MESSAGES/packetfence.po\
		  --output-file conf/locale/$$TRANSLATION/LC_MESSAGES/packetfence.mo;\
	done

.PHONY: mysql-schema

mysql-schema:
	ln -f -s /usr/local/pf/db/pf-schema-X.Y.Z.sql /usr/local/pf/db/pf-schema.sql;

.PHONY: chown_pf

chown_pf:
	chown -R pf:pf *

.PHONY: fingerbank

fingerbank:
	rm -f /usr/local/pf/lib/fingerbank
	ln -s /usr/local/fingerbank/lib/fingerbank /usr/local/pf/lib/fingerbank \

.PHONY: systemd

systemd:
	cp /usr/local/pf/conf/systemd/packetfence* /usr/lib/systemd/system/
	systemctl daemon-reload

.PHONY: pf-dal

pf-dal:
	perl /usr/local/pf/addons/dev-helpers/bin/generator-data-access-layer.pl

devel: configurations conf/ssl/server.key conf/ssl/server.crt conf/local_secret bin/pfcmd raddb/certs/server.crt sudo translation mysql-schema raddb/sites-enabled fingerbank chown_pf permissions bin/ntlm_auth_wrapper conf/unified_api_system_pass

test:
	cd t && ./smoke.t

update_samsung_dns_filter:
	bash /usr/local/pf/addons/update-samsung-dns-filter.sh

.PHONY: html_install

# install -D will automatically create target directories
# $$file in destination of install command contain relative path
html_install:
	@echo "create directories under $(DESTDIR)$(HTMLDIR)"
	install -d -m0755 $(DESTDIR)$(HTML_PARKINGDIR)
	install -d -m0755 $(DESTDIR)$(HTML_COMMONDIR)
	install -d -m0755 $(DESTDIR)$(HTML_CPDIR)
	install -d -m0755 $(DESTDIR)$(HTML_PFAPPDIR)

	@echo "install $(SRC_HTML_PARKINGDIR) files"
	for file in $(parking_files); do \
            install -v -m 0644 $$file -D $(DESTDIR)$(PF_PREFIX)/$$file ; \
	done

	@echo "install $(SRC_HTML_COMMONDIR) dirs and files"
	for file in $(common_files); do \
	    install -v -m 0644 $$file -D $(DESTDIR)$(PF_PREFIX)/$$file ; \
	done

	@echo "install $(SRC_HTML_CPDIR) dirs and files"
	for file in $(cp_files); do \
	    install -v -m 0644 $$file -D $(DESTDIR)$(PF_PREFIX)/$$file ; \
	done

	@echo "install $(SRC_HTML_PFAPPDIR) without static and static.alt dir"
	for file in $(pfapp_files); do \
	    install -v -m 0644 $$file -D $(DESTDIR)$(PF_PREFIX)/$$file ; \
	done

	@echo "install $(SRC_HTML_PFAPPDIR_STATIC) dirs and files"
	for file in $(pfapp_static_files); do \
	    install -v -m 0644 $$file -D $(DESTDIR)$(PF_PREFIX)/$$file ; \
	done

	@echo "install $(SRC_HTML_PFAPPDIR_ALT) dirs and files"
	for file in $(pfapp_alt_files); do \
	    install -v -m 0644 $$file -D $(DESTDIR)$(PF_PREFIX)/$$file ; \
	done

	@echo "install symlinks"
	for link in $(symlink_files); do \
	    cp -v --no-dereference $$link $(DESTDIR)$(PF_PREFIX)/$$link ; \
	done

.PHONY: conf/git_commit_id
conf/git_commit_id:
	echo $$CI_COMMIT_SHA > $@

