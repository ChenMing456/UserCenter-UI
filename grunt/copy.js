module.exports = {
    appstore: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts',         dest: "appstore/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts',      dest: "appstore/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/Simple-Line-Icons/fonts', dest: "appstore/fonts"},
            {expand: true, src: "**", cwd: 'src/fonts',   dest: "appstore/fonts"},
            {expand: true, src: "**", cwd: 'src/api',     dest: "appstore/api"},
            {expand: true, src: "**", cwd: 'src/l10n',    dest: "appstore/l10n"},
            {expand: true, src: "**", cwd: 'src/img',     dest: "appstore/img"},
            {expand: true, src: "**", cwd: 'src/js',      dest: "appstore/js"},
            {expand: true, src: "**", cwd: 'src/tpl',     dest: "appstore/tpl"},
            {expand: true, src: 'ui-grid.eot', cwd:'bower_components/angular-ui-grid/', dest : 'appstore/css/',flatten: true},
            {expand: true, src: 'ui-grid.svg', cwd:'bower_components/angular-ui-grid/', dest : 'appstore/css/'},
            {expand: true, src: 'ui-grid.ttf', cwd:'bower_components/angular-ui-grid/', dest : 'appstore/css/'},
            {expand: true, src: 'ui-grid.woff',cwd:'bower_components/angular-ui-grid/', dest : 'appstore/css/'},
            {expand: true, src: ['bower_components/**/*.js','bower_components/**/*.css'], dest:'appstore/'},
            {src: 'src/index.min.html', dest : 'appstore/index.html'}
        ]
    },
    html: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts',         dest: "html/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts',      dest: "html/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/Simple-Line-Icons/fonts', dest: "html/fonts"},
            {expand: true, src: '**', cwd:'src/fonts/', dest: 'html/fonts/'},
            {expand: true, src: "**", cwd: 'src/api',     dest: "html/api"},
            {expand: true, src: '**', cwd:'src/img/', dest: 'html/img/'},
            {expand: true, src: '*.css', cwd:'src/css/', dest: 'html/css/'},
            {expand: true, src: '**', cwd:'swig/js/', dest: 'html/js/'}
        ]
    },
    landing: {
        files: [
            {expand: true, src: "**", cwd: 'bower_components/bootstrap/fonts',         dest: "landing/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/font-awesome/fonts',      dest: "landing/fonts"},
            {expand: true, src: "**", cwd: 'bower_components/Simple-Line-Icons/fonts', dest: "landing/fonts"},
            {expand: true, src:'**', cwd:'src/fonts/', dest: 'landing/fonts/'},
            {expand: true, src:'*.css', cwd:'src/css/', dest: 'landing/css/'},
            {src:'html/css/app.min.css', dest: 'landing/css/app.min.css'}
        ]
    }

};
