$(document).ready(function () {

    class fighterClass {
        constructor(name, photo, hp, wa, sa, isAlive) {
            this.name = name;
            this.photourl = photo;
            this.hp = hp;
            this.weakAttack = wa;
            this.strongAttack = sa;
            this.isAlive = isAlive;
        }
        getsHit(damage) {
            this.hp = this.hp - damage
        }
    }

    $("#myEnemyContainer").hide();
    $("#battleContainer").hide();
    $("#winnerContainer").hide();

    var myFighter = new fighterClass("", "", 0, 0, 0, false);
    var myEnemy = new fighterClass("", "", 0, 0, 0, false);

    // choose your fighter
    $(".fighter").click(function () {

        myFighter.name = $(this).attr("Value_Name");
        myFighter.photourl = $(this).attr("src");
        myFighter.hp = $(this).attr("Value_HP");
        myFighter.weakAttack = $(this).attr("Value_WA");
        myFighter.strongAttack = $(this).attr("Value_SA");
        myFighter.isAlive = true;

        $("#myFighterContainer").css("pointer-events", "none");
        $(".fighter").addClass("blockedFighters");
        $(this).addClass("selectedFighter");

        $("#myEnemyContainer").show(500);

    })

    // choose an enemy
    $(".enemy").click(function () {

        myEnemy.name = $(this).attr("Value_Name");
        myEnemy.photourl = $(this).attr("src");
        myEnemy.hp = $(this).attr("Value_HP");
        myEnemy.weakAttack = $(this).attr("Value_WA");
        myEnemy.strongAttack = $(this).attr("Value_SA");
        myEnemy.isAlive = true;

        $("#myEnemyContainer").css("pointer-events", "none");
        $(".enemy").addClass("blockedFighters");
        $(this).addClass("selectedEnemy");

        $("#battleContainer").show(500);

        setBattleDiv();

    })

    // set the battle div
    function setBattleDiv() {

        //set my fighter stats
        $("#yourFighterName").text(myFighter.name);
        $("#battleFighterIMG").attr("src", myFighter.photourl);
        $("#battleFighterIMG").css("height", 200);
        $("#battleFighterIMG").css("width", 200);
        $("#battleFighterIMG").css("margin-top", 15);
        $("#myfighterhp").text("HP: " + myFighter.hp);
        $("#myfighterwa").text("WA: " + myFighter.weakAttack);
        $("#myfightersa").text("SA: " + myFighter.strongAttack);

        //set my enemy stats
        $("#yourEnemyName").text(myEnemy.name);
        $("#battleEnemyIMG").attr("src", myEnemy.photourl);
        $("#battleEnemyIMG").css("height", 200);
        $("#battleEnemyIMG").css("width", 200);
        $("#battleEnemyIMG").css("margin-top", 15);
        $("#myenemyhp").text("HP: " + myEnemy.hp);
        $("#myenemywa").text("WA: " + myEnemy.weakAttack);
        $("#myenemysa").text("SA: " + myEnemy.strongAttack);

    }

    // attack
    $("#interactBttn").click(function () {

        // my turn

        var x = Math.floor((Math.random() * 10) + 1);

        // 70% chances to hit a strong attack
        if (x >= 7) {
            myEnemy.getsHit(myFighter.strongAttack);
            $("#enemyBattleAlerts").html("");
            $("#enemyBattleAlerts").append("<div>You attacked " + myEnemy.name + " for " + myFighter.strongAttack + " damage!</div>");
            $("#enemyBattleAlerts").append("<div>It was a strong hit.</div>");
            $("#enemyBattleAlerts").append("<div>" + myEnemy.name + "'s HP left is: " + myEnemy.hp + ".</div>");
            $("#myenemyhp").text("HP: " + myEnemy.hp);
            if (checkIfDead(myEnemy.hp)) {
                setWinOrLoseContainer("Yay! You won :)", "./assets/images/winlosegifs/victorygif.gif", "now try with a new char or something lol", "bg-success");
            }
        }
        // 30% chances to hit a weak attack
        else {
            myEnemy.getsHit(myFighter.weakAttack);
            $("#enemyBattleAlerts").html("");
            $("#enemyBattleAlerts").append("<div>You attacked " + myEnemy.name + " for " + myFighter.weakAttack + " damage!</div>");
            $("#enemyBattleAlerts").append("<div>It was a weak hit.</div>");
            $("#enemyBattleAlerts").append("<div>" + myEnemy.name + "'s HP left is: " + myEnemy.hp + ".</div>");
            $("#myenemyhp").text("HP: " + myEnemy.hp);
            if (checkIfDead(myEnemy.hp)) {
                setWinOrLoseContainer("Yay! You won :)", "./assets/images/winlosegifs/victorygif.gif", "now try with a new char or something lol", "bg-success");
            }
        }

        // enemy's turn

        var z = Math.floor((Math.random() * 10) + 1);

        // 60% chances to hit a strong attack
        if (z >= 7) {
            myFighter.getsHit(myEnemy.strongAttack);
            $("#fighterBattleAlerts").html("");
            $("#fighterBattleAlerts").append("<div>" + myEnemy.name + " attacked you for " + myEnemy.strongAttack + " damage!</div>");
            $("#fighterBattleAlerts").append("<div>It was a strong hit.</div>");
            $("#fighterBattleAlerts").append("<div>Your HP left is: " + myFighter.hp + ".</div>");
            $("#myfighterhp").text("HP: " + myFighter.hp);
            if (checkIfDead(myFighter.hp)) {
                setWinOrLoseContainer("No! You lost :(", "./assets/images/winlosegifs/losegif.gif", "better luck next time i guess", "bg-danger");
            }
        }
        // 40% chances to hit a weak attack
        else {
            myFighter.getsHit(myEnemy.weakAttack);
            $("#fighterBattleAlerts").html("");
            $("#fighterBattleAlerts").append("<div>" + myEnemy.name + " attacked you for " + myEnemy.weakAttack + " damage!</div>");
            $("#fighterBattleAlerts").append("<div>It was a weak hit.</div>");
            $("#fighterBattleAlerts").append("<div>Your HP left is: " + myFighter.hp + ".</div>");
            $("#myfighterhp").text("HP: " + myFighter.hp);
            if (checkIfDead(myFighter.hp)) {
                setWinOrLoseContainer("No! You lost :(", "./assets/images/winlosegifs/losegif.gif", "better luck next time i guess", "bg-danger");
            }
        }

    })

    function checkIfDead(hp) {
        if (hp <= 0) {
            return true;
        }
        return false;
    }

    function setWinOrLoseContainer(msg1, gif, msg2, colorclass) {
        $("#myFighterContainer").hide();
        $("#myEnemyContainer").hide();
        $("#battleContainer").hide();
        $("#winnerContainer").show(500);

        $("#winloseresult").text(msg1);
        $("#winlosegif").attr("src", gif);
        $("#winloseresult2").text(msg2);

        $("#winnerContainer").addClass(colorclass);
        $("#winnerrow1").addClass(colorclass);
        $("#winnerrow2").addClass(colorclass);
        $("#winnerrow3").addClass(colorclass);
        $("#winnerrow4").addClass(colorclass);
    }

    // new game
    $("#newgamebutton").click(function () {

        $("#winnerContainer").hide();
        $("#myFighterContainer").show(500);

        $("#myFighterContainer").css("pointer-events", "auto");
        $("#myEnemyContainer").css("pointer-events", "auto");

        $(".fighter").removeClass("blockedFighters");
        $(".fighter").removeClass("selectedFighter");
        $(".enemy").removeClass("blockedFighters");
        $(".enemy").removeClass("selectedEnemy");

        $(".fighter").addClass("imgStyleFighter");
        $(".enemy").addClass("imgStyleEnemy");

    })

})