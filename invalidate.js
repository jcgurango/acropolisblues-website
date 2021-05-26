require('dotenv').config();
const { CloudFront } = require('aws-sdk');
const cloudfront = new CloudFront();

console.log('Invalidating...');

cloudfront.createInvalidation({
  DistributionId: 'E2ZW4G5OIE944N',
  InvalidationBatch: {
    CallerReference: Math.random().toString().replace('.', ''),
    Paths: {
      Quantity: 1,
      Items: [
        '/*',
      ],
    },
  },
}, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Invalidation created.');
  }
});
