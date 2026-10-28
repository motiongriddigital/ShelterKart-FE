// Proof of work for bot protection: find a number that makes SHA-256(token + ":" + number) start with `bits` zero
// bits. Built in, so no third-party script loads and nothing about the visitor leaves the page.
const K = (() => {
  // First 32 bits of the fractional parts of the cube roots of the first 64 primes.
  const out = new Uint32Array(64);
  let found = 0;
  for (let n = 2; found < 64; n++) {
    if (Array.from({ length: n - 2 }, (_, i) => i + 2).some((d) => n % d === 0)) continue;
    out[found++] = Math.floor((Math.cbrt(n) % 1) * 2 ** 32);
  }
  return out;
})();

function sha256(str: string): Uint8Array {
  const n = str.length;
  const words = ((n + 9 + 63) >> 6) << 4;
  const w = new Uint32Array(words);
  const m = new Uint32Array(64);
  for (let i = 0; i < n; i++) w[i >> 2] |= (str.charCodeAt(i) & 0xff) << (24 - (i & 3) * 8);
  w[n >> 2] |= 0x80 << (24 - (n & 3) * 8);
  w[words - 1] = n * 8;
  const h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];
  const rotr = (x: number, k: number) => (x >>> k) | (x << (32 - k));
  for (let o = 0; o < words; o += 16) {
    for (let t = 0; t < 16; t++) m[t] = w[o + t];
    for (let t = 16; t < 64; t++) {
      const x = m[t - 15];
      const y = m[t - 2];
      m[t] =
        (m[t - 16] +
          (rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3)) +
          m[t - 7] +
          (rotr(y, 17) ^ rotr(y, 19) ^ (y >>> 10))) |
        0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for (let t = 0; t < 64; t++) {
      const t1 =
        (hh + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + ((e & f) ^ (~e & g)) + K[t] + m[t]) | 0;
      const t2 = ((rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      hh = g;
      g = f;
      f = e;
      e = (d + t1) | 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) | 0;
    }
    [a, b, c, d, e, f, g, hh].forEach((v, i) => (h[i] = (h[i] + v) | 0));
  }
  const out = new Uint8Array(32);
  h.forEach((v, i) => {
    out[i * 4] = v >>> 24;
    out[i * 4 + 1] = (v >>> 16) & 255;
    out[i * 4 + 2] = (v >>> 8) & 255;
    out[i * 4 + 3] = v & 255;
  });
  return out;
}

function zeroBits(bytes: Uint8Array): number {
  let n = 0;
  for (const b of bytes) {
    if (b === 0) {
      n += 8;
      continue;
    }
    n += Math.clz32(b) - 24;
    break;
  }
  return n;
}

/** Pauses every 4,096 tries so the page stays responsive. Returns null if no solution is found within the limit. */
export async function solveProofOfWork(
  token: string,
  bits: number,
  limit?: number,
): Promise<string | null> {
  const max = limit ?? Math.pow(2, Math.min(bits, 26)) * 32;
  for (let i = 0; i < max; i++) {
    const s = i.toString(36);
    if (zeroBits(sha256(`${token}:${s}`)) >= bits) return s;
    if (i % 4096 === 4095) await new Promise((r) => setTimeout(r, 0));
  }
  return null;
}
