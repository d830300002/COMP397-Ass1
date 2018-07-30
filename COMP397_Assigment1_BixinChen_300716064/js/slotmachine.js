var stage;
var queue;

//interface
var money_label, coefficient_label, bet_label, jackpot_label,coefficient;
var reel_1, reel_2, reel_3;

//reset values
var money=1000,bet=0;

function init() {
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", loadComplete);
    queue.loadManifest([
        { id: "seven", src: "imgs/seven.png" },
        { id: "cherry", src: "imgs/cherry.png" },
        { id: "grape", src: "imgs/grape.png" },
        { id: "slot", src: "imgs/slot_2.png" },
        { id: "star", src: "imgs/star.png" },
        { id: "applause", src: "sounds/applause.mp3" },
        { id: "mbox", src: "sounds/mbox.mp3" }
    ]);
}
function loadComplete() {
    setupStage();

    // set background
    var slot = queue.getResult("slot");
    var back_img;
    back_img = new createjs.Bitmap(slot);
    back_img.x = 0;
    back_img.y = 0;
    stage.addChild(back_img);

    //add buttons
    set_button();

    //add reels
    set_interface();
}
function setupStage() {
    stage = new createjs.Stage(document.getElementById('canvas'));
    
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);

}
function set_interface() {
    var seven = queue.getResult("seven");

    var title = new createjs.Text("Web Slot Machine ", "40px Forte", "#5d5c61");
    title.textAlign = 'center';
    title.textBaseline = 'middle';
    title.x = 200;
    title.y = 450;
    stage.addChild(title);

    set_label(0, money);
    set_bet(bet);

    reel_1 = new createjs.Bitmap(seven);
    reel_1.x = 195;
    reel_1.y = 155;
    stage.addChild(reel_1);

    reel_2 = new createjs.Bitmap(seven);
    reel_2.x = 355;
    reel_2.y = 155;
    stage.addChild(reel_2);

    reel_3 = new createjs.Bitmap(seven);
    reel_3.x = 520;
    reel_3.y = 155;
    stage.addChild(reel_3);
}
function set_button() {
    //spin
    var spin_txt = new createjs.Text("Spin", "30px Forte", "#c24c3c");
    var spin = new createjs.Shape();
    var sound_spin;

    spin.graphics.beginFill("#ffffff");
    spin.graphics.drawCircle(610, 440, 40);
    stage.addChild(spin);

    spin_txt.textAlign = 'center';
    spin_txt.textBaseline = 'middle';
    spin_txt.x = 610;
    spin_txt.y = 440;
    stage.addChild(spin_txt);

    spin.addEventListener('click', function (e) {
        if (bet == 0) {
            alert('You forgot to bet');
        }
        else if(
            bet > money){
            alert('You do not have enough money');
            spin.alpha = .3;
            spin_txt.alpha = .3;
        }
        else{
            setTime();
            sound_spin = createjs.Sound.play('mbox', createjs.Sound.INTERRUPT_NONE, 100);
            spin.alpha = 1;
            spin_txt = 1;
            }
    });

    spin_txt.textAlign = 'center';
    spin_txt.textBaseline = 'middle';
    spin_txt.x = 610;
    spin_txt.y = 440;
    stage.addChild(spin_txt);

    //bet 10
    var bet_10_txt = new createjs.Text("$10", "20px Forte", "#ffffff");
    var bet_10 = new createjs.Shape();

    bet_10.graphics.beginFill("#f79736");
    bet_10.graphics.drawCircle(520,400,25);
    stage.addChild(bet_10);
    bet_10.addEventListener('click', function (e) {
        set_bet(10);
    });

    bet_10_txt.textAlign = 'center';
    bet_10_txt.textBaseline = 'middle';
    bet_10_txt.x = 520;
    bet_10_txt.y = 400;
    stage.addChild(bet_10_txt);

 
    //bet 100
    var bet_100_txt = new createjs.Text("$100", "20px Forte", "#ffffff");
    var bet_100 = new createjs.Shape();
  
    bet_100.graphics.beginFill("#547bbf");
    bet_100.graphics.drawCircle(555, 345, 30);
    stage.addChild(bet_100);
    bet_100.addEventListener('click', function (e) {
        set_bet(100);
    });

    bet_100_txt.textAlign = 'center';
    bet_100_txt.textBaseline = 'middle';
    bet_100_txt.x = 555;
    bet_100_txt.y = 345;
    stage.addChild(bet_100_txt);

    //bet 1000
    var bet_1000_txt = new createjs.Text("$1000", "20px Forte", "#ffffff");
    var bet_1000 = new createjs.Shape();

    bet_1000.graphics.beginFill("#c24c3c");
    bet_1000.graphics.drawCircle(620, 325, 32);
    stage.addChild(bet_1000);
    bet_1000.addEventListener('click', function (e) {
        set_bet(1000);
    });

    bet_1000_txt.textAlign = 'center';
    bet_1000_txt.textBaseline = 'middle';
    bet_1000_txt.x = 620;
    bet_1000_txt.y = 325;
    stage.addChild(bet_1000_txt);

    // Reset
    var reset_txt = new createjs.Text("Reset", "20px Forte", "#ffffff");
    var reset = new createjs.Shape();

    reset.graphics.beginFill("#364f1c");
    reset.graphics.drawCircle(695, 325, 30);
    stage.addChild(reset);
    reset.addEventListener('click', function (e) {
        
        money = 1000;
        bet = 0;
        set_label(0, money);
        set_interface();
        stage.removeChild(coefficient);
    });

    reset_txt.textAlign = 'center';
    reset_txt.textBaseline = 'middle';
    reset_txt.x =695;
    reset_txt.y = 325;
    stage.addChild(reset_txt);


    // Exit
    var exit_txt = new createjs.Text("Exit", "20px Forte", "#ffffff");
    var exit = new createjs.Shape();

    exit.graphics.beginFill("#f5c93d");
    exit.graphics.drawCircle(760, 355, 25);
    stage.addChild(exit);
    exit.addEventListener('click', function (e) {
      
            if (confirm("Close Window?")) {
                window.close();
            }
        
    });

    exit_txt.textAlign = 'center';
    exit_txt.textBaseline = 'middle';
    exit_txt.x = 760;
    exit_txt.y = 355;
    stage.addChild(exit_txt);
}
function set_bet(be) {
    // Set the bet and show it in the game
    stage.removeChild(bet_label);
    bet_label = new createjs.Text("Your bet: $"+be, "20px Forte", "#5d5c61");
    bet_label.textAlign = 'center';
    bet_label.textBaseline = 'middle';
    bet_label.x =400;
    bet_label.y = 370;
    stage.addChild(bet_label);
    bet = be;

    // Set the jackport and show it in the game
    stage.removeChild(jackpot_label);
    jackpot_label = new createjs.Text("Get 7 7 7 ! Win $" + 100 * be, "20px Forte", "#5d5c61");
    jackpot_label.textAlign = 'center';
    jackpot_label.textBaseline = 'middle';
    jackpot_label.x = 650;
    jackpot_label.y = 30;
    stage.addChild(jackpot_label)

}
function set_label(coe, mon) {

    //show the score and money
    stage.removeChild(coefficient_label);
    coefficient_label = new createjs.Text("Income: $"+coe, "20px Forte", "#5d5c61");
    coefficient_label.textAlign = 'center';
    coefficient_label.textBaseline = 'middle';
    coefficient_label.x = 270;
    coefficient_label.y = 370;
    stage.addChild(coefficient_label);

    stage.removeChild(money_label);
    money_label = new createjs.Text("Your money: $" + mon, "20px Forte", "#5d5c61");
    money_label.textAlign = 'center';
    money_label.textBaseline = 'middle';
    money_label.x = 110;
    money_label.y = 370;
    stage.addChild(money_label);


}
function setTime() {

    // run the reels
    var i;
    stage.removeChild(reel_1);
    stage.removeChild(reel_2);
    stage.removeChild(reel_3);

    for (i = 0; i < 18 ;i++)
    {
       setTimeout(rollReels,i*100);
    }
    setTimeout(setRandom_nubmer, 1900);
}

