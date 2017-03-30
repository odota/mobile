// NODE_ENV is automatically set by RN packager based on the IDE/simulator environment
// for iOS, use DEBUG scheme/config to enable RN Dev Menu/Debug in Chrome; use &dev=true to set NODE_ENV to development
// for Android, select JS Dev Mode within RN Dev Menu to set NODE_ENV to development
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod')
} else {
    module.exports = require('./configureStore.dev');
    console.log("process.env.NODE_ENV = " + process.env.NODE_ENV)
}
