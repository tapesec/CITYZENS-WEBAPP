export default () => `<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=9; IE=edge">
			<title>Erreur 404</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="/assets/styles.css" rel="stylesheet">
            <style>
                div#root {
                    display:flex;
                    align-items: center;
                    align-self: center;
                    margin: auto;
                    width: 60%;
                    flex-flow: column;
                    justify-content: center;
                }
                h1 {
                    font-size: 28px;
                    margin-bottom: 20px;
                }
                p {
                    font-size: 18px;
                    margin-bottom: 10px;
                }

            </style>
		</head>
		<body>
            <div id="root">
                <h1>Cette page n'existe pas !</h1>
                <p>Nous avons cherché partout mais nous n'avons rien trouvé</p>
                <p>Même google ne trouverez pas la page que vous demandé alors imaginez nous ...<br>
                En même temps, ma femme dit que je ne vois pas plus loin que le bout de mon nez (soupir)...</p>
            </div>
		</body>
		</html>
	`;
