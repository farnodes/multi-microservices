FROM php:8.1-fpm
WORKDIR /var/www/html
RUN apt-get update && apt-get install -y \
git \
libzip-dev \
unzip \
zip \
&& docker-php-ext-install pdo_mysql zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY composer.json composer.lock ./

COPY app app/
COPY bootstrap/ bootstrap/
COPY config/ config/
COPY database/ database/
COPY resources/ resources/
COPY routes/ routes/
COPY storage/ storage/
COPY public/ public/

COPY artisan ./
COPY webpack.mix.js ./
COPY server.php ./
COPY phpunit.xml ./

#COPY .env ./

RUN chown -R www-data:www-data storage bootstrap/cache
RUN composer update
RUN composer install
#RUN php artisan key:generate
#RUN php artisan migrate
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

