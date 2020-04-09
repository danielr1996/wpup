# WPUP (Wordpress Uploader)
Install Wordpress Themes with CLI

## Usage
Run `wpup --help` to see usage instructions.

## Configuration
`wpup` has three layers of configuration which are merged and applied in the following order:
`wpup.config.yaml` > `wpup.local.yaml` > `Command Line args`.

A configuration file has the following syntax (case sensitive):

All values are optional and can be overwritten with command line args later

```yaml
envs:
    env1: # Arbitraty name of environment, used to select the environment
      url: "http://env1.example.com" # Base URL of the wordpress installation
      ignoressl: true # Ignore self signed certificates when uploading theme, default=false
      theme: theme.zip # Path to the theme that should be uploaded
      activate: true # Active theme after installation, default=false
    env2:
      url: "http://env2.example.com:8080"
      ignoressl: false
      theme: dist\theme.zip
      activate: false
current: env2 # Select the current environment that should be used when none is specified
```
### wpup.config.yaml
`wpup.config.yaml` is used to store global configuration for the wordpress project and is meant to be check in with version control.

**Example:**
```yaml
envs:
    dev:
        url: "https://dev.example.com"
        ignoressl: true
    test:
        url: "https://test.example.com"
        ignoressl: true
    prod:
        url: "https://prod.example.com"
```
 
### wpup.local.yaml
`wpup.local.yaml` is used to store local configuration that is specific to your setup and is meant to be excluded from version control.

**Example:**
```yaml
envs:
  local:
    url: "http://localhost:9999"
current: local
```

## Planned Features / Known issues
* make config files optional
* switch contexts with command line
* login with command line
* rename current to context
* global current/theme should be overwritten by cli
* Read password / token from stdin
* Error Handling when theme file cannot be found
* Update Version number on build