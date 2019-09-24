class StoryStage extends GenericStage{
    constructor(){
        super();
        this.setVariables();
        this.setup();

    }

    setVariables() {
        //Pause the game first.
        this.setpause();

        this.background = null;
        this.backgroundVisible = false;
        this.CHARACTER_POOL = new Map();
        this.isDialogueComplete = false;

        this.screenShakeAmount = 0;
        this.screenShakeTime = 0;
        this.screenShakeTargetTime = 0;
        this.isScreenShakeComplete = true;

        //These are used to keep track of how much the screen has moved.
        this.screenShakex = 0;
        this.screenShakey = 0;

        this.isAFrame = true;

        this.inputTime = 0;
        this.disableInputTime = 0;

        this.fadeInOutVal = 0.00;
        this.isFadingComplete = true;

    }

    setDisableInput(time){
        this.disableInputTime = time;
        this.inputTime = 0;
    }

    setup(){
        this.dialogueBox = new DialogueBox(this.stage,CANVAS_WIDTH * 0.95, CANVAS_HEIGHT * 0.20, CANVAS_WIDTH/2, CANVAS_HEIGHT*0.85);
        this.blackScreen = createBackgroundOnStage(this.stage, "Resources/Images/UI/PitchBlack.png");//We will use this later.
        this.blackScreen.alpha = 0;
    }

    update(delta){
        if(this.pause){
            return;
        }

        this.inputTime += delta;

        //Time for some good ol' character updating.
        for(var x of this.CHARACTER_POOL.keys()){
            this.CHARACTER_POOL.get(x).update(delta);
        }

        this.isDialogueComplete = this.dialogueBox.update();
        if(!this.isScreenShakeComplete){
            this.screenShakeTime += 1;
            if(this.screenShakeTime >= this.screenShakeTargetTime){
                this.isScreenShakeComplete = true;
            }
            if(this.isAFrame){
                this.screenShake();
                this.isAFrame = false;
            }
            else{
                this.screenUnShake();
                this.isAFrame = true;
            }
        }
        else{
            this.screenUnShake();
        }

        if(!this.isFadingComplete){
            //Keep this on top
            this.stage.removeChild(this.blackScreen);
            this.stage.addChild(this.blackScreen);

            //Change opacity:
            this.blackScreen.alpha += this.fadeInOutVal;
            if(this.blackScreen.alpha > 1 || this.blackScreen.alpha < 0){
                //Stop:
                this.fadeInOutVal = 0;
                this.isFadingComplete = true;
            }


        }

        //Unshake
        //this.screenUnShake();
    }

    removeBackground(){
        if(this.background){
            this.stage.removeChild(this.background);
        }
        this.background = null;
    }

    setBackground(texturePath){
        this.removeBackground();
        this.background = createBackgroundOnStage(this.stage, texturePath);
        this.background.zIndex = -1;
    }

    hideAllCharacters(){
        for(var x of this.CHARACTER_POOL){
            x.visible = false;
        }
    }

    processInput(key, type) {
        //super.processInput(key, type);
        if(this.inputTime < this.disableInputTime){
            //Input is banned
            return;
        }
        if(type == 0){
            switch (key){
                case "Enter":
                    if(!this.dialogueBox.isVisible){
                        //Do nothing.
                        return;
                    }

                    if(!this.isDialogueComplete){
                        this.dialogueBox.skipDialogue();
                    }
                    else{
                        nextStageAction();
                    }

                    break;
                case "Tab":
                    if(this.dialogueBox.isVisible){
                        this.dialogueBox.hideBox();
                    }
                    else{
                        this.dialogueBox.showBox();
                    }
                default:
                    break;
            }
        }
    }

    scheduleScreenshake(time, amount){
        this.screenShakeTargetTime = time;

        this.isAFrame = true;


        this.screenShakeAmount = amount;
        this.screenShakeTime = 0;
        this.isScreenShakeComplete = false;
    }

    screenShake(){


        this.screenShakex = (Math.random()-0.5) * this.screenShakeAmount;
        this.screenShakey = (Math.random()-0.5) * this.screenShakeAmount;
        if(this.background){
            this.background.x += this.screenShakex;
            this.background.y += this.screenShakey;
        }

        for(var x of this.CHARACTER_POOL.keys()){
            //Shake all characters
            this.CHARACTER_POOL.get(x).character.x += this.screenShakex;
            this.CHARACTER_POOL.get(x).character.y += this.screenShakey;
        }
    }

    screenUnShake(){
        if(this.screenShakex == 0 && this.screenShakey ==0){
            return;
        }

        if(this.background){
            this.background.x -= this.screenShakex;
            this.background.y -= this.screenShakey;
        }
        for(var x of this.CHARACTER_POOL.keys()){
            //Shake all characters
            this.CHARACTER_POOL.get(x).character.x -= this.screenShakex;
            this.CHARACTER_POOL.get(x).character.y -= this.screenShakey;
        }
        this.screenShakex = 0;
        this.screenShakey = 0;

    }

    //+ = fade out
    //- = fade in.
    fadeBackground(speed){
        this.isFadingComplete = false;
        this.fadeInOutVal = speed;
    }


}
