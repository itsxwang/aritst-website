import  path from 'path';

export function getAbsolutePath() {
    return path.dirname(require.main.filename);
}