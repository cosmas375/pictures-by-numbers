import { PALETTE_SIZE } from '@/libs/processImage/settings';
import getRandomSubarray from '@/libs/processImage/helpers/getRandomSubarray';
import { RGBtoHSV } from '../helpers/colorTransform';

// https://curiousily.com/posts/color-palette-extraction-with-k-means-clustering/
const MIN_DIFF = 3; // idk what to set it

export default function generatePalette(colors) {
  const result = fit(colors)
    .sort((a, b) => b.length - a.length)
    .map(cluster => cluster.center)
    .sort((a, b) => RGBtoHSV(a).h - RGBtoHSV(b).h);
  return result;
}

function fit(points) {
  const clusters = [];
  getRandomSubarray(points, PALETTE_SIZE).forEach(point => {
    clusters.push({
      center: point,
      points: [point]
    });
  });
  while (true) {
    const plists = assignPoints(clusters, points);
    let diff = 0;
    for (let i = 0; i < PALETTE_SIZE; i++) {
      if (!plists[i]) {
        continue;
      }
      const oldCluster = clusters[i];
      const center = calculateCenter(plists[i]);
      const newCluster = {
        center,
        points: plists[i]
      };
      clusters[i] = newCluster;
      diff = Math.max(diff, euclidean(oldCluster.center, newCluster.center));
    }
    if (diff < MIN_DIFF) {
      break;
    }
  }
  return clusters;
}

function assignPoints(clusters, points) {
  const plists = [];
  points.forEach(point => {
    let smallestDistance = Infinity;
    let idx = 0;
    for (let i = 0; i < PALETTE_SIZE; i++) {
      const distance = euclidean(point, clusters[i].center);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        idx = i;
      }
    }
    if (!plists[idx]) {
      plists[idx] = [];
    }
    plists[idx].push(point);
  });
  return plists;
}

function calculateCenter(points) {
  const vals = {
    r: 0,
    g: 0,
    b: 0
  };
  points.forEach(point => {
    vals.r += point.r;
    vals.g += point.g;
    vals.b += point.b;
  });
  const len = points.length;
  return {
    r: vals.r / len,
    g: vals.g / len,
    b: vals.b / len
  };
}

function euclidean(p, q) {
  return Math.sqrt((p.r - q.r) ** 2 + (p.g - q.g) ** 2 + (p.b - q.b) ** 2);
}
