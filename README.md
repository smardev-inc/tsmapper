# TSMapper

TypeScript utility library to ease object mapping.
Websites, mobile applications and others developed using TypeScript more and more consist of similar but different object models. One will easily endup loading data from diferent sources, like databases and services, where the data in two models may be similar but having diferent structure. TSMapper mapping makes it easy to convert between different models, allowing them to remain segregated.

![License](https://img.shields.io/github/license/smardev-inc/tsmapper)
![Version](https://img.shields.io/github/package-json/v/smardev-inc/tsmapper)
![Build](https://img.shields.io/github/workflow/status/smardev-inc/tsmapper/Continuous%20Integration)
![Statements](https://img.shields.io/badge/Coverage-96.27%25-brightgreen.svg)
![Issues](https://img.shields.io/github/issues/smardev-inc/tsmapper)
![Issues](https://img.shields.io/github/commit-activity/w/smardev-inc/tsmapper)

## Installation

```bash
# NPM
npm install @smardev/tsmapper

# YARN
yarn add @smardev/tsmapper
```

## Using It

TSMapper provides automatic and configured object mapping.
Please note that in both cases, if the input object is an array, the return will be an array of mapped object instances

**Automatic mappig example**

This is the simplest way to map objects. For now mapping is done between properties/fields with the same name and with no type conversion, plan are to extend this allowing for more advanced ways of mapping properties/fields and supporting nested mapping and/or type conversion 

```ts
import { ObjectMapper } from '../index';

class Foo {
    public id = '';
    public name = '';
}

class Bar {
    private m_id = '';
    private m_name = '';
    
    public get id(): string {
        return this.m_id;
    }

    public set id(value: string) {
        this.m_id = value;
    }

    public get name(): string {
        return this.m_name;
    }

    public set name(value: string) {
        this.m_name = value;
    }

    public toSgtring(): string {
        return this.m_name;
    }
}

const f: Foo = new Foo();
f.id = 'This is the id';
f.name = 'This is the name';

const b: Bar = <Bar>ObjectMapper.autoMap<Foo, Bar>(f, () => new Bar());
```

**Custom mappig example**

By creating a mapping configuration one can handle the mapping process and control it to match requirements
```ts

const config = new ObjectMapConfigurationBuilder();
config.map('id').from('id');

// map name adding a prefix
config.map('name').from('name').custom((value: any) => 'PREFIX: ' + value); 

const f: Foo = new Foo();
f.id = 'This is the id';
f.name = 'This is the name';

const b: Bar = <Bar>ObjectMapper.map<Foo, Bar>(config.build(), f, () => new Bar());
        
```

## Contributing

We are open for contributions. If you're planning to contribute please make sure to read the contributing guide as it can save you from wasting your time: [CONTRIBUTING.md](/.github/CONTRIBUTING.md)

---
## Authors

* **Pedro Gomes** - *Initial work* - [pedromvgomes](https://github.com/pedromvgomes)

See also the list of [contributors](https://github.com/smardev-inc/tsmapper/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