function rollReels() {
    var seven = queue.getResult("seven");
    var cherry = queue.getResult("cherry");
    var grape = queue.getResult("grape");
    var list = [seven, cherry, grape, seven, cherry, grape, seven, cherry, grape,seven];
    var random_index;

    random_index=Math.floor(Math.random() * 10);
    stage.removeChild(reel_1);
    reel_1 = new createjs.Bitmap(list[random_index]);
    reel_1.x = 195;
    reel_1.y = 155;
    stage.addChild(reel_1);


    stage.removeChild(reel_2);
    reel_2 = new createjs.Bitmap(list[random_index+1]);
    reel_2.x = 355;
    reel_2.y = 155;
    stage.addChild(reel_2);
   
    stage.removeChild(reel_3);
    reel_3 = new createjs.Bitmap(list[random_index+2]);
    reel_3.x = 520;
    reel_3.y = 155;
    stage.addChild(reel_3);

  
    
};
function setRandom_nubmer() {

    var random_number_1, random_number_2, random_number_3;
    var reel_1_score, reel_2_score, reel_3_score, i;



    random_number_1 = Math.floor(Math.random() * 10);
    reel_1_score = buidReels(random_number_1, 195);

    random_number_2 = Math.floor(Math.random() * 10);
    reel_2_score = buidReels(random_number_2, 355);

    random_number_3 = Math.floor(Math.random() * 10);
    reel_3_score = buidReels(random_number_3, 520);

    round_score(reel_1_score, reel_2_score, reel_3_score);


}
function buidReels(random_number,x) {
    var seven = queue.getResult("seven");
    var cherry = queue.getResult("cherry");
    var grape = queue.getResult("grape");
    var reel_score;

 

    if (random_number < 5) { 
        reel_1 = new createjs.Bitmap(grape);
        reel_1.x = x;
        reel_1.y = 155;
        stage.addChild(reel_1);
        reel_score = 1;
    }
    else if (random_number > 8) {
        reel_2 = new createjs.Bitmap(seven);
        reel_2.x = x;
        reel_2.y = 155;      
        stage.addChild(reel_2);
        reel_score = 3;
    }
    else {
        reel_3 = new createjs.Bitmap(cherry);
        reel_3.x = x;
        reel_3.y = 155;
        stage.addChild(reel_3);
        reel_score = 2;
    }

    return reel_score;
}

