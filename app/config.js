'use strict';

module.exports = {
    gatewayUrl: process.env.API_GATEWAY_URL || 'http://172.16.30.100:18000',
    client: {
        id: process.env.CLIENT_ID || 'swagger',
        secret: process.env.CLIENT_SECRET || 'swagger'
    },
    oauth2Client: {
        id: 'frontend',
        secret: 'frontend'
    },
    mailEnabled: process.env.MAIL_ENABLED || false,
    mailTemplate: {
    }
}
