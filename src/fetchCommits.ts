import fs from 'fs'

interface commit {
  author: {
    email: string;
    name: string;
    username: string;
  };
  committer: {
    email: string;
    name: string;
    username: string;
  };
  distinct: boolean;
  id: string;
  message: string;
  timestamp: string;
  // eslint-disable-next-line camelcase
  tree_id: string;
  url: string;
}

export interface commits {
  commits: Array<commit>;
}

/**
 * GitHub の event.json からコミット情報の JSON を取得してパースする
 *
 * @param {string} event.json へのパス
 * @returns {Promise}
 * - resolve {Object} パースされた commits オブジェクト
 * - reject {Error} 取得できない場合、想定しない JSON の場合
 * - reject {string} コミットが1件もない場合
 */

const fetchCommits = (path: string): Promise<commits> =>
  readFile(path)
    .then((json) => {
      console.log(json)
      return JSON.parse(json)
    })
    .then((data) => {
      if (!data?.commits) {
        return Promise.reject('コミットが1件もありません。')
      }
      return Promise.resolve(data)
    })

/**
 * ファイルを読み込む
 *
 * @param path パス
 * @returns {Promise}
 * - resolve {string} ファイルの内容
 * - reject {Error} I/O エラー
 */

const readFile = (path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    console.log("### readFile ###")
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })

export default fetchCommits
