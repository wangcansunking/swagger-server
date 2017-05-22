# API 

## doc 

**baseUrl:** `/swaggers`

### add/update doc 

**description:** `we must provide title and version in title to preserve all apis in different versions`

**method:** `post`

**content type:** `application/json`

### get doc list

**method:** `get`

**content type:** `application/json`

### remove doc

**method:** `delete`

**content type:** `application/json`

## ui

**baseUrl**: `/ui`

**method:** `get`

**content type:** `text/html`

## test

**baseUrl**: `/test`

### get test result

**description:** `get the last test result`

**method:** `get`

**content type:** `application/json`

### start test

**description:** `start test`

**method:** `post`

**content type:** `application/json`

## mock

**description:** `support for mock and this is the root path of all the apis`

**baseUrl**: `/test/version(default is the latest)`