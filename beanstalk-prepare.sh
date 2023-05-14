# if no version is passed, show usage
if [ -z "$1" ]; then
  echo "Usage: $0 <version> (e.g. v1.6)"
  exit 1
fi
zip_name="deployment-$1.zip"
zip -r ${zip_name} src package.json package-lock.json tsconfig.json ;
echo Next, upload ${zip_name} to Beanstalk and deploy it.
