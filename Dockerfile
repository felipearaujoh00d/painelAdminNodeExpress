FROM ubuntu:16.04

WORKDIR /opt/plataforma/

##################################################
#  ----> Instala pacotes gerais
##################################################
RUN apt-get update && apt-get install -y \
        curl \
        wget \
        git-core \
        python-software-properties \
        software-properties-common \
        xvfb \
        wkhtmltopdf \
        unzip \
        locales \
        openssl \
        nano

#
#  ----> Instala PHP
#
RUN LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10


RUN apt-get update && apt-get install -y \
    php7.4

##################################################
#  ---> installa o composer
##################################################
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

##################################################
#  ---> installa o nodejs
##################################################
RUN cd /tmp && curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

COPY ./start-server.sh /opt/plataforma/