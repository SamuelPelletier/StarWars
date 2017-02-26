var listPerso= [1,2,3,4,5,10,11,13,14,20,21,22,25,32,40,44]
var listPerso= [1,2,3,4,5,10,11,13,14,20,21,22,25,32,40,44]
var timeInterval;
var gameBegin = false;
var herosId;
var adversaireId;

$(document).ready(function(){
	music();
	init();
	$(document).click(function(e){
		if(!$(e.target).hasClass('Keep')){
			$(".swapiElement").remove();
		}
	});

	$("img").click(function(){
			$(".swapiElement").remove();
			var url = "http://swapi.co/api/people/"+this.id;
			navigate(url, this);
	});
	
	

});

function music(){
	myAudio = new Audio('video/theme.mp3'); 
	myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();
}

function init(){
	var compteur = 8;
	var compteurDiv = 0;
	for(perso in listPerso) {
		if(compteur == 8){
			compteurDiv++;
			var divPerso = $("<div id='divNum"+compteurDiv+"'/>")
			divPerso.addClass("perso");
			$("section").append(divPerso);
			compteur = 0;
		}
	var src = "./Personnage/"+listPerso[perso]+".png";
	$("#divNum"+compteurDiv).append("<img class='Keep' id="+listPerso[perso]+" src="+src+" />");
	compteur++;
	}
}

function navigate(url, img){
    $.get(url,{ }, function(data){
        var ul = $("<ul class='Keep'></ul>");
		ul.insertAfter(img);
        ul.addClass("swapiElement");
        for(field in data){
            var li = $("<li class='Keep' ></li>");
			var response = elementForValue(field, data[field]);
			if(response != false){
                li.append(response);
				ul.append(li);
			}
        }
		addPlanet(data['homeworld']);
		});


}

function elementForValue(name, value){
	var span = $("<span class='Keep'></span>");
	switch(name) {
    case 'name':
        span.append(value);
		span.addClass('name');
		return span;
        break;
    case 'height':
        name = 'Taille';
		value += ' cm';
        break;
	case 'mass':
        name = 'Poids';
		value += ' Kg';
        break;
	case 'hair_color':
        name = 'Couleur de cheveux';
        break;
	case 'skin_color':
        name = 'Couleur de la peau';
        break;
	case 'eye_color':
        name = 'Couleur des yeux';
        break;
	case 'birth_year':
        name = 'Date de naissance';
        break;
	case 'gender':
        name = 'Genre';
        break;
	default:
		name = false;
	
}
	if(name){
		span.append(name+" : "+value);
		return span;
	}
	return false;

}


function addPlanet(url){
	$('#planet').remove();
	$('.choisirButton').remove();
	$.getJSON(url,{ }, function(data){
			name = 'Planéte de naissance';
			value = data['name'];
			$(".swapiElement").append("<li id='planet' class='Keep'><span class='Keep'>"+name+" : "+value+"</span></li>");
			addButton();
	});
}


function addButton(){
	if(gameBegin == false){
	var choisirButton = $("<button onclick='persoChoosen(this.parentElement.previousSibling.id)'>Choisir</button>");
	choisirButton.addClass("choisirButton");
	$(".swapiElement").append(choisirButton);
	}
}

function persoChoosen(idPerso){
	var url = './Personnage/'+idPerso+'.png';
	$("#persoChoosen").remove();
	$('.endTitle').remove();
	$('#bonus').remove();
	$('video').remove();
	$("#combat").append("<div id='persoChoosen'></div>");
	$("#combat").append("<div id='fight'></div>");
	var divPerso = $('#persoChoosen');
	herosId = idPerso;
	divPerso.append("<h3>Votre héros</h3>");
	divPerso.append('<img src='+url+' class="fire" />');
	$('#begin').remove();
	$('#fight').append("<button id='begin' onclick='addAdversaire()' >Commencer le duel</button>");
}

function addAdversaire(){
	$("#fight > button").addClass('animated zoomOut');
	setTimeout(function(){
	$("#fight > button").remove();}
	,800
	)
	var perso = aleaPerso();
	var url = './Personnage/'+perso+'.png';
	adversaireId = perso;
	$("#combat").append("<div id='divAdversaire'></div>");
	divAdversaire = $("#divAdversaire");
	divAdversaire.append("<h3>Votre adversaire</h3>");
	divAdversaire.append('<img src="'+url+'" id="adversaire" class="fire" />');
	var divCombat = $('#fight');
	divCombat.append("<div class='actionPlayer'></div>");
	divCombat.append("<div class='actionAdversaire'></div>");
	$('.actionPlayer').append("<h4>Defendre</h4><img src='./images/defense.jpg' onclick='chooseAction(\"defense\")' class='defense'/>");
	$('.actionPlayer').append("<h4>Attaquer</h4><img src='./images/attaque.png' onclick='chooseAction(\"attaque\")' class='attaque'/>");
	$('.actionPlayer').append("<h4>Pouvoir</h4><img src='./images/pouvoir.jpg' onclick='chooseAction(\"pouvoir\")' class='pouvoir'/>");
	$('.actionAdversaire').append("<img src='./images/falcon.gif' class='falcon'/>");
	$('#fight').append("<h4 id='scorePlayer'>0</h4>");
	$('#fight').append("<h4 id='trait'>-</h4>");
	$('#fight').append("<h4 id='scoreAdversaire'>0</h4>");
	gameBegin = true;
	timeInterval = setInterval(play, 9000);
	
	
}

