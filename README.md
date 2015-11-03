# grunt-galvanize
Run other grunt tasks multiple times with different options.

## Install

```
$ npm install --save-dev grunt-galvanize
```

## Why?
Using grunt with static configurations has its limits. Perhaps your build
process needs to read in a list of files from disk, then perform tasks
on those files. This is made difficult by the fact that `grunt.task.run` simply
queues a new task to be run. Thus the state of `grunt.config` may change between
the time that the task was queued and when it is run. Galvanize allows you to
define critical components of grunt.options and grunt.config, and ensure that
those components are in the desired state when a sub-task is run. In practice,
this enables calling `grunt.task.run` within a loop.

## Usage

#### Create galvanizeConfig:
The galvanizeConfig is an array of objects with a `configs` and an `options`
property. The `configs` and `options` will be used to set grunt config and
grunt options before running each iteration of a task.
```
   grunt.option('galvanizeConfig', [
       { configs: {color: 'red'}, options: {size: small} },
       { configs: {color: 'green'}, options: {size: small}
   ]);
```

#### Run galvanize:
Run the galvanize task, specifying the task that you would like galvanize to
iterate.
```
grunt.task.run(['galvanize:myTask']);
```
The above config will result in running `myTask` once with
`grunt.config.color = 'red'`, and once with `grunt.config.color = 'green'`.

#### Get fancy
For nested configs and options, use an array to specify the key and value:
```
    grunt.option('galvanizeConfig', [
        {
            configs: [
                { key: ['browserify', 'files'], value: '/mnt/foo/bar/**.js' },
                { key: ['browserify', 'dedup'], value: false }
            ]
        },
        {
            configs: [
                { key: ['browserify', 'files'], value: '/mnt/foo/baz/**.js' },
                { key: ['browserify', 'dedup'], value: true }
            ]
        }
    ]);

    grunt.task.run(['galvanize:browserify']);
```
The above config will run `browserify` once with `grunt.config.browserify.files`
set to _/mnt/foo/bar/**.js_, and once with `grunt.config.browserify.files` set
to _/mnt/foo/baz/**.js_.

The galvanizeConfig can be easily created programmatically within your build
process.

## In the wild:
Here's a snippet from our code base that takes advantage of Galvanize

```
/**
 * Run udb on each changelog in the master runlist
 * @param {string} db is the alias for the DB against which changelogs should be run.
 *   defaults to the db defined for the current branch in config.dbBranchMap.
 */
grunt.registerTask('execRunlist', '', function(db) {
    var runlistPath = config.get('masterRunlist');
    var runlist = grunt.file.readJSON(runlistPath);

    // verify that runlist is an array
    if (!_.isArray(runlist)) {
        throw new Error(
            'runlist is not an array: it is a ' + typeof runlist
        );
    }

    // map runlists to options object
    var galvanizeConfig = runlist.map(function(path) {
        return {options: {path: path}};
    });

    grunt.option('galvanizeConfig', galvanizeConfig);
    grunt.task.run([
        'galvanize:udb', //run udb for each path in galvanizeConfig
        'galvanize:dequeueFromRunlist' //remove each path in galvanizeConfig from runlist
    ]);
});
```

## Contributing
Please submit any changes to this repo (including additions and subtractions from the lint config files) as pull requests.
