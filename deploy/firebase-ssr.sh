SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND=$SCRIPT_DIR/../frontend
FIREBASE=$SCRIPT_DIR/../node_modules/.bin/firebase

cd $FRONTEND && \
gcloud builds submit --tag gcr.io/paint-by-numbers-9292e/pbn-ssr && \
gcloud run deploy --image gcr.io/paint-by-numbers-9292e/pbn-ssr && \
$FIREBASE deploy --only hosting --config $FRONTEND/firebase-ssr.json --project paint-by-numbers-9292e &&\
cd $PWD