//calculate the score
function round_score(reel_1_score, reel_2_score, reel_3_score) {
    var i, round_score_coefficient;
    var reel_score_list = [reel_1_score, reel_2_score, reel_3_score];
    var reel_score_s = 0, reel_score_g = 0, reel_score_c = 0, reel_type = 0;

    for (i = 0; i < reel_score_list.length; i++) {
        if (reel_score_list[i] == 1) {
            reel_score_g++;
            if (reel_score_g > 1) {
                reel_type = "grape";
            }
        }
    }

    for (i = 0; i < reel_score_list.length; i++) {
        if (reel_score_list[i] == 2) {
            reel_score_c++;
            if (reel_score_c > 1) {
                reel_type = "cherry";
            }
        }
    }


    for (i = 0; i < reel_score_list.length; i++) {
        if (reel_score_list[i] == 3) {
            reel_score_s++;
            if (reel_score_s > 1) {
                reel_type = "seven";
            }
        }
    }

    if (reel_type == "grape" && reel_score_g > 1) {
        if (reel_score_g > 2) {
            round_score_coefficient = 10;
            celebration_animation();
        }
        else {
            round_score_coefficient = 1;
        }
    }
    else if (reel_type == "cherry" && reel_score_c > 1) {
        if (reel_score_c > 2) {
            round_score_coefficient = 50;
            celebration_animation();
        }
        else {
            round_score_coefficient = 10;
        }
    }
    else if (reel_type == "seven" && reel_score_s > 1) {
        if (reel_score_s > 2) {
            round_score_coefficient = 100;
            celebration_animation();
        }
        else {
            round_score_coefficient = 50;
        }
    }
    else {
        round_score_coefficient = 0;
    }

    var income = 0;
    if (round_score_coefficient == 0) {

        money = money - bet;
        jackPot = "-" + bet;
    }
    else {
        var a = (round_score_coefficient / 100) * bet;
        money = money + a;      
        income = "+"+a;
    }
    set_label(income, money);

    stage.removeChild(coefficient);
    coefficient = new createjs.Text("*"+round_score_coefficient/100, "30px Forte", "#5d5c61");
    coefficient.textAlign = 'center';
    coefficient.textBaseline = 'middle';
    coefficient.x = 730;
    coefficient.y = 200;
    stage.addChild(coefficient);
}
function celebration_animation() {
    var img = queue.getResult("star");
    var i, sound, star;
    sound = createjs.Sound.play('applause', createjs.Sound.INTERRUPT_NONE, 100);
    for (i = 0; i < 4; i++) {
        star = new createjs.Bitmap(img);
        star.x = i * 150;
        stage.addChild(star);
        createjs.Tween.get(star).wait(i * 1000).to({ y: 400 }, 1000, createjs.Ease.quadOut).call(starComplete);
        
    }
    
}
function starComplete() {
    stage.removeChild(this);
}
function handleTick(e) {
    stage.update();
}
