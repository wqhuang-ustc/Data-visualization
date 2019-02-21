#!/bin/bash
set -e

# check mysql status for debuging purpose
echo `service mysql status`

echo '1. start mysql....'
#start mysql
service mysql start
sleep 3
echo `service mysql status`

echo '2. execute grants.sql file....'

mysql < /mysql/grants.sql
echo 'add grants'

sleep 3
echo `service mysql status`


tail -f /dev/null
