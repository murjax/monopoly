module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        singleRun: true,
        files: [
            { pattern: 'dest/**/*.js', include: true }
        ],
        reporters: ['progress'],
        noResolve: false
    });
};
