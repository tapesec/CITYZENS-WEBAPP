export default function renderFullPage(html, preloadedState) {
    return `<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=9; IE=edge">
			<title>Cityzens Martignas sur Jalle</title>
			<meta name="viewport" content="width=device-width">
			<link href="/assets/styles.css" rel="stylesheet">
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
			<link href="https://fonts.googleapis.com/css?family=Source+Serif+Pro" rel="stylesheet">
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
