FROM fluent/fluentd:debian-onbuild

USER root

WORKDIR /fluentd

ENV FLUENTD_CONF fluent.conf
ENV SUDO_FORCE_REMOVE yes

COPY fluent.conf /fluentd/etc

RUN buildDeps="sudo make gcc g++ libc-dev ruby-dev" \
 && apt-get update \
 && apt-get install -y --no-install-recommends $buildDeps \
 && mkdir -p /fluentd/plugins \
 && sudo useradd -m fluent \
 && sudo chmod -R 777 /var/lib/gems \
 && sudo -u fluent gem install \
    fluent-plugin-elasticsearch \
    fluent-plugin-record-reformer \
 && apt-get purge -y --auto-remove \
    -o APT::AutoRemove::RecommendsImportant=false \
    $buildDeps \
 && rm -rf /var/lib/apt/lists/* \
     /home/fluent/.gem/ruby/2.3.0/cache/*.gem