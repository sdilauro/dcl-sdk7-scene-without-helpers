export function setUVs(rows: number, cols: number) {
    return [
        // North side of unrortated plane
        0, //lower-left corner
        0,

        cols, //lower-right corner
        0,

        cols, //upper-right corner
        rows,

        0, //upper left-corner
        rows,

        // South side of unrortated plane
        cols, // lower-right corner
        0,

        0, // lower-left corner
        0,

        0, // upper-left corner
        rows,

        cols, // upper-right corner
        rows,
    ]
}