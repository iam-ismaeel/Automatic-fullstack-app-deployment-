# Stage 1: Build stage
FROM php:8.2-cli as builder

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy composer files first to leverage Docker cache
COPY composer.json composer.lock ./

# Install dependencies (optimized for production)
RUN composer install --no-dev --no-autoloader --no-scripts --prefer-dist

# Copy application files
COPY . .

# Generate optimized autoloader
RUN composer dump-autoload --optimize

# Stage 2: Production stage
FROM php:8.2-fpm-alpine

# Install production dependencies
RUN apk add --no-cache \
    libpng \
    libzip \
    oniguruma \
    freetype \
    libjpeg-turbo \
    freetype-dev \
    libjpeg-turbo-dev \
    zlib-dev \   
    libpng-dev \
    oniguruma-dev \
    libzip-dev  
    
# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Copy application files from builder stage
COPY --from=builder /var/www /var/www

# Set file permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Ensure necessary PHP-FPM directories exist
RUN mkdir -p /var/run/php && \
    chown www-data:www-data /var/run/php

# Configure PHP-FPM to listen on a Unix socket instead of TCP port
RUN { \
    echo '[www]'; \
    echo 'user = www-data'; \
    echo 'group = www-data'; \
    echo 'listen = /var/run/php/php-fpm.sock'; \
    echo 'listen.owner = www-data'; \
    echo 'listen.group = www-data'; \
    echo 'listen.mode = 0660'; \
    echo 'pm = dynamic'; \
    echo 'pm.max_children = 5'; \
    echo 'pm.start_servers = 2'; \
    echo 'pm.min_spare_servers = 1'; \
    echo 'pm.max_spare_servers = 3'; \
} > /usr/local/etc/php-fpm.d/zz-custom.conf

# Health check endpoint (for K8s liveness probes)
RUN echo 'ping.path = /ping' >> /usr/local/etc/php-fpm.d/zz-health.conf

# Start PHP-FPM server
CMD ["php-fpm","--nodaemonize"]
