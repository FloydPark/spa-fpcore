FROM httpd:alpine

COPY ./dist/spa-fpcore /usr/local/apache2/htdocs/

EXPOSE 80

# Enable envsubst
RUN apk add gettext

#RUN envsubst < /usr/local/apache2/htdocs/assets/env.template.js > /usr/local/apache2/htdocs/assets/env.js

# Enable the rewrite module in apache2.
RUN sed -i \
  's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g' \
  /usr/local/apache2/conf/httpd.conf

# Append to the published directory, that we want to rewrite any request that is not an actual file
# to the index.html page.
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/a### Rewrite rule was written from the Dockerfile when building the image ###\n\
    DirectoryIndex index.html\n\
    RewriteEngine on\n\
    RewriteCond %{REQUEST_FILENAME} -s [OR]\n\
    RewriteCond %{REQUEST_FILENAME} -d\n\
    RewriteRule ^.*$ - [NC,L]\n\
    RewriteRule ^(.*) index.html [NC,L]\n' \
  /usr/local/apache2/conf/httpd.conf

# Comment out the default config that handles requests to /.htaccess and /.ht* with a special error message,
# Angular will handle all routing
RUN sed -i '/<Files "\.ht\*">/,/<\/Files>/c# This was commented out from the Dockerfile\n# <Files ".ht*">\n#     Require all denied\n# <\/Files>' \
  /usr/local/apache2/conf/httpd.conf

CMD ["/bin/sh",  "-c",  "envsubst < /usr/local/apache2/htdocs/assets/env.template.js > /usr/local/apache2/htdocs/assets/env.js && httpd-foreground"]