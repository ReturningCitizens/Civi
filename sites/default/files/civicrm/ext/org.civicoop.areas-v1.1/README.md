# areas

![Screenshot](/images/screenshot.png)
![Screenshot-dc](/images/screenshot-dc.png)
![Screenshot-contact-recod](/images/screenshot-contact-record.png)

The area extension provides a way to define geographical areas and automaticly link contacts to the area based on their primary address.

This extension is developed and sponsored by [Velt](http://velt.nu/). At velt they have local chapters, each chapter covers an area which might be a province, 
a local community, a local neighbourhood or a combination of both. For example the chapter Veluwe-South exists of the municipality Arnhem,  municipality Wageningen and the city Bennekom.
At velt each newsletter group and each event are marked  as interested for people living in a certain area. When those people login they will see the events and newsletter groups which are relevant for them based on the area they live in.

The extension is licensed under [AGPL-3.0](LICENSE.txt).

## Requirements

* PHP v5.4+
* CiviCRM (4.7+)

## Installation (Web UI)

Sysadmins and developers may download the `.zip` file for this extension, unzip and upload it to your extension folder on your civicrm server.
Then you can install this extension from the manage extensions screen. 

## Installation (CLI, Zip)

Sysadmins and developers may download the `.zip` file for this extension and
install it with the command-line tool [cv](https://github.com/civicrm/cv).

```bash
cd <extension-dir>
cv dl org.civicoop.areas@https://lab.civicrm.org/extensions/org.civicoop.areas/repository/master/archive.zip
```

## Installation (CLI, Git)

Sysadmins and developers may clone the [Git](https://en.wikipedia.org/wiki/Git) repo for this extension and
install it with the command-line tool [cv](https://github.com/civicrm/cv).

```bash
git clone https://lab.civicrm.org/extensions/org.civicoop.areas.git
cv en org.civicoop.areas
```

## Usage

You can manage the areas under the Administer --> Manage Areas.

### Scheduled job 

The extension ships with a scheduled job which is enabled by default and updates all areas at all contacts daily. 

## Developer docs / expanding the area definitions

Are you a developer and you want to define your own area definition (e.g. city, postal code, neighboorhood, gps etc...) you can do so in your own extension.
How you can do that is explained in the [developer docs](docs/developer.md)