function aleaPerso(){
	var adversaire = listPerso[Math.floor(Math.random()*listPerso.length)];
	return adversaire;
}

function chooseAction(img){
	var baliseImg = '.'+img;
	$('.attaque').removeClass('selected');
	$('.defense').removeClass('selected');
	$('.pouvoir').removeClass('selected');
	$(baliseImg).addClass('selected');
}


function play(){
	var scorePlayer = parseInt($('#scorePlayer').text());
	var scoreAdversaire = parseInt($('#scoreAdversaire').text());
	var choice =0;
	if($('.attaque').hasClass('selected') == true){
		choice = 1;
	}
	else if($('.defense').hasClass('selected') == true){
		choice = 2;
	}
	else if($('.pouvoir').hasClass('selected') == true){
		choice = 3;
	}
	var choosenAdversaire = Math.floor((Math.random() * 3) + 1);
	
	switch(choosenAdversaire) {
    case 1:
        $(".falcon").remove();
		$(".actionAdversaire").append("<img src='./images/attaque.png' class='falcon'/>");
        break;
	case 2:
	    $(".falcon").remove();
		$(".actionAdversaire").append("<img src='./images/defense.jpg' class='falcon'/>");
	break;
	case 3:
	    $(".falcon").remove();
		$(".actionAdversaire").append("<img src='./images/pouvoir.jpg' class='falcon'/>");
	break;
	}
	if(choice == 1 && choosenAdversaire == 3){
		$('#scorePlayer').text(scorePlayer+1);
	}
	else if(choice == 2 && choosenAdversaire == 1){
		$('#scorePlayer').text(scorePlayer+1);
	}
	else if(choice == 3 && choosenAdversaire == 2){
		$('#scorePlayer').text(scorePlayer+1);
	}
	else if(choosenAdversaire == 1 && choice == 3){
		$('#scoreAdversaire').text(scoreAdversaire+1);
	}
	else if(choosenAdversaire == 2 && choice == 1){
		$('#scoreAdversaire').text(scoreAdversaire+1);
	}
	else if(choosenAdversaire == 3 && choice == 2){
		$('#scoreAdversaire').text(scoreAdversaire+1);
	}else if(choice == 0){
		$('#scoreAdversaire').text(scoreAdversaire+1);
	}
	setTimeout(reinitialise, 4000);
		if(scorePlayer == 5 || scoreAdversaire==5){ 
		clearInterval(timeInterval);
		gameBegin = false;
		var winnerIsPlayer = (scorePlayer == 5) ? true : false;
		endGame(winnerIsPlayer);
	}
}

function reinitialise(){
	$('.attaque').removeClass('selected');
	$('.defense').removeClass('selected');
	$('.pouvoir').removeClass('selected');
	$(".falcon").remove();
	$('.actionAdversaire').append("<img src='./images/falcon.gif' class='falcon'/>");
	
}

function endGame(winnerIsPlayer){
	$('#persoChoosen').remove();
	$('#fight').remove();
	$('#divAdversaire').remove();
	if(winnerIsPlayer){
		$('#combat').append('<h1 class="endTitle" >Vous avez gagné !</h1>');
		var url = false;
		if(herosId == 1 && adversaireId == 4){
			url = 'video/destroyEtoileNoire.webm';
		}else if(herosId == 4 && adversaireId == 5){
			url = 'video/destroyAlderaan.webm';
		}else if(herosId == 14 && adversaireId == 22){
			url = 'video/deathBobaFett.webm';
		}else if(herosId == 32 && adversaireId == 44){
			url = 'video/deathDarthMaul.webm';
		}else if(herosId == 21 && adversaireId == 20){
			url = 'video/yodaVsPalpatine.webm';
		}
		if(url != false){
			var video = $('<video />', {
			id: 'video',
			src: url,
			type: 'video/webm',
			controls: false,
			autoplay: true, 
			muted: true
			});
			video.addClass('video');
			$('#combat').append('<h3 id="bonus">Bonus :</h3>');
			$('#combat').append(video);
		}
	}else{
		$('#combat').append('<h1 class="endTitle" >Vous avez perdu !</h1>');
	}
}





