$(document).ready(function(){

	// inicio as variaveis
	
	var canvascontext = $('#canvas')[0].getContext("2d"); // contexto do canvas	
	var canvas_largura = $("#canvas").width(); // largura do canvas
	var canvas_altura = $("#canvas").height(); // altura do canvas
	var parte_largura = 10; // largura das partes do corpo da cobra
	var direcao; // direção inicial
	var parte; // parte do corpo da cobra
	var pontos; // contagem de pontos
	var vel // velocidade da cobra
	var cobra // variavel que armazenará a cobra

	// inicia o jogo
	function iniciar(){
		var direcao = 'direita' // direção inicial
		criarCobra();
		desenharCobra();
		criarParte();
		pontos = 0;
		
		// desenha a cobra conforme o tempo da variavel 'vel' passa		
		if(typeof game_loop != "undefined") clearInterval(game_loop);		
		game_loop = setInterval(desenharCobra, vel);
	}

	iniciar();

	// cria a cobra
	function criarCobra(){

		var tamanho = 5; // a cobra iniciará com 5 partes
		cobra = []; // declaro como array

		for(var i = 0; i < tamanho; i++){
			cobra.push({x: i, y:0});
		}
	}

	// desenha a cobra criada no canvas
	function desenharCobra(){
		canvascontext.fillStyle = "#ecf0f1";
		canvascontext.fillRect(0, 0, canvas_largura, canvas_altura);

		// pega posições da cobra
		var nx = cobra[0].x;
		var ny = cobra[0].y;

		if(direcao == "direita") nx++;
		else if(direcao == "esquerda") nx--;
		else if(direcao == "cima") ny--;
		else if(direcao == "baixo") ny++;

		// verifica quantos pedaços a cobra deve ter
		for(var i = 0; i < cobra.length; i++)
		{
			var c = cobra[i];
			//desenha as partes da cobra
			desenharParte(c.x, c.y, '#3498db');
		}
	}
	
	function criarParte(){
		parte = {
			x: Math.round(Math.random()*(canvas_largura-parte_largura)/parte_largura), 
			y: Math.round(Math.random()*(canvas_altura-parte_largura)/parte_largura), 
		};
	}

	// desenha a parte criada no canvas randomicamente
	function desenharParte(x, y, color){
		color = color ? color : '#e98b39';
		canvascontext.fillStyle = color;
		canvascontext.fillRect(x*parte_largura, y*parte_largura, parte_largura, parte_largura);
	}

	// verifica colisao da cobra com as partes avulsas, dela mesma e dos limites do canvas
	function detectarColisao(){

	}

	//Lets add the keyboard controls now
	$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" && direcao != "direita") direcao = "esquerda";
		else if(key == "38" && direcao != "baixo") direcao = "cima";
		else if(key == "39" && direcao != "esquerda") direcao = "direita";
		else if(key == "40" && direcao != "cima") direcao = "baixo";
		//The snake is now keyboard controllable
	});
console.log(cobra);
});