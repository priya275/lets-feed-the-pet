var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var feed, lastFed;
var fedtime;
//create feed and lastFed variable here


function preload() {
    sadDog = loadImage("Dog.png");
    happyDog = loadImage("happy dog.png");
}

function setup() {
    database = firebase.database();
    createCanvas(1000, 400);

    foodObj = new Food();

    foodStock = database.ref('Food');
    foodStock.on("value", readStock);

    dog = createSprite(800, 200, 150, 150);
    dog.addImage(sadDog);
    dog.scale = 0.15;

    //create feed the dog button here
    feed = createButton("feed the dog");
    feed.position(700, 95);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(800, 95);
    addFood.mousePressed(addFoods);

}

function draw() {
    background(46, 139, 87);
    foodObj.display();
    fedTime = database.ref('FeedTime')
    fedTime.on("value", function(data) {
        lastFed = data.val();
    })
    textSize(15);
    fill("brown");
    if (lastFed >= 12) {
        text("last feed: " + lastFed % 12 + "PM", 350, 30);
    } else if (lastFed == 0) {
        text("last feed:12AM ", 350, 30);
    } else {
        text("last feed: " + lastFed + "AM", 350, 30);
    }
    //write code to read fedtime value from the database 


    //write code to display text lastFed time here


    drawSprites();
}

//function to read food Stock
function readStock(data) {
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
}


function feedDog() {
    dog.addImage(happyDog);
    var foodStockVal = foodObj.getFoodStock();
    if (foodStockVal <= 0) {
        foodObj.updateFoodStock(foodStockVal * 0);
    } else { //write code here to update food stock and last fed time
        foodObj.updateFoodStock(foodStockVal - 1);
    }

    database.ref('/').update({
        Food: foodObj.getFoodStock(),
        FeedTime: hour()
    })
}
//function to add food in stock
function addFoods() {
    foodS++;
    database.ref('/').update({
        Food: foodS
    })
}