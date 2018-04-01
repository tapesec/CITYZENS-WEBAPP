export default message => `<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=9; IE=edge">
			<title>Erreur 500</title>
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
                <h1>Il y a de l'orage dans le Cloud !</h1>
                <p>Nous avons décodé les vibrations en provenance du stratocumulus, nos 
                meilleurs métérologistes sont sur le pont et travaillent activement
                à faire revenir le soleil.</p>
                <p>Pour les plus habiles d'entre vous, voici le message décodé : </p>
                <blockquote>Erreur 500 : ${message}</blockquote>
            </div>
			<script src="/assets/bundle.js"></script>
		</body>
		</html>
	`;
