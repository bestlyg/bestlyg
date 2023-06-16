pnpm --filter leetcode build
rm -rf ./packages/site/docs/leetcode
cp -rf ./packages/leetcode/dist ./packages/site/docs/leetcode
pnpm --filter site build
zip -vr ./packages/site/build/site.zip ./packages/site/build
scp -r ./packages/site/build/site.zip ubuntu@101.34.26.179:~/site.zip 
# sudo unzip -o -d /root/projects/bestlyg /home/ubuntu/site.zip