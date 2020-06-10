
environments {
	development {
		serverURL = 'http://localhost:8080'
		grails {
			mongodb {
				databaseName = 'quexl_dev'
				host = 'localhost'
				port = 27017
				stateless = false // whether to use stateless sessions by default

				options {
					connectionsPerHost = 10 // The maximum number of connections allowed per host
					threadsAllowedToBlockForConnectionMultiplier = 5
					maxWaitTime = 120000 // Max wait time of a blocking thread for a connection.
					connectTimeout = 0 // The connect timeout in milliseconds. 0 == infinite
					socketTimeout = 0 // The socket timeout. 0 == infinite
					socketKeepAlive = false // Whether or not to have socket keep alive turned on
					sslEnabled = false // Specifies if the driver should use an SSL connection to Mongo
				}
			}
		}
	}
	uat {
		serverURL = ''
		grails {
			mongodb {
				databaseName = 'quexl_uat'
				host = 'localhost'
				port = 27017
				options {
					connectionsPerHost = 10 // The maximum number of connections allowed per host
					threadsAllowedToBlockForConnectionMultiplier = 5
					maxWaitTime = 120000 // Max wait time of a blocking thread for a connection.
					connectTimeout = 0 // The connect timeout in milliseconds. 0 == infinite
					socketTimeout = 0 // The socket timeout. 0 == infinite
					socketKeepAlive = false // Whether or not to have socket keep alive turned on
					sslEnabled = false // Specifies if the driver should use an SSL connection to Mongo
				}
			}
		}
	}
	production {
		serverURL = 'https://quexl.com'
		grails {
			mongodb {
				databaseName = 'quexl_prod'
				host = 'localhost'
				port = 27017
				options {
					connectionsPerHost = 10 // The maximum number of connections allowed per host
					threadsAllowedToBlockForConnectionMultiplier = 5
					maxWaitTime = 120000 // Max wait time of a blocking thread for a connection.
					connectTimeout = 0 // The connect timeout in milliseconds. 0 == infinite
					socketTimeout = 0 // The socket timeout. 0 == infinite
					socketKeepAlive = false // Whether or not to have socket keep alive turned on
					sslEnabled = false // Specifies if the driver should use an SSL connection to Mongo
				}
			}
		}
	}
}
//grails.plugin.springsecurity.active = false

grails.plugin.springsecurity.rest.token.storage.useJwt=true
grails.plugin.springsecurity.rest.token.storage.jwt.useSignedJwt=true
grails.plugin.springsecurity.rest.token.storage.jwt.secret='quexl123456@#$%^%$#$#@dfgdfgquexl123456@#$%^%$#$#@dfgdfgquexl123456@#$%^%$#$#@dfgdfgquexl123456@#$%^%$#$#@dfgdfgquexl123456@#$%^%$#$#@dfgdfgquexl123456@#$%^%$#$#@dfgdfg'
grails.plugin.springsecurity.rest.token.storage.jwt.expiration=900
grails.plugin.springsecurity.rest.token.storage.jwt.refreshExpiration=3600

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'com.quexl.security.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'com.quexl.security.UserRole'
grails.plugin.springsecurity.authority.className = 'com.quexl.security.Role'

//grails.plugin.springsecurity.useSecurityEventListener = true
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	[pattern: '/',               access: ['permitAll']],
	[pattern: '/error',          access: ['permitAll']],
	[pattern: '/index',          access: ['permitAll']],
	[pattern: '/index.gsp',      access: ['permitAll']],
	[pattern: '/shutdown',       access: ['permitAll']],
	[pattern: '/assets/**',      access: ['permitAll']],
	[pattern: '/**/js/**',       access: ['permitAll']],
	[pattern: '/**/css/**',      access: ['permitAll']],
	[pattern: '/**/images/**',   access: ['permitAll']],
	[pattern: '/**/favicon.ico', access: ['permitAll']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
	[pattern: '/assets/**',      filters: 'none'],
	[pattern: '/**/js/**',       filters: 'none'],
	[pattern: '/**/css/**',      filters: 'none'],
	[pattern: '/**/images/**',   filters: 'none'],
	[pattern: '/**/favicon.ico', filters: 'none'],
	[pattern: '/**',             filters: 'JOINED_FILTERS'],
	[pattern: '/api/**', filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'], // Stateless chain
	[pattern: '/**', filters: 'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter']   // Traditional chain
]

//login
grails.plugin.springsecurity.rest.login.active=true
grails.plugin.springsecurity.rest.login.useJsonCredentials = true
grails.plugin.springsecurity.rest.login.failureStatusCode = 401
grails.plugin.springsecurity.rest.login.usernamePropertyName = 'username'
grails.plugin.springsecurity.rest.login.passwordPropertyName='password'
grails.plugin.springsecurity.rest.login.endpointUrl='/api/login'
grails.plugin.springsecurity.rest.login.useRequestParamsCredentials = false

//logout
grails.plugin.springsecurity.rest.logout.endpointUrl='/api/logout'

//token generation
grails.plugin.springsecurity.rest.token.generation.useUUID=true
grails.plugin.springsecurity.rest.token.generation.useSecureRandom=true

//token rendering
grails.plugin.springsecurity.rest.token.rendering.usernamePropertyName='username'
grails.plugin.springsecurity.rest.token.rendering.authoritiesPropertyName='roles'
grails.plugin.springsecurity.rest.token.rendering.tokenPropertyName='token'

//token validate
grails.plugin.springsecurity.rest.token.validation.useBearerToken = true
grails.plugin.springsecurity.rest.token.validation.active=true
grails.plugin.springsecurity.rest.token.validation.endpointUrl='/api/validate'


grails.plugin.springsecurity.errors.login.locked = "Your account is locked. Please! contact in administrator."
grails.plugin.springsecurity.errors.login.fail = "Fail to login"
grails.plugin.springsecurity.errors.login.disabled = "Your account is disabled."
grails.plugin.springsecurity.errors.login.expired = "Your account is expired."
grails.plugin.springsecurity.errors.login.passwordExpired = "Your password is expired."