
const MANIFEST = {"/style/main.css":{"public_path":"/style/main.e3b0c4.css","etag":"e3b0c4429"},"/index.html":{"public_path":"/index.e3b0c4.html","etag":"e3b0c4429"}} ;

export default {

  files: MANIFEST,

  path(key) {
    const file = MANIFEST[key];

    if (typeof IS_DEV === 'boolean')
      return key;

    if (file)
      return MANIFEST[key]["public_path"];

    throw new Error(`File not found: ${key}`);
  },

};
