# Fake User Data Generator

Generate realistic fake user data for testing, demos, or sample datasets using **@faker-js/faker**.

## Features

* Generate full fake identities including:

  * Name & gender
  * Address & coordinates
  * Email (based on fake name)
  * Aliases / nicknames
  * Job title & company
  * Social handles
  * Credit card numbers (fake)
  * Timestamps: createdAt, lastLogin
* Easy command-line usage

## Installation

```bash
git clone https://github.com/adityadipakpatel/user-data-generator.git
cd user-data-generator
./init.sh
```

## Usage

```bash
# Run script with a number of users
./run.sh 10
```

* Replace `10` with any number of users you want to generate.
* Output is JSON printed to the console.

## Notes

* Requires Node.js ≥ 18
* `node_modules/` is ignored; `package-lock.json` ensures consistent installs
* Adjust locale, email domain, or other options in `generate-users.mjs`

## License

MIT License

