required_version="v14.19.0"

current_version=$(node -v)
echo "目前系统node 版本是$current_version, 需要依赖的node 版本$required_version"

if [ ${current_version} != ${required_version} ]; then
  n '14.19.0'

fi
npx vue-cli-service serve
