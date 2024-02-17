---
layout: '@/templates/BasePost.astro'
title: Some Psql command
description: Postgre sql commands.
pubDate: 2022-05-08T00:00:00Z
imgSrc: 'https://images.unsplash.com/photo-1707343846292-56e4c6abf291?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
imgAlt: 'postgre sql'
---

Below are some useful postgre sql commands:

* Connect to a Database: “psql -d db_name -U user_name”.
* Check Postgres Version: “SELECT VERSION();”.
* List All Databases: “\l”.
* Access or Switch a Database: “\c db_name”.
* List All Tables: “\dt”.
* Describe All Tables: “\d”.
* Describe a Specific Table: “\d tab_name”.
* List All Schemas: “\dn”.
* List All Views: “\dv”.
* List All Functions: “\df”.
* List All Users: “\du”.
* Show Commands History: “\s”
* Save Query’s Results to a Specific File: “\o file_name”.
* Run psql Commands/queries From a Particular File: “\i file_name”.
* Execute Previous Command: “\g”.
* Show Query Execution Time: “\timing”.
* Get Output in HTML Format: “\H”.
* Align Columns Output: “\a”.
* Get Help: “\h”.
* Get All psql Commands: “\?”.
* Clear Screen: “\! cls”.
* Quit psql: “\q”.