# Radians transactions plugin
## Installation
1 Add the plugin to your relay node. 
```bash
cd ~/{core-bridgechain}/plugins && git clone https://github.com/e-m-s-y/radians-transactions-plugin.git
```
2 Open `~/.config/{ark-core}/{mainnet|devnet|testnet}/plugins.js` and add the plugin config above the `@arkecosystem/core-database-postgres` package.
```js
"@foly/radians-transactions-plugin": {
    enabled: true
}
```
3 Build the plugin.
```bash
cd ~/{core-bridgechain}
yarn setup
```
4 Restart your relay.

## Credits

- [e-m-s-y](https://github.com/e-m-s-y)

## License

[MIT](LICENSE)
