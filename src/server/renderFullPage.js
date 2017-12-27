export default function renderFullPage(html, preloadedState) {
    return `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>Page Title</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link href="/assets/styles.css" rel="stylesheet">
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
			<link
      rel="stylesheet"
      href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css">
		</head>
		<body>
			<div id="root">${html}</div>
			<script>
			window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
			</script>
			<script src="/assets/bundle.js"></script>
		</body>
		</html>
	`;
}
