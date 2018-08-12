import config from './config';

const addAnalyticsTags = () =>
    config.google.trackingEnabled
        ? `<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-123804129-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-123804129-1');
	</script>`
        : '';

export default function renderFullPage(html, preloadedState) {
    return `<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=9; IE=edge">
			<title>MoncoeurdeVille.fr Martignas sur Jalle</title>
			<meta name="viewport" content="width=device-width">
			<meta name="mobile-web-app-capable" content="yes">
			<link href="/assets/styles.css" rel="stylesheet">
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
			<link href="https://fonts.googleapis.com/css?family=Source+Serif+Pro" rel="stylesheet">
			${addAnalyticsTags()}
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
