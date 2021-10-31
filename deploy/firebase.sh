SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND=$SCRIPT_DIR/../frontend
FIREBASE=$SCRIPT_DIR/../node_modules/.bin/firebase

cd $FRONTEND && \
npm run build && \
$FIREBASE deploy --only hosting --config $FRONTEND/firebase.json --project paint-by-numbers-9292e &&\
cd $PWD
