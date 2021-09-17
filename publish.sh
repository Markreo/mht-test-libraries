ng build mht-test-libraries --prod
cd projects/mht-test-libraries
npm run build
cd ../../dist/mht-test-libraries
npm version 0.0.14
npm publish
