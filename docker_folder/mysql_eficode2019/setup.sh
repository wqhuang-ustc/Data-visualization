#!/bin/bash
set -e

echo '1. start mysql....'
#start mysql
service mysql start
#systemctl start mysql
sleep 3

echo '2. execute grants.sql file....'

mysql < /mysql/grants.sql
echo 'add grants'

sleep 3

tail -f /dev/null
