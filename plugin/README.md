# WPUP Rest Plugin

Wordpress Plugin to upload themes via REST API

Used by [WPUP](https://github.com/danielr1996/wpup)

## Usage
Unfortunatelly this plugins cannot be downloaded from the official wordpress plugin repository
because it violates the [Wordpress Developer Guidlines](https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/#8-plugins-may-not-send-executable-code-via-third-party-systems)
> Serving updates or otherwise installing plugins, themes, or add-ons from servers other than WordPress.org’s

Therefore you must build it yourself:

Build with `gulp build` and upload as wordpress plugin

> Note: You must be authenticated and the authenticated user must have the capabilities `install_theme` or `switch_themes` 
> respectively. How you authenticate against the REST API is up to you. Wordpress supports only Cookie Authentication 
> per default, to use Application Passwords/Tokens install the [Application Passwords Plugin](https://de.wordpress.org/plugins/application-passwords/).

### Upload Theme
```shell script
curl \
--request POST 'http://localhost:9999/wp-json/wpup/v1/upload/' \ # add ?activate to activate after upload 
--form 'theme=@theme.zip'
```

### Activate Theme
```shell script
curl \
--request POST 'http://localhost:9999/wp-json/wpup/v1/activate/<theme-name>'
```

## Known Issues
* Update Version number on build
