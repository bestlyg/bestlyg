pnpm --filter leetcode build
rm -rf ./packages/site/docs/leetcode
cp -rf ./packages/leetcode/dist ./packages/site/docs/leetcode
pnpm --filter site build
zip -vr ./packages/site/build/site.zip ./packages/site/build
scp -r ./packages/site/build/site.zip ubuntu@106.54.220.193:~/site.zip 
# sudo unzip -o -d /root/bestlyg /home/ubuntu/site.zip