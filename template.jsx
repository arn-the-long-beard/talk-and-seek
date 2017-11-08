export default ({ css, html, helmet, finalState }) => {
  // TODO Migrate the ccs here to the react part
  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
<head>
<style type="text/css">
${css}

body
{
    margin: 0%!important;
}
/*
body {
  margin: 0;
  font-size: 16px;
}
*/



</style>
${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}
</head>
<body ${helmet.bodyAttributes.toString()}>
<div id="root">${html}</div>

<script>      // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${finalState}</script>
  
<script src="/static/client.js" async></script>
</body>
</html>`
}
