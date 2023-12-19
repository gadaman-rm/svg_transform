export interface Pipe {
    <A>(a: A): A
    <A, B>(a: A, ab: (a: A) => B): B
    <A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
    <A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
    <A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E
    <A, B, C, D, E, F>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F
    ): F
    <A, B, C, D, E, F, G>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G
    ): G
    <A, B, C, D, E, F, G, H>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H
    ): H
    <A, B, C, D, E, F, G, H, I>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I
    ): I
    <A, B, C, D, E, F, G, H, I, J>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I,
        ij: (i: I) => J
    ): J
    <A, B, C, D, E, F, G, H, I, J, K>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I,
        ij: (i: I) => J,
        jk: (j: J) => K
    ): K
    <A, B, C, D, E, F, G, H, I, J, K, L>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I,
        ij: (i: I) => J,
        jk: (j: J) => K,
        kl: (k: K) => L
    ): L
    <A, B, C, D, E, F, G, H, I, J, K, L, M>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I,
        ij: (i: I) => J,
        jk: (j: J) => K,
        kl: (k: K) => L,
        lm: (l: L) => M
    ): M
    <A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I,
        ij: (i: I) => J,
        jk: (j: J) => K,
        kl: (k: K) => L,
        lm: (l: L) => M,
        mn: (m: M) => N
    ): N
    <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I,
        ij: (i: I) => J,
        jk: (j: J) => K,
        kl: (k: K) => L,
        lm: (l: L) => M,
        mn: (m: M) => N,
        no: (n: N) => O
    ): O
    <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I,
        ij: (i: I) => J,
        jk: (j: J) => K,
        kl: (k: K) => L,
        lm: (l: L) => M,
        mn: (m: M) => N,
        no: (n: N) => O,
        op: (o: O) => P
    ): P
    <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I,
        ij: (i: I) => J,
        jk: (j: J) => K,
        kl: (k: K) => L,
        lm: (l: L) => M,
        mn: (m: M) => N,
        no: (n: N) => O,
        op: (o: O) => P,
        pq: (p: P) => Q
    ): Q
    <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I,
        ij: (i: I) => J,
        jk: (j: J) => K,
        kl: (k: K) => L,
        lm: (l: L) => M,
        mn: (m: M) => N,
        no: (n: N) => O,
        op: (o: O) => P,
        pq: (p: P) => Q,
        qr: (q: Q) => R
    ): R
    <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I,
        ij: (i: I) => J,
        jk: (j: J) => K,
        kl: (k: K) => L,
        lm: (l: L) => M,
        mn: (m: M) => N,
        no: (n: N) => O,
        op: (o: O) => P,
        pq: (p: P) => Q,
        qr: (q: Q) => R,
        rs: (r: R) => S
    ): S
    <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
        a: A,
        ab: (a: A) => B,
        bc: (b: B) => C,
        cd: (c: C) => D,
        de: (d: D) => E,
        ef: (e: E) => F,
        fg: (f: F) => G,
        gh: (g: G) => H,
        hi: (h: H) => I,
        ij: (i: I) => J,
        jk: (j: J) => K,
        kl: (k: K) => L,
        lm: (l: L) => M,
        mn: (m: M) => N,
        no: (n: N) => O,
        op: (o: O) => P,
        pq: (p: P) => Q,
        qr: (q: Q) => R,
        rs: (r: R) => S,
        st: (s: S) => T
    ): T
}

export const pipe: Pipe = (value: any, ...fns: Function[]): unknown => {
    return fns.reduce((acc, fn) => fn(acc), value)
}