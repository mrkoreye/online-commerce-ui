/* eslint-disable */
// Gulp tasks invovled in uploading the project to s3
var gulp = require('gulp');
var s3 = require('gulp-s3-upload')({});

gulp.task('upload:s3', function() {
  return gulp.src('dist/**')
    .pipe(s3({
      Bucket: 'commerce-ui.korey.io',
      ACL: 'public-read'
    }));
});
