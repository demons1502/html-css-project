FROM node:14.17.1-stretch

ARG USERID=1000
ARG GROUPID=1000

COPY frontend/*.sh /scripts/

RUN chmod a+x /scripts/*.sh

# Modify php-fpm user_id:group_id to current host_user_id:host_group_id
RUN usermod -u $USERID node
RUN groupmod -g $GROUPID node || exit 0

USER node
EXPOSE 3000

ENTRYPOINT [ "/scripts/entrypoint.sh" ]

CMD ["/scripts/command.sh"]
