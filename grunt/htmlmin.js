module.exports = {
	min: {
      files: [{
          expand: true,
          cwd: 'src/tpl/',
          src: ['*.html', '**/*.html'],
          dest: 'appstore/tpl/',
          ext: '.html',
          extDot: 'first'
      }]
  }
}