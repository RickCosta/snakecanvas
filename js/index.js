$(document).ready(function(){

	var ctx = $("#canvas")[0].getContext("2d");	
	var w = $("#canvas").width();
	var h = $("#canvas").height();		
	var cw = 10;
	var direcao;
	var parte;
	var score;
	var vel = 40 
	var snake;
	
	function iniciar()
	{
		direcao = "direita"; 
		criarSnake(); 
		criarParte(); 
		
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(desenhar, vel);
	}
	iniciar();
	
	function criarSnake()
	{
		var length = 5; 
		snake = []; 
		for(var i = length-1; i>=0; i--)
		{			
			snake.push({x: i, y:0});
		}
	}
	
	function criarParte()
	{
		parte = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
	}
	
	function desenhar()
	{
		ctx.fillStyle = "#ecf0f1";
		ctx.fillRect(0, 0, w, h);
		
		var nx = snake[0].x;
		var ny = snake[0].y;
		
		if(direcao == "direita"){ 
			nx++;

		}else if(direcao == "esquerda"){ 
			nx--;
		}else if(direcao == "cima"){ 
			ny--;
		}else if(direcao == "baixo"){ 
			ny++;
		}
		
		if (nx <= -1 && direcao == 'esquerda'){
			nx = w/cw;	
		}else if(nx == w/cw && direcao == 'direita' ){
			nx = (-1);			
		}else if(ny == h/cw && direcao == 'baixo'){
			ny = -1;
		}else if(ny == -1 && direcao == 'cima'){
			ny = h/cw;
		}else if(verificaColisao(nx, ny, snake)){
			iniciar();
			return;
		}

		if(nx == parte.x && ny == parte.y)
		{
			var ultimaparte = {x: nx, y: ny};
			criarParte();
		}
		else
		{
			var ultimaparte = snake.pop(); 
			ultimaparte.x = nx; ultimaparte.y = ny;
		}

		
		snake.unshift(ultimaparte); 
		
		for(var i = 0; i < snake.length; i++)
		{
			var c = snake[i];
			desenharParte(c.x, c.y, '#3498db');
		}

		desenharParte(parte.x, parte.y);
	}

	function desenharParte(x, y, color)
	{
		color = color ? color : '#e98b39';
		ctx.fillStyle = color;
		ctx.fillRect(x*cw, y*cw, cw, cw);
	}
	
	function verificaColisao(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
				return true;
		}
		return false;
	}
	
	$(document).keydown(function(e){
		var key = e.which;

		if(key == "37" && direcao != "direita") {
			direcao = "esquerda";
		}else if(key == "38" && direcao != "baixo") {
			direcao = "cima";
		}
		else if(key == "39" && direcao != "esquerda"){ 
			direcao = "direita";
		}
		else if(key == "40" && direcao != "cima") {
			direcao = "baixo";
		}
	});

});


