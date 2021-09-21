docker rm --force stains_by && \
docker run -d --name stains_by -p 8080:80 stains_by
