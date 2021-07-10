docker rm --force paint-by-numbers && \
docker run -d --name paint-by-numbers -p 8080:80 paint-by-numbers
